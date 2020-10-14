const SQL = require("./../sqlAccess.js");
const fs = require('fs');
const Errors = require("./../errors.js");

var crypto = require("crypto");

const cert = fs.readFileSync('certificates/hostname.local.crt', 'utf8');

module.exports = {

    cert: cert,

    Participant: class Participant {
        constructor (coordinatorDir, host) {
            // set participant socket data:
            this.isOpen = true;
            this.coordinatorDir = coordinatorDir;
            this.database = new SQL.Connection('localhost','multi');
            this.lockAttempts = 0;
            this.hasReceivedSecondConfirm = 0;

            this.clientSocket = require('socket.io-client')(coordinatorDir, {
                secure: true,
                reconnect: false,
                reconnection: false,
                reconnectionAttempts: 0,
                reconnectionDelay: 1000, // 1 second.
                reconnectionDelayMax: 1000,
                autoConnect: true,
                timeout: 1000, // 2 seconds.
                ca: cert,
                rejectUnauthorized: false,
                forceNew: true  // IMPORTANT!!!!
            });

            // set custom info:
            this.participantInfo = {
                id: crypto.randomBytes(30).toString('hex'),
                host: host
            };

            // create log info:
            this.logInfo = new Object();
            this.logInfo.id = null;
            this.logInfo.caller = null;
            this.logInfo.operation = null;
            this.logInfo.state = '1';
            this.logInfo.coordinatorAddress = null;
            this.logInfo.tablesLocked = null;
            this.logInfo.transacctionInfo = null;
            this.logInfo.parameterList = null;
            this.logInfo.rollbackInfo = null;
            this.logInfo.rollbackParameters = null;

            // set a callback to object scope inside 'coordinatorSocket':
            this.clientSocket.parentScope = this;

            // set events:
            this.attachCommunicationEvents(this.clientSocket);
            this.attachErrorEvents(this.clientSocket);

        }

        attachCommunicationEvents (socket) {
            socket.on('connect', function () {
                console.log("\n\n****\nconnect");
                // set some working variables:
                var parentScope = this.parentScope;
                var participantInfo = this.parentScope.participantInfo;

                // ask for a room and send custom client data:
                console.log(participantInfo);
                this.emit('getRoom', participantInfo);
            });
            ////
            socket.on('roomGot', function ( data ) {
                console.log("\n\n****\nroomGot.");
                console.log(data);
                // set some working variables:
                var socket = this;
                var parentScope = this.parentScope;
                var participantInfo = this.parentScope.participantInfo;
                // save logInfo.id
                parentScope.logInfo.id = data.id;
                parentScope.logInfo.coordinatorAddress = data.host;
                // call next step:
                this.emit('getLockList', participantInfo);
            });
            ////
            socket.on('lockListGot', function ( data ) {
                console.log("\n\n****\nlockListGot.");
                console.log(data);
                // set some working variables:
                var socket = this;
                var parentScope = this.parentScope;
                var participantInfo = this.parentScope.participantInfo;
                // update logInfo:
                parentScope.logInfo.tablesLocked = data;
                // check if we have any pending logs with this tables:
                var pendingLogs = [];
                fs.readdirSync('./logs/pending/').forEach( file => {
                    // read contents:
                    var contents = fs.readFileSync('./logs/pending/' + file, 'utf8');
                    // append to array
                    pendingLogs.push(JSON.parse(contents));
                });
                // traverse the array and check for matches:
                for (var i=0; i<pendingLogs.length; i++) {
                    // iterate over the lock requested:
                    for (var j=0; j<data.length; j++) {
                        if ( pendingLogs[i].tablesLocked.includes(data[j]) ) {
                            // if we have been asked to block tables that need
                            // a recovery, disconnect.
                            socket.emit('disconnect');
                            return;
                        }
                    }
                }
                // try to lock tables:
                var attemptToLock = function (parentScope) {
                    parentScope.lockAttempts = parentScope.lockAttempts + 1;
                    parentScope.database.lockTables(
                        data,
                        'WRITE',
                        Math.floor(Math.random() * (500 - 50 + 1) + 50)
                    )
                    .then((value) => {
                        console.log("Lock successful.");
                        // we managed to lock tables. Send confirmation:
                        return parentScope.database.openTransacction();
                    })
                    .then((value) => {
                        console.log("Transacction started.");
                        // we managed to lock tables. And start transacction.
                        // Send confirmation:
                        socket.emit('confirmLock', participantInfo);

                    })
                    .catch((err) => {
                        console.log("Lock failed.");
                        // could not lock tables. Try again:
                        if (parentScope.lockAttempts <= 5) {
                            parentScope.database.destroyConnection();
                            parentScope.database = new SQL.Connection('localhost','multi');
                            attemptToLock(parentScope);
                        } else {
                            parentScope.database.destroyConnection();
                            socket.emit('disconnect');
                        }
                    });
                };
                attemptToLock(parentScope);
            });
            ////
            socket.on('confirmLockGot', function ( data ) {
                console.log("\n\n****\nconfirmLockGot.");
                console.log(data);
                // set some working variables:
                var socket = this;
                var parentScope = this.parentScope;
                var participantInfo = this.parentScope.participantInfo;

                // save log:
                var logStream = fs.createWriteStream(
                    'logs/pending/' + parentScope.logInfo.id,
                    {flags: 'w'}
                );
                logStream.on('finish', (err) => {
                    console.log("WROTE PENDING LOG.");
                    this.emit('getBackUpQuery', participantInfo);
                });
                logStream.end(
                    JSON.stringify(parentScope.logInfo)
                );
            });
            ////
            socket.on('backupQueryGot', function ( data ) {
                console.log("\n\n****\nbackupQueryGot.");
                console.log(data);
                // set some working variables:
                var socket = this;
                var parentScope = this.parentScope;
                var participantInfo = this.parentScope.participantInfo;
                // update logInfo:
                var backupQuery = data.backupQuery;
                var args = data.args;
                // save caller and operation:
                parentScope.logInfo.caller = data.caller;
                parentScope.logInfo.operation = data.operation;
                // save rollback query:
                parentScope.logInfo.rollbackInfo = data.rollbackQuery;
                parentScope.logInfo.parameterList = data.args;
                // execute backup query and save results on logInfo:
                parentScope.database.query(backupQuery, args)
                .then((value) => {
                    // backup query executed.
                    // if dataset is empty, inform coordinator.
                    // if dataset is not empty, continue.
                    if (value[0][0] == undefined ) {
                        participantInfo.message = false;
                        this.emit(
                            'sendDataLocalityConfirmation',
                            participantInfo
                        );
                    } else {
                        participantInfo.message = true;
                        // delete clutter in parameter list:
                        delete value[0][0].IdentificadorSitio;
                        delete value[0][0].IdUniversidadSitio;
                        // convert all Buffer elements to strings:
                        console.log("*converting buffers to strings...");
                        for (var prop in value[0][0]) {
                            if (Object.prototype.hasOwnProperty.call(value[0][0], prop)) {
                                // check if property is buffer:
                                console.log(prop);
                                if (Buffer.isBuffer(value[0][0][prop]) == true ) {
                                    value[0][0][prop] = value[0][0][prop].toString();
                                }
                            }
                        }
                        console.log(parentScope.logInfo);
                        // create complex recovery for alumno20:
                        if (parentScope.logInfo.caller == "alumno" &&
                        parentScope.logInfo.operation == "20")
                        {
                            console.log("STUDENT20");
                            console.log(args[0]);
                            console.log(value[0][0].OrigenInsercion);
                            console.log(args[2]);
                            console.log(false);
                            // extract rollback parameters:
                            var rollbackArgs = [];
                            rollbackArgs.push(args[0]);
                            rollbackArgs.push(value[0][0].OrigenInsercion);
                            rollbackArgs.push(args[2]);
                            rollbackArgs.push(false); // always false.
                            // save final result into normal parameters:
                            args[1] = value[0][0].OrigenInsercion;
                            args[3] = false;
                            parentScope.logInfo.parameterList = args;
                            // save final result into rollback parameters:
                            parentScope.logInfo.rollbackParameters = rollbackArgs;
                        } else {
                            // simply save the results into rollback parameters:
                            parentScope.logInfo.rollbackParameters = Object.values(value[0][0]);
                        }
                        console.log("*****NORMAL PARAMETERS GOT:");
                        console.log(parentScope.logInfo.parameterList);
                        console.log("*****ROLLBACK PARAMETERS GOT:");
                        console.log(parentScope.logInfo.rollbackParameters);
                        this.emit(
                            'sendDataLocalityConfirmation',
                            participantInfo
                        );
                    }
                })
                .catch((err) => {
                    // got an error. Cancel operation:
                    console.log("Outer error:");
                    console.log(err);
                    parentScope.close();
                    this.emit('disconnect');
                });

            });
            ////
            socket.on('transacctionGot', function ( data ) {
                console.log("\n\n****\ntransacctionGot.");
                console.log(data);
                // set some working variables:
                var socket = this;
                var parentScope = this.parentScope;
                var participantInfo = this.parentScope.participantInfo;

                // update logInfo:
                parentScope.logInfo.transacctionInfo = data.transacction;
                if (parentScope.logInfo.caller != "alumno" &&
                parentScope.logInfo.operation != "20") {
                    parentScope.logInfo.parameterList = data.args;
                }
                parentScope.logInfo.operation = data.operation;
                parentScope.logInfo.caller = data.caller;
                console.log();
                console.log(parentScope.logInfo);

                // create log:
                var logStream = fs.createWriteStream(
                    'logs/pending/' + parentScope.logInfo.id,
                    {flags: 'w'}
                );
                logStream.end(
                    JSON.stringify(parentScope.logInfo)
                );

                // execute backup query and save results on logInfo:
                var query = data.transacction;
                var args = data.args;
                parentScope.database.query(query, args)
                .then((value) => {
                    // transacction executed.
                    console.log("outer: transacction executed.");
                    console.log(value);
                    // handle special case admin38:
                    if (parentScope.logInfo.caller == "admin" &&
                    parentScope.logInfo.operation == "38") {
                        console.log("ADMIN38");
                        console.log(value[0][0]);
                        console.log("");
                        // save IdAreaConocimiento into rollback parameters:
                        parentScope.logInfo.rollbackParameters = [ value[0][0].IdAreaConocimiento ];
                    }
                    // ask for commit permission:
                    this.emit(
                        'askCommitPermission',
                        participantInfo
                    );
                })
                .catch((err) => {
                    // got an error. Cancel operation:
                    console.log("Outer error:");
                    console.log(err);
                    parentScope.close();
                    this.emit('disconnect');
                });

            });
            ////
            socket.on('getCommitPermission', function ( data ) {
                console.log("\n\n****\ngetCommitPermission.");
                console.log(data);
                // set some working variables:
                var socket = this;
                var parentScope = this.parentScope;
                var participantInfo = this.parentScope.participantInfo;

                parentScope.database.commitTransacction()
                .then((value) => {
                    // update inner variables:
                    parentScope.hasReceivedSecondConfirm = 1;
                    // commit was successful:
                    console.log("outer: commit done.");
                    // ask for second confirmation:
                    this.emit(
                        'confirmCommit',
                        participantInfo
                    );
                })
                .catch((err) => {

                });
            });
            ////
            socket.on('getConfirmCommit', function ( data ) {
                // print message:
                console.log("\n\n****\ngetConfirmCommit.");
                console.log(data);
                // set some working variables:
                var socket = this;
                var parentScope = this.parentScope;
                var participantInfo = this.parentScope.participantInfo;

                console.log(parentScope.logInfo);

                var mustMakeCommit = data;
                // if true, update log and disconnect.
                if (mustMakeCommit == true) {
                    console.log("outer: second confirmation got.");
                    console.log("positive.");
                    // if we got this far, update logInfo with a Done state
                    // and disconnect:
                    parentScope.logInfo.state = '0';
                    // update log:
                    fs.unlink('logs/pending/' + parentScope.logInfo.id, (err) => {
                        if (err) {
                            console.error(err)
                            return
                        }
                    });
                    var logStream = fs.createWriteStream(
                        'logs/done/' + parentScope.logInfo.id,
                        {flags: 'w'}
                    );
                    logStream.end(
                        JSON.stringify(parentScope.logInfo)
                    );
                    // release tables and close connection:
                    parentScope.database.unlockTables()
                    .then((value) => {
                        console.log("outer: tables unlocked.");
                        // release database connection:
                        return parentScope.database.endConnection();
                    })
                    .then((value) => {
                        // update some variables:
                        parentScope.hasReceivedSecondConfirm = 2;
                        console.log("outer: database connection released.");
                        // disconnect from server:
                        this.emit(
                            'disconnect'
                        );
                    })
                    .catch((err) => {
                        // update some variables:
                        parentScope.hasReceivedSecondConfirm = 1;
                        console.log("outer: error on table release.");
                        console.log("destroying database connection.");
                        parentScope.database.destroyConnection();
                        // disconnect from server:
                        this.emit(
                            'disconnect'
                        );
                    });
                } else {
                    // if false, do a hard rollback:
                    console.log("outer: second confirmation got.");
                    console.log("negative");
                    this.emit(
                        'disconnect'
                    );
                }
            });
            /*
            *
            */
            socket.on('disconnect', function ( data ) {
                console.log("\n\n****\nConnection lost. Killing DB connection.");
                // set some working variables:
                var socket = this;
                var parentScope = this.parentScope;
                var participantInfo = this.parentScope.participantInfo;

                // if this value is equal to 1, do a hard rollback:
                if (parentScope.hasReceivedSecondConfirm == 1) {
                    // error, must do hard rollback:
                    console.log("****DOING HARD ROLLBACK...");
                    console.log(parentScope.logInfo);
                    // if we get here, tables are still locked:
                    parentScope.database.query(
                        parentScope.logInfo.rollbackInfo,
                        parentScope.logInfo.rollbackParameters
                    )
                    .then((value) => {
                        console.log("***HARD ROLLBACK DONE.");
                        console.log("***WRITING PENDING LOG...");
                        // save log:
                        var logStream = fs.createWriteStream(
                            'logs/pending/' + parentScope.logInfo.id,
                            {flags: 'w'}
                        );
                        logStream.on('finish', (err) => {
                            console.log("WROTE PENDING LOG.");
                        });
                        logStream.end(
                            JSON.stringify(parentScope.logInfo)
                        );
                        // release locks:
                        return parentScope.database.unlockTables();
                    })
                    .then((value) => {
                        console.log("***LOCKS RELEASED.");
                        // close this client:
                        this.close();
                        // close connection to database:
                        parentScope.database.endConnection()
                        .catch( (err) => {
                            parentScope.database.destroyConnection();
                        });
                    })
                    .catch((err) => {
                        console.log("***ERROR ON CANCELED:");
                        // close this client:
                        this.close();
                        // close connection to database:
                        parentScope.database.endConnection()
                        .catch( (err) => {
                            parentScope.database.destroyConnection();
                        });
                    });
                } else {
                    // ALL GOOD:
                    // kill database connection:
                    parentScope.database.destroyConnection();
                    // close this client:
                    this.close();
                }
            });
        }

        attachErrorEvents (socket) {
            socket.on('connect_error', function ( err ) {
                console.log("connect_error:");
                console.log(err);
                console.log();
                this.close();
            });
            socket.on('connect_timeout', function ( err ) {
                console.log("connect_timeout:");
                console.log(err);
                console.log();
                this.close();
            });
            socket.on('reconnect_error', function ( err ) {
                console.log("reconnect_error:");
                console.log(err);
                console.log();
                this.close();
            });
            socket.on('reconnect_failed', function ( err ) {
                console.log("reconnect_failed:");
                console.log(err);
                console.log();
                this.close();
            });
        }

        close() {
            this.database.destroyConnection();
        }

    } // END OF CLASS.

};

