const Coordinator = require('./dtmCoordinator.js');
const Participant = require("./dtmParticipant.js");
const Recovery = require("./dtmRecovery.js");
var SQL = require("./../sqlAccess.js");
const Errors = require("./../errors.js");

var crypto = require("crypto");
const fs = require('fs');

const host = 'http://localhost';

const sites = [
    'http://localhost',
];

// create server:
const socketServer = require('http').createServer({
  //key: fs.readFileSync('certificates/hostname.local.key', 'utf8'),
  //cert: fs.readFileSync('certificates/hostname.local.crt', 'utf8')
});
socketServer.listen(9000);

const cert = 1//fs.readFileSync('certificates/hostname.local.crt', 'utf8');


// create pending log array. This is an array of 'logInfo' objects:
//var pendingLogs = [];
var pendingLogs = new Object();
pendingLogs.pendingLogs = [];
pendingLogs.isOccupied = false;


// create socket interface and start listening:
const masterSocket = require('socket.io')(socketServer);
// All messages come with the client custom id.
// All the inside handlers MUST be corresponding to the 'client' object.
masterSocket.on('connection', function ( client ) {
    console.log("connected to master.");
    var parentScope = this;
    console.log(client.client.conn.remoteAddress);

    client.on('requestParticipant', function ( clientInfo ) {
        console.log("\n*************requestParticipant:");
        console.log(clientInfo);

        // get random room and disconnect the client:
        var room = crypto.randomBytes(40).toString('hex');
        console.log(room);
        client.join(room);
        masterSocket.sockets.in(room).emit('disconnect');

        // create a client and connect to the indicated coordinator:
        var targetServer = clientInfo.host + ':' + clientInfo.port;
        console.log("triying to connect to:");
        console.log(targetServer);
        var part = new Participant.Participant(targetServer, host, pendingLogs);
    });

    client.on('S.O.S.call', function ( data ) {
        console.log("S.O.S.call");
        console.log(data);
        // get random room:
        var room = crypto.randomBytes(40).toString('hex');
        console.log(room);
        client.join(room);
        // check if call comes from a different host:
        if (data.host != host) {
            // check if we have the id operation on our DONE logs.
            // If so, serve it to the caller.
            var operationId = data.logInfo.id;
            if (fs.existsSync('./registro/done/' + operationId)) {
                console.log("SOS LOG EXISTS...");
                var response = fs.readFileSync(
                    './registro/done/' + operationId,
                    'utf8'
                );
                response = JSON.parse(response);
                masterSocket.sockets.in(room).emit('gotSOSdata', response);
            } else {
                console.log("SOS LOG DOES NOT EXIST");
                masterSocket.sockets.in(room).emit('disconnect');
            }
        } else {
            console.log("REJECTED");
            masterSocket.sockets.in(room).emit('disconnect');
        }
    });

    client.on('READquery', function ( data ) {
        console.log("READquery");
        console.log(data);
        console.log("Entered distributed query execution:");
        // get random room:
        var room = crypto.randomBytes(40).toString('hex');
        console.log(room);
        client.join(room);
        // get tablesToLock, query and args:
        var tablesToLock = data.tablesToLock;
        var query = data.query;
        var args = data.args;
        // execute query and return result:
        var database = new SQL.Connection('localhost','multi');
        database.lockTables(
            tablesToLock,
            'READ',
            Math.floor(Math.random() * (2000 - 500 + 1) + 500)
        )
        .then((value) => {
            console.log("READ lock got. Executing query...");
            return database.query(query, args);
        })
        .then((value) => {
            console.log("Done.");
            // all good, send results:
            masterSocket.sockets.in(room).emit(
                'resultsFromREAD',
                /*JSON.stringify(*/value[0]//)
            );
            // end connection:
            return database.endConnection().catch((err) => {
                console.log(err);
                database.destroyConnection();
                return "1";
            });
        })
        .then((value) => {
            return "0";
        })
        .catch((err) => {
            console.log("Error on distributed READ.");
            console.log(err);
            // report error:
            masterSocket.sockets.in(room).emit(
                'resultsFromREAD',
                "24" // Errors.ERR_024
            );
            // end connection:
            database.endConnection().catch((err) => {
                console.log(err);
                database.destroyConnection();
                return "1";
            });
        });
    });

});







// update the list at startup:
fs.readdirSync('./registro/pending/').forEach( file => {
    // read contents:
    var contents = fs.readFileSync('./registro/pending/' + file, 'utf8');
    // append to array:
    pendingLogs.pendingLogs.push(JSON.parse(contents));
});
// start SOS daemon:
function SOSdaemon() {
    console.log("\t\tDAEMON RUNNED.");
    /*
    // read logs:
    var tempLogList = [];
    // update the list at startup:
    fs.readdirSync('./logs/pending/').forEach( file => {
        // read contents:
        var contents = fs.readFileSync('./logs/pending/' + file, 'utf8');
        // append to array:
        tempLogList.push(JSON.parse(contents));
    });
    pendingLogs = tempLogList;
    */
    // get one element out of the daemon and try to get it:
    var pendingElement;
    if (pendingLogs.pendingLogs.length > 0 && pendingLogs.isOccupied == false) {
        pendingLogs.isOccupied = true;
        console.log("SOS SERVER STARTED.");
        console.log(pendingLogs.pendingLogs);
        // copy element:
        pendingElement = pendingLogs.pendingLogs[0];
        //pendingElement.tablesLocked = JSON.parse(pendingElement.tablesLocked);
        // delete element from file:
        pendingLogs.pendingLogs.splice(0, 1);
        console.log(pendingElement);
        console.log(typeof pendingElement.tablesLocked);

        // try to lock tables:
        var database = new SQL.Connection('localhost','multi');
        database.lockTables(
            pendingElement.tablesLocked,
            'WRITE',
            Math.floor(Math.random() * (2000 - 500 + 1) + 500)
        )
        .then((value) => {
            console.log("SOS lock successful.");
            // try and connect to the coordinator:
            var targetServer = pendingElement.coordinatorAddress + ':' + '9000';
            var sosClient = new Recovery.SOSclient(
                targetServer,
                host,
                pendingElement,
                pendingLogs,
                database
            );
        })
        .catch((err) => {
            console.log("SOS error:");
            console.log(err);
            // add to list:
            pendingLogs.pendingLogs.push(pendingElement);
            // try break local deadlock:
            database.unlockTables()
            .then((value) => {
                database.destroyConnection();
            })
            .catch((err) => {
                console.log(err);
                database.destroyConnection();
            });
        });
    }
}
setInterval(SOSdaemon, 5000);



var usedPorts = new Map();

module.exports = {

    cert: cert,
    masterSocket: masterSocket,
    usedPortsMapper: usedPorts,
    registeredSites: sites,
    pendingLogs: pendingLogs,
    isOccupied: pendingLogs.isOccupied,
    host: host,

    closeMasterServer: function () {
        this.masterSocket.close();
    },

    createCoordinator: function (metadata) {
        // get a free port:
        var port;
        for (var i=0; i<200; i++) {
            // get random port and test it:
            port = Math.floor(Math.random() * (10000 - 9002 + 1) + 9002);

            if (this.usedPortsMapper.get(port) != undefined ||
                this.usedPortsMapper.get(port) != null)
            {
                this.usedPortsMapper.set(port, true);
                break;
            }
        }
        // create the new server and return it:
        var newCoordinator = new Coordinator.Coordinator(
            this.host,
            port,
            metadata.targets/*this.registeredSites*/,
            metadata,
            this
        );
        return newCoordinator;
    },

    askForParticipants: function (port, targets) {
        // create temporary clients and send
        // messages to all the other master servers:
        console.log("TARGETS:");
        console.log(targets);
        var localHost = this.host;
        if (targets != null && targets != undefined) {
            
            var getCallClient02 = this.getCallClient;
            var testFunction = function (i, maxLength, targets) {
                console.log("NEW SOCKET 1.");
                console.log(i);
                console.log(targets[i]);
                getCallClient02(localHost, targets[i], port)
                .then( (value) => {
                    console.log("***SOCKET FINISHED.");
                    testFunction(i+1, maxLength, targets);
                    return "0";
                })
                .catch( (err) => {
                    console.log("***ERROR ON SOCKET.");
                    console.log(err);
                });
            }
            testFunction(0, targets.length, targets);

        } else {
            var getCallClient02 = this.getCallClient;
            var testFunction = function (i, maxLength, targets) {
                console.log("NEW SOCKET 2.");
                console.log(i);
                console.log(targets[i]);
                getCallClient02(localHost, targets[i], port)
                .then( (value) => {
                    console.log("***SOCKET FINISHED.");
                    testFunction(i+1, maxLength, targets);
                    return "0";
                })
                .catch( (err) => {
                    console.log("***ERROR ON SOCKET.");
                    console.log(err);
                });
            }
            testFunction(0, targets.length, targets);
            
        }
    },

    getCallClient: function (localHost, host, portToConnectTo) {
        return new Promise((resolve, reject) => {
            
        var coordinatorDir = host + ':' + '9000';
        console.log("*********COORDINATORDIR:");
        console.log(coordinatorDir);
        console.log("-----");
        clientSocket = require('socket.io-client')(coordinatorDir, {
            forceNew: true,
            'force new connection': true,
            multiplex: false,
            secure: true,
            reconnect: true,
            reconnection: true,
            reconnectionAttempts: 10,
            reconnectionDelay: 1000, // 1 second.
            reconnectionDelayMax: 1000,
            autoConnect: true,
            timeout: 2000, // 2 seconds.
            ca: cert,
            rejectUnauthorized: false
        });
        //function 
        console.log(coordinatorDir);
        // set communication events:
            clientSocket.on('connect', function () {
                console.log("\n\ncall client connected");
                console.log(this.io.opts.hostname);
                console.log(host);
                console.log(portToConnectTo);
                // ask for a room and send custom client data:
                console.log("******INNER:");
                console.log(localHost);
                console.log(portToConnectTo);
                clientSocket.emit('requestParticipant', {
                    host: localHost,
                    port: portToConnectTo
                });
            });
            clientSocket.on('disconnect', function () {
                console.log("call client disconnect");
                
                clientSocket.close();
                return resolve ("0");
            });

        // set error events:
            clientSocket.on('connect_error', function ( err ) {
                console.log("connect_error:");
                console.log(err);
                clientSocket.close();
            });
            clientSocket.on('connect_timeout', function ( err ) {
                console.log("connect_timeout:");
                console.log(err);
                clientSocket.close();
            });
            clientSocket.on('reconnect_error', function ( err ) {
                console.log("reconnect_error:");
                console.log(err);
                clientSocket.close();
            });
            clientSocket.on('reconnect_failed', function ( err ) {
                console.log("reconnect_failed:");
                console.log(err);
                clientSocket.close();
            });

        clientSocket.open();
            
        });
    },

    returnPort: function (port) {
        parentScope.usedPortsMapper.delete(port);
    }

};
