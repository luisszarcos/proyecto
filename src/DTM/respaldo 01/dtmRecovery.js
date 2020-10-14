const SQL = require("./../sqlAccess.js");
const fs = require('fs');

var crypto = require("crypto");

const cert = fs.readFileSync('certificates/hostname.local.crt', 'utf8');

module.exports = {

    cert: cert,

    SOSclient: class SOSclient {
        constructor (coordinatorDir, host, logInfo, pendingLogs, database) {
            // set participant socket data:
            this.isOpen = true;
            this.coordinatorDir = coordinatorDir;
            this.database = database;
            this.lockAttempts = 0;

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
            this.logInfo = logInfo;
            console.log(this.logInfo);

            // set a callback to object scope inside 'coordinatorSocket':
            this.clientSocket.parentScope = this;

            // set events:
            this.attachCommunicationEvents(this.clientSocket, pendingLogs);
            this.attachErrorEvents(this.clientSocket, pendingLogs, logInfo, this);

        }

        attachCommunicationEvents (socket, pendingLogs) {
            var pendingLogs = pendingLogs;
            socket.on('connect', function () {
                console.log("\n\n****\nSOS connected.");
                // set some working variables:
                var parentScope = this.parentScope;
                var participantInfo = this.parentScope.participantInfo;
                participantInfo.logInfo = parentScope.logInfo;

                // ask for a room and send custom client data:
                //console.log(participantInfo);
                this.emit('S.O.S.call', participantInfo);
            });
            //
            socket.on('gotSOSdata', function ( data ) {
                console.log("\n\n****\nSOS data got.");
                console.log(data);
                // set some working variables:
                var parentScope = this.parentScope;
                var participantInfo = this.parentScope.participantInfo;
                // update logInfo with data from coordinator:
                parentScope.logInfo = data;
                // execute transacction:
                parentScope.database.openTransacction()
                .then((value) => {
                    console.log("SOS transacction started.");
                    // execute query:
                    return parentScope.database.query(
                        data.transacctionInfo,
                        []
                    );
                })
                .then((value) => {
                    console.log("SOS transacction finished. Commiting...");
                    // commit:
                    return parentScope.database.commitTransacction();
                })
                .then((value) => {
                    console.log("SOS unlocking tables.");
                    return parentScope.database.unlockTables();
                })
                .then((value) => {
                    console.log("SOS releasing connection...");
                    return parentScope.database.endConnection();
                })
                .then((value) => {
                    console.log("disconnecting...");
                    // delete log and put it on DONE:
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
                    });
                    logStream.end(
                        JSON.stringify(parentScope.logInfo)
                    );
                    this.emit('disconnect');
                })
                .catch((err) => {
                    console.log("SOS error:");
                    console.log(err);
                    this.emit('disconnect');
                });
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
                // release lock:
                parentScope.database.unlockTables()
                .then( ( value ) => {
                    console.log("SOS unlocked because connection failed.");
                    return parentScope.database.endConnection();
                })
                .then((value) => {
                    this.close();
                })
                .catch((err) => {
                    parentScope.database.destroyConnection();
                    this.close();
                });
            });
        }

        attachErrorEvents (socket, pendingLogs, logInfo, parentScope) {
            var pendingLogs = pendingLogs; // scope demands this.
            socket.on('connect_error', function ( err ) {
                console.log("connect_error:");
                console.log(err);
                console.log();
                // release lock:
                parentScope.database.unlockTables()
                .then( ( value ) => {
                    console.log("SOS unlocked because connection failed.");
                    return parentScope.database.endConnection();
                })
                .then((value) => {
                    // put log back on list:
                    pendingLogs.push(logInfo);
                    this.close();
                })
                .catch((err) => {
                    parentScope.database.destroyConnection();
                    // put log back on list:
                    pendingLogs.push(logInfo);
                    this.close();
                });
            });
            socket.on('connect_timeout', function ( err ) {
                console.log("connect_timeout:");
                console.log(err);
                console.log();
                // release lock:
                parentScope.database.unlockTables()
                .then( ( value ) => {
                    console.log("SOS unlocked because connection failed.");
                    return parentScope.database.endConnection();
                })
                .then((value) => {
                    // put log back on list:
                    pendingLogs.push(logInfo);
                    this.close();
                })
                .catch((err) => {
                    parentScope.database.destroyConnection();
                    // put log back on list:
                    pendingLogs.push(logInfo);
                    this.close();
                });
            });
            socket.on('reconnect_error', function ( err ) {
                console.log("reconnect_error:");
                console.log(err);
                console.log();
                // release lock:
                parentScope.database.unlockTables()
                .then( ( value ) => {
                    console.log("SOS unlocked because connection failed.");
                    return parentScope.database.endConnection();
                })
                .then((value) => {
                    // put log back on list:
                    pendingLogs.push(logInfo);
                    this.close();
                })
                .catch((err) => {
                    parentScope.database.destroyConnection();
                    // put log back on list:
                    pendingLogs.push(logInfo);
                    this.close();
                });
            });
            socket.on('reconnect_failed', function ( err ) {
                console.log("reconnect_failed:");
                console.log(err);
                console.log();
                // release lock:
                parentScope.database.unlockTables()
                .then( ( value ) => {
                    console.log("SOS unlocked because connection failed.");
                    return parentScope.database.endConnection();
                })
                .then((value) => {
                    // put log back on list:
                    pendingLogs.push(logInfo);
                    this.close();
                })
                .catch((err) => {
                    parentScope.database.destroyConnection();
                    // put log back on list:
                    pendingLogs.push(logInfo);
                    this.close();
                });
            });
        }

        close() {
            this.database.destroyConnection();
        }

    } // END OF CLASS.

};
