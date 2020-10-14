const Coordinator = require('./dtmCoordinator.js');
const Participant = require("./dtmParticipant.js");
const Recovery = require("./dtmRecovery.js");
var SQL = require("./../sqlAccess.js");
const Errors = require("./../errors.js");

var crypto = require("crypto");
const fs = require('fs');

const host = 'https://192.168.100.4';

const sites = [
//    /*'https://192.168.1.64'*/ 'https://192.168.122.207'
    'https://192.168.100.244'
];

// create server:
const socketServer = require('https').createServer({
  key: fs.readFileSync('certificates/hostname.local.key', 'utf8'),
  cert: fs.readFileSync('certificates/hostname.local.crt', 'utf8')
});
socketServer.listen(9000);

const cert = fs.readFileSync('certificates/hostname.local.crt', 'utf8');




// create socket interface and start listening:
const masterSocket = require('socket.io')(socketServer);
// All messages come with the client custom id.
// All the inside handlers MUST be corresponding to the 'client' object.
masterSocket.on('connection', function ( client ) {
    console.log("connected to master.");
    var parentScope = this;

    client.on('requestParticipant', function ( clientInfo ) {
        console.log("requestParticipant:");
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
        var part = new Participant.Participant(targetServer, host);
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
            if (fs.existsSync('./logs/done/' + operationId)) {
                var response = fs.readFileSync(
                    './logs/done/' + operationId,
                    'utf8'
                );
                response = JSON.parse(response);
                masterSocket.sockets.in(room).emit('gotSOSdata', response);
            } else {
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
        })
        .catch((err) => {
            console.log("Error on distributed READ.");
            console.log(err);
            // report error:
            masterSocket.sockets.in(room).emit(
                'resultsFromREAD',
                "24" // Errors.ERR_024
            );
        });
    });

});





// create pending log array. This is an array of 'logInfo' objects:
var pendingLogs = [];
// update the list at startup:
fs.readdirSync('./logs/pending/').forEach( file => {
    // read contents:
    var contents = fs.readFileSync('./logs/pending/' + file, 'utf8');
    // append to array:
    pendingLogs.push(JSON.parse(contents));
});
// start SOS daemon:
function SOSdaemon() {
    console.log("\t\tDAEMON RUNNED.");
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
    // get one element out of the daemon and try to get it:
    var pendingElement;
    if (pendingLogs.length > 0) {
        console.log("SOS SERVER STARTED.");
        console.log(pendingLogs);
        // copy element:
        pendingElement = pendingLogs[0];
        //pendingElement.tablesLocked = JSON.parse(pendingElement.tablesLocked);
        // delete element from file:
        pendingLogs.splice(0, 1);
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
            pendingLogs.push(pendingElement);
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
            this.registeredSites,
            metadata,
            this
        );
        return newCoordinator;
    },

    askForParticipants: function (port, targets) {
        // create temporary clients and send
        // messages to all the other master servers:
        var localHost = this.host;
        if (targets != null && targets != undefined) {
            targets.forEach((item, i) => {
                this.getCallClient(localHost, item, port);
            });
        } else {
            this.registeredSites.forEach((item, i) => {
                this.getCallClient(localHost, item, port);
            });
        }
    },

    getCallClient: function (localHost, host, portToConnectTo) {
        var coordinatorDir = host + ':' + '9000';
        clientSocket = require('socket.io-client')(coordinatorDir, {
            secure: true,
            reconnect: false,
            reconnection: false,
            reconnectionAttempts: 0,
            reconnectionDelay: 1000, // 1 second.
            reconnectionDelayMax: 1000,
            autoConnect: true,
            timeout: 2000, // 2 seconds.
            ca: cert,
            rejectUnauthorized: false,
            forceNew: true  // IMPORTANT!!!!
        });
        console.log(coordinatorDir);
        // set communication events:
            clientSocket.on('connect', function () {
                console.log("call client connected");
                console.log(host);
                console.log(portToConnectTo);
                // ask for a room and send custom client data:
                clientSocket.emit('requestParticipant', {
                    host: localHost,
                    port: portToConnectTo
                });
            });
            clientSocket.on('disconnect', function () {
                console.log("call client disconnect");
                clientSocket.close();
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
    },

    returnPort: function (port) {
        parentScope.usedPortsMapper.delete(port);
    }

};



