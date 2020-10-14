const InputParser = require("./inputParsing.js");
const SQL = require("./sqlAccess.js");
const Errors = require("./errors.js");
const MasterServer = require("./DTM/masterDTMserver.js");
const ReadParticipant = require("./DTM/dtmReadParticipant.js");

var nodemailer = require('nodemailer');
const mysql = require('mysql');

var crypto = require("crypto");
const fs = require('fs');

/*
    Mailer object:
*/

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'proyectofinalweb2019@gmail.com',
    pass: 'Holamundo1'
  },
      tls: {
          rejectUnauthorized: false
      }
});

/*
    Available hosts:
*/
const AvailableHosts = [
    'https://192.168.100.244', 'https://192.168.100.4'
];

const targetMapping = [
    ['sitio1', 'https://192.168.100.4'],
    ['sitio2', 'https://192.168.100.244']
];


module.exports = {

    transporter: transporter,

    availableHosts: AvailableHosts,
    targetMapping: new Map(targetMapping),
    MasterServer: MasterServer,

    dispatchFunctionStack: function (package) {

                return new Promise((resolve, reject) => {

                if (package.index < package.functionList.length) {
                var funcName = package.functionList[package.index];

                                this[funcName](package)
                .then( ( value ) => {
                    package.index = package.index + 1;

                                                            return this.dispatchFunctionStack(package);
                })
                .catch( ( err ) => {
                    console.log("ERROR while dispatching:");
                    console.log(err);
                    return reject (err.toString());
                });
            } else {
                return resolve (Errors.SUCCESS);
            }

        });
    },



    func: function (package) {
        return new Promise((resolve, reject) => {

        });
    },

    sendResponse: function (package) {
        console.log("Enter send response.");
        var res = package.res;
        var response = package.serverResponse;
        if (response == null) {
            response = package.callbackErrors;
        }
        return new Promise((resolve, reject) => {
            res.writeHead(200, { 'content-type': 'text/plain' });
            res.end(response);
            return resolve(Errors.SUCCESS);
        });
    },

    distributedRead: function (package) {
        console.log("ENTERED: distributed READ.");
        console.log(package.tablesToLock);
        var availableHosts = this.availableHosts;
        var queryPromiseArray = [];
        return new Promise((resolve, reject) => {
            availableHosts.forEach((item, i) => {
                console.log("Inner.");
                console.log(item + ':9000');
                queryPromiseArray.push(
                    new ReadParticipant.ReadParticipant(
                        item + ':9000',
                        MasterServer.host,
                        package.query,
                        package.queryArgs,
                        package.tablesToLock
                    ).start()
                );
            });
            Promise.all(queryPromiseArray)
            .then( ( value ) => {
                // delete empty arrays:
                for (var i=0; i<value.length; i++) {
                    if (value[i].length == 0) {
                        value.splice(i, 1);
                        i = 0;
                    }
                }
                
                // iterate over logInfo and convert all Buffer elements to strings:
                for (var i=0; i<value.length; i++) { // ext. Array:
                    console.log(value[i]);
                    for (var prop in value[i]) {
                        if (Object.prototype.hasOwnProperty.call(value[i], prop)) {
                            // check if property is buffer:
                            if (Buffer.isBuffer(value[i]) == true ) {
                                value[i][prop] = value[i][prop].toString();
                            }
                        }
                    }
                }
                
                console.log("++++++++Inner:+++++++++");
                console.log(value);
                var results = JSON.stringify(value);
                package.serverResponse = results;
                resolve(Errors.SUCCESS);
            })
            .catch( ( err ) => {
                console.log("---------Inner error:-------------");
                console.log(err);
                reject(Errors.ERR_003);
            });
        });
    },

    distributedUpdate: function (package) {
        console.log("ENTERED: distributed UPDATE.");

        console.log("ARGS GOTTEN:");
        console.log(package.query);
        console.log(package.queryArgs);
        console.log(package.backup);
        console.log(package.rollback);
        var AvailableHosts = this.availableHosts;

        return new Promise((resolve, reject) => {
            var target = package.target;
            console.log("Target for distributed update:");
            console.log(target);
            
            if (this.targetMapping.get(target)) {
                target = [ this.targetMapping.get(target) ];
            } else {
                target = AvailableHosts;
            }
            
            var metadata = {
                callerScope: package.callerScope,
                targets: target,
                origen: true,
                caller: package.callerType,
                operation: package.targetOperation,
                tablesToLock: package.tablesToLock,
                backupQuery: package.backup,
                rollbackQuery: package.rollback,

                transacction: package.query,
                parameterList: package.queryArgs,
            };
            console.log("*******METADATA:");
            console.log(metadata);

                        var coor = MasterServer.createCoordinator(metadata);
                        coor.start()
            .then((value) => {
                console.log("***DTM finished.");
                console.log(value);
                                package.serverResponse = Errors.SUCCESS;
                                console.log("***Closing DTM.");
                return coor.stop();
            })
            .then((value) => {
                console.log("***DTM closed. Returning...");
                                return resolve(Errors.SUCCESS);
            })
            .catch((err) => {
                console.log("***Error: closing DTM...");
                console.log(err);
                coor.stop().catch( ( err ) => {
                    console.log("\tError closing DTM.");
                    console.log(err);
                });
                                package.serverResponse = Errors.ERR_025;
                                return resolve(Errors.ERR_025);
            });
        });
    },

    distributedInsert: function (package) {
        console.log("ENTERED: distributed INSERT.");

        console.log("ARGS GOTTEN:");
        console.log(package.parsedReq.joinedParams);

        return new Promise((resolve, reject) => {
            var clavei = crypto.randomBytes(100).toString('hex');
            var claveIarray = [ clavei ];
            var target = package.target;
            console.log(target);
            if (this.targetMapping.get(target)) {
                target = [ this.targetMapping.get(target) ];
            } else if (target != null) {
                console.log("UNKNOWN TARGET");
                return reject(Errors.ERR_025);
            } else if (target == null) {
                target = AvailableHosts;
            }
            

            var metadata = {
                callerScope: package.callerScope,
                targets: target,
                origen: true,
                caller: package.callerType,
                operation: package.targetOperation,
                tablesToLock: package.tablesToLock,
                                backupQuery: package.backup,
                rollbackQuery: package.rollback,

                transacction: package.query,
                parameterList: package.queryArgs
            };
            console.log(metadata);


            var coor = MasterServer.createCoordinator(metadata);
            coor.start()
            .then((value) => {
                console.log("***DTM finished.");
                console.log(value);
                                package.serverResponse = Errors.SUCCESS;
                                console.log("***Closing DTM.");
                return coor.stop();
            })
            .then((value) => {
                console.log("***DTM closed. Returning...");
                                return resolve(Errors.SUCCESS);
            })
            .catch((err) => {
                console.log("***Error: closing DTM...");
                console.log(err);
                coor.stop().catch( ( err ) => {
                    console.log("\tError closing DTM.");
                    console.log(err);
                });
                                package.serverResponse = Errors.ERR_025;
                                return resolve(Errors.ERR_025);
            });
        });
    },

    localQuery: function (package) {
        console.log("Enter: local query");

        var getQueryPromise = this.getQueryPromise;

        return new Promise((resolve, reject) => {
                        getQueryPromise('localhost', package.query, package.queryArgs)
            .then( ( value ) => {
                console.log("Finished local.");
                console.log(value);
                if (value[0] == undefined) {
                    return reject(Errors.ERR_005);
                }
                var res = [];
                res.push( value );
                package.serverResponse = JSON.stringify( res );
                return resolve(value);
            }).catch( ( err ) => {
                console.log("Error in local.");
                package.serverResponse = err;
                return reject(err);
            });

        });
    },

    getQueryPromise: function (host, query, args) {
        console.log("Enter get query promise.");
        var database = new SQL.Connection(host, 'multi');
        var retValue = null;
        return new Promise((resolve, reject) => {
            return database.openTransacction()
            .then((value) => {
                console.log(query);
                console.log(args);
                return database.query(query, args)
            })
            .then( ( value ) => {
                if (value == undefined) {
                    return reject("incorrect database.");
                }
                console.log("FINISHED:");
                console.log(value);
                retValue = value[0];
                console.log(retValue);

                console.log("*converting buffers to strings...");
                for (var prop in retValue[0]) {
                    if (Object.prototype.hasOwnProperty.call(retValue[0], prop)) {
                        //console.log(prop);
                        // check if property is buffer:
                        //console.log(prop);
                        if (Buffer.isBuffer(retValue[0][prop]) == true ) {
                            retValue[0][prop] = retValue[0][prop].toString();
                        }
                    }
                }
                return database.commitTransacction();
            })
            .then((value) => {
                                return database.endConnection();
            })
            .then((value) => {
                                return resolve(retValue);
            })
            .catch((err) => {
                console.log("ERROR:");
                return reject(err);
            });;
        });
    },

    getQueryFromPackage: function (package) {
        return new Promise(function(resolve, reject) {
            console.log("Entered getQueryFromPackage:");
            var funcName = 'q' + package.targetOperation;
            console.log(funcName);
            var query = package.callerScope[funcName](package);
            console.log(query);
            package.query = query.query;
            package.queryArgs = query.args;
            if (package.queryArgs == undefined) {
                package.queryArgs = [];
            }
                        package.target = query.target;
            if (package.target == undefined) {
                package.target = null;
            }
                        package.backup = query.backup;
            package.rollback = query.rollback;
            return resolve(query);
        });
    },

    saveFingerPrint: function (package) {

        return new Promise((resolve, reject) => {
                        console.log(package.serverResponse);
            var parsedJSON = JSON.parse(package.serverResponse);
            console.log(parsedJSON);
            if (parsedJSON[0][0] == undefined) {
                return reject(Errors.ERR_001);
            }
            var IdentificadorSitio = parsedJSON[0][0].IdentificadorSitio;
            var IdUniversidadSitio = parsedJSON[0][0].IdUniversidadSitio;
            console.log(IdentificadorSitio);
            console.log(IdUniversidadSitio);
                        package.req.session.IdentificadorSitio = IdentificadorSitio;
            package.req.session.IdUniversidadSitio = IdUniversidadSitio
            package.req.session.userType = package.parsedReq.fields.TipoUsuario;

            console.log("Session data:");
            console.log(package.req.session.IdentificadorSitio);
            console.log(package.req.session.IdUniversidadSitio);
            console.log(package.req.session.userType);

            return resolve(Errors.SUCCESS);
        });
    },

    sendRecoveryEmail: function (package) {
        var dest = package.parsedReq.fields.Correo;

        var pass = JSON.parse(package.serverResponse);
        pass = pass[0][0].Contrasena;

        var mailOptions = {
            from: 'soporte.edu.posgrado@gmail.com',
            to: dest,
            subject: 'Recuperación de contraseña.',
            text: 'Esta es tu contraseña: ' + pass +
                  ' Te recomendamos que la cambies lo antes posible.'
        };

        return new Promise((resolve, reject) => {
            this.transporter.sendMail(mailOptions, function(err, info){
                if (err) {
                    package.serverResponse = Errors.ERR_026;
                    return resolve (Errors.ERR_026);
                } else {
                    return resolve (Errors.SUCCESS);
                }
            });
        });
    }

};
