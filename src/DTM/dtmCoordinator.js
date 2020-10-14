const SQL = require("./../sqlAccess.js");
const Errors = require("./../errors.js");
const fs = require('fs');

var crypto = require("crypto");

const cert = {
  key: fs.readFileSync('certificates/hostname.local.key', 'utf8'),
  cert: fs.readFileSync('certificates/hostname.local.crt', 'utf8')
};

module.exports = {

    cert: cert,

    Coordinator: class Coordinator {
        constructor (host, port, participantsList, metadata, masterServer) {
            console.log("PARTICIPANTS:");
            console.log(participantsList);
            this.masterServer = masterServer;
            this.host = host;
            this.port = port;
            this.participantsList = participantsList;
            this.lockAcknowledgeList = [];
            this.finalAcknowledgeList = [];
            this.database = new SQL.Connection('localhost','multi');
            this.participantMappingToRoom = new Map();
            this.lockClockForTimeoutActive = false;
            this.commitClockForTimeoutActive = false;
            this.lockTimeout = null;
            this.lockAttempts = 0;
            this.masterTimer = null;
            this.hasDoneCommit = false;
            this.isActive = true;

            // set metadata:
            /*
                'metadata' includes:
                    callerScope.    (object (ej: administrador, etc.))
                    caller.         (string)
                    operation.      (string)
                    tablesToLock.   (object)
                    backupQuery.    (string)
                    rollbackQuery.  (string)
                    transacction.   (string)
            */
            this.metadata = metadata;

            // create log info:
            this.logInfo = new Object();
            this.logInfo.id = crypto.randomBytes(20).toString('hex');
            this.logInfo.caller = this.metadata.caller;
            this.logInfo.operation = this.metadata.operation;
            this.logInfo.state = '1';
            this.logInfo.coordinatorAddress = this.host;
            /*
            this.logInfo.tablesLocked = JSON.stringify(
                this.metadata.tablesToLock
            );
            */
            this.logInfo.tablesLocked = this.metadata.tablesToLock;
            this.logInfo.parameterList = this.metadata.parameterList;
            // this is the actual query:
            this.logInfo.backupQuery = this.metadata.backupQuery;
            // this is the actual query(s):
            this.logInfo.transacctionInfo = this.metadata.transacction;
            // this are arguments that must be given to 'rollback':
            this.logInfo.rollbackInfo = this.metadata.rollbackQuery;
            this.logInfo.rollbackParameters = null;

            // clearTimeout(referenceToTimeout)
            // define broadcast close function:
            this.broadcastClose = function (parent) {
                socket.broadcast.emit('disconnect');
            }

            // create socket https server:
            this.socketHttpsServer = require('https').createServer(
                cert
            );

            // create socket:
            this.coordinatorSocket = require('socket.io')(
                this.socketHttpsServer
            );

            // set a callback to object scope inside 'coordinatorSocket':
            this.coordinatorSocket.parentScope = this;

            // set events handlers:
                // All messages come with the client custom id.
                // All the inside handlers MUST be corresponding to the 'client' object.
                this.coordinatorSocket.on('connection', function ( client ) {
                    console.log("connected to root.");
                    console.log(client.client.conn.remoteAddress);
                    // get some variables from parent:
                    var parentScope = this.server.parentScope;
                    var coordinatorSocket = this.server.parentScope.coordinatorSocket;
                    // activate lock clock:
                    parentScope.lockClockForTimeoutActive = true;
                    // start lock timeout clock:

                    setTimeout(function(parentScope){
                        console.log("\n\n****\nLOCK TIMEOUT:");
                        console.log(parentScope.lockClockForTimeoutActive);
                        if (parentScope.lockClockForTimeoutActive == true) {
                            parentScope.coordinatorSocket.close();
                            parentScope.socketHttpsServer.close();
                        }
                    }, 5000, parentScope);


                    client.on('getRoom', function ( clientInfo ) {
                        console.log("\n\n****\ngetRoom:");
                        console.log(clientInfo);
                        console.log(client.client.conn.remoteAddress);
                        // get random room id:
                        var newRoom = crypto.randomBytes(40).toString('hex');
                        // save room association:
                        parentScope.participantMappingToRoom.set(
                            clientInfo.id,
                            {
                                room: newRoom,
                                host: client.host
                            }
                        );
                        // associate new room with current client:
                        client.join(newRoom);
                        // send room confirmation:
                        coordinatorSocket.sockets.in(newRoom).emit(
                            'roomGot', {
                                id: parentScope.logInfo.id,
                                host: parentScope.host
                            }
                        );
                    });
                    //
                    client.on('getLockList', function ( clientInfo ) {
                        console.log("\n\n****\ngetLockList:");
                        console.log(clientInfo);
                        // get data to send:
                        var tablesToLock = parentScope.metadata.tablesToLock;
                        // get channel to send the info to:
                        var clientRoom = parentScope.participantMappingToRoom.get(
                            clientInfo.id
                        ).room;
                        // send response:
                        coordinatorSocket.sockets.in(clientRoom).emit(
                            'lockListGot', tablesToLock
                        );
                    });
                    //
                    client.on('confirmLock', function ( clientInfo ) {
                        console.log("\n\n****\nconfirmLock:");
                        console.log(clientInfo);
                        // update 'lockAcknowledgeList'
                        parentScope.lockAcknowledgeList.push(
                            clientInfo.host
                        );
                        // check if we need to stop 'lockClockForTimeoutActive':
                        if (parentScope.lockAcknowledgeList.length ==
                            parentScope.participantsList.length) {
                                console.log("ALL SITES LOCKED.");
                                parentScope.lockClockForTimeoutActive = false;
                                // send 'confirmLockGot' to all participants:
                                coordinatorSocket.emit('confirmLockGot', true);
                        }
                    });
                    //
                    client.on('getBackUpQuery', function ( clientInfo ) {
                        console.log("\n\n****\ngetBackUpQuery:");
                        console.log(clientInfo);
                        console.log(parentScope.logInfo);
                        // get data to send:
                        var backupQuery = parentScope.logInfo.backupQuery;
                        var rollbackQuery = parentScope.logInfo.rollbackInfo;
                        var args = parentScope.logInfo.parameterList;
                        // get channel to send the info to:
                        var clientRoom = parentScope.participantMappingToRoom.get(
                            clientInfo.id
                        ).room;
                        // send response:
                        coordinatorSocket.sockets.in(clientRoom).emit(
                            'backupQueryGot', {
                                backupQuery: backupQuery,
                                args: args,
                                rollbackQuery: rollbackQuery,
                                caller: parentScope.logInfo.caller,
                                operation: parentScope.logInfo.operation
                            }
                        );
                    });
                    //
                    client.on('sendDataLocalityConfirmation', function ( clientInfo ) {
                        console.log("\n\n****\nsendDataLocalityConfirmation:");
                        console.log(clientInfo);
                        // get channel to send the info to:
                        var clientRoom = parentScope.participantMappingToRoom.get(
                            clientInfo.id
                        ).room;
                        // get transaccion info:
                        var transacction = parentScope.logInfo.transacctionInfo;
                        // decide if we need to disconnect this participant:
                        if (clientInfo.message == false) {
                            coordinatorSocket.sockets.in(clientRoom).emit(
                                'disconnect'
                            );
                        } else {
                            coordinatorSocket.sockets.in(clientRoom).emit(
                                'transacctionGot', {
                                    transacction: transacction,
                                    args: parentScope.logInfo.parameterList,
                                    operation: parentScope.logInfo.operation,
                                    caller: parentScope.logInfo.caller
                                }
                            );
                        }
                    });
                    client.on('askCommitPermission', function ( clientInfo ) {
                        console.log("\n\n****\naskCommitPermission:");
                        console.log(clientInfo);
                        // get channel to send the info to:
                        var clientRoom = parentScope.participantMappingToRoom.get(
                            clientInfo.id
                        ).room;
                        // send response:
                        coordinatorSocket.sockets.in(clientRoom).emit(
                            'getCommitPermission', true
                        );
                    });
                    //
                    client.on('confirmCommit', function ( clientInfo ) {
                        console.log("\n\n****\nconfirmCommit:");
                        console.log(clientInfo);
                        // get channel to send the info to:
                        var clientRoom = parentScope.participantMappingToRoom.get(
                            clientInfo.id
                        ).room;
                        // update logInfo:
                        parentScope.logInfo.state = '0';
                        // make a commit:

                        /*if (parentScope.hasDoneCommit == false &&
                            parentScope.isActive == true) {
                                console.log("****DOING LOCAL QUERY ON COORDINATOR...");
                            // this is for the first time we get a
                            // second confirmation petition. We try to make
                            // a commit. If it fails, we close the server.
                            // If it succeeds, we remain open until master
                            // timeout closes the server.
                            //
                            // do the transacction:
                            parentScope.database.query(
                                parentScope.logInfo.transacctionInfo,
                                parentScope.logInfo.parameterList
                            )
                            .then((value) => {
                                console.log("outer: transacction done.");
                                // handle special case admin38:
                                if (parentScope.logInfo.caller == "admin" &&
                                parentScope.logInfo.operation == "38") {
                                    console.log("ADMIN38");
                                    console.log(value[0][0]);
                                    console.log("");
                                    // save IdAreaConocimiento into rollback parameters:
                                    parentScope.logInfo.rollbackParameters = [ value[0][0].IdAreaConocimiento ];
                                }
                                // commit transacction:
                                return parentScope.database.commitTransacction()
                            })
                            .then((value) => {
                                console.log("outer: commit done.");
                                // update state:
                                parentScope.hasDoneCommit = true;
                                // send response:

                                coordinatorSocket.sockets.in(clientRoom).emit(
                                    'getConfirmCommit', parentScope.hasDoneCommit
                                );

                                // update logInfo:
                                parentScope.logInfo.state = '0';
                            })
                            .catch((err) => {
                                parentScope.isActive = false;
                                console.log("commit failed.");
                                // update state:
                                parentScope.hasDoneCommit = false;
                                // send response:
                                coordinatorSocket.sockets.in(clientRoom).emit(
                                    'getConfirmCommit', parentScope.hasDoneCommit
                                );
                                // if commit failed, close server and
                                // destroy connection:
                                // update logInfo:
                                parentScope.logInfo.state = '2';
                                parentScope.stop();
                            });
                        } else if (parentScope.isActive == true) {*/
                            // this is for when we already got one
                            // favorable response but we keep open
                            // to serve any other participants.
                            // send response:
                            coordinatorSocket.sockets.in(clientRoom).emit(
                                'getConfirmCommit', true
                            );
                        //}
                    });
                    /*
                    *
                    */
                    client.on('disconnect', function () {
                        console.log("\n\n****\nClient disconnected.");
                        console.log();
                    });

                });

        }
        start () {
            // Lock tables, start transacction, write log and start listening
            // for our participants.
            // If we dont have participants, we simply commit and update
            // log with 'Done' state.

            // start master timer: If we dont finish in 10 seconds
            // we cancel everything.
            this.masterTimer = setTimeout(function(parentScope){
                console.log("\n\n****\nMASTER TIMEOUT:");
                console.log(true);
                parentScope.coordinatorSocket.close();
                parentScope.socketHttpsServer.close();
            }, 6000, this);

            // we make five attempts to lock tables. If we fail, we throw error.
            var parentScope = this;
            return new Promise(function(resolve, reject) {
                // check if we have pending operations which use
                // the tables that are to be locked:
                console.log("*****Ckecking pending...");
                console.log(parentScope.masterServer.pendingLogs.pendingLogs);
                var pendingList = parentScope.masterServer.pendingLogs.pendingLogs;
                // iterate pending list:
                pendingList.forEach((item, i) => {
                    // iterate tables to lock:
                    for (var i=0; i<parentScope.logInfo.tablesLocked.length; i++) {
                        if (item.tablesLocked.includes(parentScope.logInfo.tablesLocked[i])) {
                            return reject(Errors.ERR_027);
                        }
                    }
                });
                // if not, continue:
                var attemptToLock = function (parentScope) {
                    console.log("*******New attemptToLock instance.");
                    // increment lock attempts counter:
                    /*parentScope.lockAttempts = parentScope.lockAttempts + 1;
                    // lock tables:
                    parentScope.database.lockTables(
                        parentScope.metadata.tablesToLock,
                        'WRITE',
                        Math.floor(Math.random() * (500 - 50 + 1) + 50)
                    )
                    .then((value) => {
                        console.log("Lock successful. Master timer reset.");
                        // reset master timer:
                        clearTimeout(parentScope.masterTimer);
                        parentScope.masterTimer = setTimeout(function(parentScope){
                            console.log("\n\n****\nMASTER TIMEOUT:");
                            console.log(true);
                            parentScope.coordinatorSocket.close();
                            parentScope.socketHttpsServer.close();
                        }, 2000, parentScope);
                        // we managed to lock tables.
                        // Do backup and Write log:
                        return parentScope.writeLog(parentScope);
                    })
                    .then((value) => {
                        console.log("outer: backup done.");
                        console.log(parentScope.logInfo);
                        // start transaccion:
                        return parentScope.database.openTransacction();
                    })
                    .then( ( value ) => {
                        console.log("outer: server started.");
                        return */parentScope.startServer(parentScope)/*;
                    })*/
                    .then((value) => {
                        console.log("outer: server closed  (?).");
                        // determine if we completed the operation or not:
                        if (parentScope.logInfo.state == 0) {
                            return resolve (Errors.SUCCESS);
                        } else {
                            return resolve (Errors.ERR_025);
                        }
                    })
                    .catch((err) => {
                        console.log("Something failed.");
                        console.log(err);
                        // could not lock tables. Try again:
                        /*if (parentScope.lockAttempts <= 5) {
                            parentScope.database.destroyConnection();
                            parentScope.database = new SQL.Connection('localhost','multi');
                            attemptToLock(parentScope);
                        } else {
                            clearTimeout(parentScope.masterTimer);
                            parentScope.database.destroyConnection();
                            return reject(err);
                        }*/
                        return reject(err);
                        //socket.close();
                        //resolve(Errors.ERR_024);
                    });
                };
                //console.log(parentScope);
                attemptToLock(parentScope);
            });
            /*
            lockLocalTables();
            if (this.participantsList.length > 0) {
                lockLocalTables();
            }
            this.socketHttpsServer.listen(this.port);
            */
        }
        writeLog (parentScope) {
            // create file handle:
            var logStream = fs.createWriteStream(
                'logs/pending/' + parentScope.logInfo.id,
                {flags: 'w'}
            );
            // get rollback info and write log:
            console.log("BACKUP:");
            console.log(parentScope.logInfo.backupQuery);
            console.log(parentScope.logInfo.parameterList);
            // unaltered args:
            var args = parentScope.logInfo.parameterList;
            return new Promise(function(resolve, reject) {
                parentScope.database.query(
                    parentScope.logInfo.backupQuery,
                    parentScope.logInfo.parameterList
                )
                .then( ( value ) => {
                    console.log("backup query done:");
                    console.log(value);
                    console.log("ALTERED:");
                    // remove confirmation parameters from backup result (first two):
                    delete value[0][0].IdentificadorSitio;
                    delete value[0][0].IdUniversidadSitio;
                    console.log(value[0][0]);
                    // convert all Buffer elements to strings:
                    for (var prop in value[0][0]) {
                        if (Object.prototype.hasOwnProperty.call(value[0][0], prop)) {
                            // check if property is buffer:
                            if (Buffer.isBuffer(value[0][0][prop]) == true ) {
                                value[0][0][prop] = value[0][0][prop].toString();
                            }
                        }
                    }
                    // create complex recovery for alumno20:
                    if (parentScope.logInfo.caller == "alumno" &&
                    parentScope.logInfo.operation == "20")
                    {
                        /*
                        OLD!
                        console.log("STUDENT20");
                        // copy:
                        var tempArgs = args;
                        // extract first 4 elements:
                        var firstHalf = tempArgs.splice(0, 4);
                        // modify indexes 1 and 3
                        firstHalf[1] = value[0][0].OrigenInsercion;
                        firstHalf[3] = true;
                        // create final array:
                        var completeArgs = [];
                        // append first half:
                        completeArgs = completeArgs.concat(firstHalf);
                        // delete redundant elements from DB's response:
                        delete value[0][0].ClaveInsercion;
                        delete value[0][0].OrigenInsercion;
                        // append middle half:
                        completeArgs = completeArgs.concat(
                            Object.values(value[0][0])
                        );
                        // append last part:
                        completeArgs = completeArgs.concat(tempArgs);
                        // save final result into normal parameters:
                        parentScope.logInfo.parameterList = completeArgs;
                        // save final result into rollback parameters:
                        parentScope.logInfo.rollbackParameters = firstHalf;
                        */

                        console.log("STUDENT20");
                        console.log(parentScope.logInfo.parameterList);
                        var temp01 = parentScope.logInfo.parameterList[4];
                        var temp02 = parentScope.logInfo.parameterList[5];
                        //temp02.splice(9, 6);
                        console.log(temp01);
                        console.log(temp02);

                        console.log(parentScope.logInfo.parameterList);
                        //parentScope.logInfo.parameterList.splice(3, 1);
                        parentScope.logInfo.parameterList.splice(4, 2);
                        //parentScope.logInfo.parameterList.splice(4, 1);
                        console.log(parentScope.logInfo.parameterList);

                        // update clave insercion:
                        parentScope.logInfo.parameterList[1] = value[0][0].OrigenInsercion;

                        // extract rollback parameters:
                        var rollbackArgs = Object.values(value[0][0]);

                        // always true:
                        parentScope.logInfo.parameterList[3] = true;

                        delete value[0][0].ClaveInsercion;
                        delete value[0][0].OrigenInsercion;
                        console.log(Object.values(value[0][0]));
                        parentScope.logInfo.parameterList = parentScope.logInfo.parameterList.concat( Object.values(value[0][0]) ); //args;
                        parentScope.logInfo.parameterList.push(temp01);
                        parentScope.logInfo.parameterList.push(temp02);
                        console.log("****FINAL:");
                        console.log(parentScope.logInfo.parameterList);
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
                    // write to log:
                    logStream.end(
                        JSON.stringify(parentScope.logInfo)
                    );
                    return resolve (Errors.SUCCESS);
                }).catch( ( err ) => {
                    // error, delete file:
                    console.log("log error:");
                    console.log(err);
                    fs.unlink(
                        'logs/pending/' + parentScope.operationId,
                        function (err) { }
                    );
                    return reject(err);
                });
            });
        }
        startServer (parentScope) {
            return new Promise((resolve, reject) => {
                parentScope.socketHttpsServer.on('close', function() {
                    console.log("server 'close' event fired.");
                    resolve(Errors.SUCCESS);
                });
                parentScope.socketHttpsServer.listen(parentScope.port);
                // call for participants:
                console.log("TARGETS FOR MASTER:");
                console.log(parentScope.metadata.targets);
                parentScope.masterServer.askForParticipants(
                    parentScope.port,
                    parentScope.metadata.targets
                );
            });
        }
        stop () {
            // check if this movement was only local. If so, just write
            // the changes to disk, unlock tables and set state to 'Done'.
            // If was distributed, check if we got atleast one final acknowledge,
            // If we did, write to disk, unlock and set to 'Done'.
            // If we got none, rollback and set to 'Canceled'.
            console.log("started stop.");
            var parentScope = this;
            return new Promise((resolve, reject) => {
                console.log("***STARTED NORMAL STOP.");
                parentScope.socketHttpsServer.close();
                parentScope.coordinatorSocket.close();
                parentScope.database.endConnection().catch((err) => {
                    database.destroyConnection();
                });
                return resolve (Errors.SUCCESS);
                /*
                // iterate over logInfo and convert all Buffer elements to strings:
                for (var prop in parentScope.logInfo) {
                    if (Object.prototype.hasOwnProperty.call(parentScope.logInfo, prop)) {
                        // check if property is buffer:
                        if (Buffer.isBuffer(parentScope.logInfo) == true ) {
                            parentScope.logInfo[prop] = parentScope.logInfo[prop].toString();
                        }
                    }
                }
                // write log update:
                // if state == Done, write copy to done folder and delete
                // the one on pending:
                    // set pending to canceled.
                if (parentScope.logInfo.state != '0') {
                    parentScope.logInfo.state = '2';
                }
                if (parentScope.logInfo.state == '1') {
                    // this never gets called.
                    // simply update this file:
                    var logStream = fs.createWriteStream(
                        'logs/pending/' + parentScope.logInfo.id,
                        {flags: 'w'}
                    );
                    logStream.on('finish', (err) => {
                        console.log("WROTE PENDING LOG.");
                        return resolve (Errors.SUCCESS);
                    });
                    logStream.end(
                        JSON.stringify(parentScope.logInfo)
                    );
                } else {
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

                    logStream.on('finish', (err) => {
                        console.log("WROTE DONE LOG.");
                        return resolve (Errors.SUCCESS);
                    });
                    logStream.end(
                        JSON.stringify(parentScope.logInfo)
                    );
                }
                */
            });
        }

    } // END OF CLASS.

};
