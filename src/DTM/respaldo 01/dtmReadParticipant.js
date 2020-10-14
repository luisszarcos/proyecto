const SQL = require("./../sqlAccess.js");
const fs = require('fs');
const Errors = require("./../errors.js");

var crypto = require("crypto");

const cert = fs.readFileSync('certificates/hostname.local.crt', 'utf8');

module.exports = {

    cert: cert,

    ReadParticipant: class ReadParticipant {
        constructor (coordinatorDir, host, query, args, tablesToLock) {
            // set participant socket data:
            this.isOpen = true;
            this.coordinatorDir = coordinatorDir;
            this.database = new SQL.Connection('localhost','multi');
            this.lockAttempts = 0;
            this.query = query;
            this.args = args;
            this.tablesToLock = tablesToLock;

            // set custom info:
            this.participantInfo = {
                id: crypto.randomBytes(30).toString('hex'),
                host: host
            };
        }

        start () {
            return new Promise((resolve, reject) => {

                this.clientSocket = require('socket.io-client')(this.coordinatorDir, {
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

                // set a callback to object scope inside 'coordinatorSocket':
                this.clientSocket.parentScope = this;

                /***********************
                ***********************/

                this.clientSocket.on('connect', function () {
                    console.log("\n\n****\nconnect");
                    // set some working variables:
                    var parentScope = this.parentScope;
                    var participantInfo = this.parentScope.participantInfo;
                    // send data:
                    console.log(participantInfo);
                    this.emit('READquery', {
                        query: parentScope.query,
                        args: parentScope.args,
                        tablesToLock: parentScope.tablesToLock
                    });
                });
                ////
                this.clientSocket.on('resultsFromREAD', function ( data ) {
                    console.log("\n\n****\nresultsFromREAD.");
                    console.log(data);
                    // set some working variables:
                    var socket = this;
                    var parentScope = this.parentScope;
                    var participantInfo = this.parentScope.participantInfo;
                    // return data:
                    resolve(data);
                    // disconnect:
                    this.emit('disconnect');
                });
                /*
                *
                */
                this.clientSocket.on('disconnect', function ( data ) {
                    console.log("\n\n****\nConnection lost. Killing DB connection.");
                    // set some working variables:
                    var socket = this;
                    var parentScope = this.parentScope;
                    var participantInfo = this.parentScope.participantInfo;
                    // kill database connection:
                    parentScope.database.destroyConnection();
                    // close this client:
                    this.close();
                });

                /**********************************************************
                **********************************************************/
                this.clientSocket.on('connect_error', function ( err ) {
                    console.log("connect_error:");
                    console.log(err);
                    console.log();
                    reject(Errors.ERR_022);
                    this.close();
                });
                this.clientSocket.on('connect_timeout', function ( err ) {
                    console.log("connect_timeout:");
                    console.log(err);
                    console.log();
                    reject(Errors.ERR_022);
                    this.close();
                });
                this.clientSocket.on('reconnect_error', function ( err ) {
                    console.log("reconnect_error:");
                    console.log(err);
                    console.log();
                    reject(Errors.ERR_022);
                    this.close();
                });
                this.clientSocket.on('reconnect_failed', function ( err ) {
                    console.log("reconnect_failed:");
                    console.log(err);
                    console.log();
                    reject(Errors.ERR_022);
                    this.close();
                });

            });
        }

        close() {
            this.database.destroyConnection();
        }

    } // END OF CLASS.

};
