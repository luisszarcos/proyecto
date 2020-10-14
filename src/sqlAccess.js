var mysql = require('mysql');
const Errors = require("./errors.js");

const database = 'bdposgrados';

module.exports = {

    database: database,

    Connection: class Database {

        constructor ( host, type ) {
            
            this.timeout = 10000; //10 seconds.
            this.host = host;
            this.hasLockedTables = false;
            switch (type) {
                case 'single':
                    this.type = 'single-query';
                    this.host = host;
                    this.connection = mysql.createConnection({
                        host: host,
                        user: "root",
                        password: "password",
                        database: database,
                        insecureAuth : true,
                        acquireTimeout: 30000
                    });
                    break;
                case 'multi':
                    this.type = 'multi-query';
                    this.connection = mysql.createConnection({
                        host: host,
                        user: "root",
                        password: "password",
                        database: database,
                        insecureAuth : true,
                        multipleStatements: true,
                        acquireTimeout: 30000
                    });
                    break;
                default:
                    this.type = 'single-query';
                    this.host = host;
                    this.connection = mysql.createConnection({
                        host: host,
                        user: "root",
                        password: "password",
                        database: this.database,
                        insecureAuth : true,
                        acquireTimeout: 30000
                    });
            }
        }
        query ( sql, args, timeout ) {
            
            var localTimeout;
            if (timeout == undefined || timeout == null) {
                var localTimeout = this.timeout;
            } else {
                var localTimeout = timeout;
            }

            return new Promise( ( resolve, reject ) => {
                this.connection.query( {
                    sql: sql,
                    timeout: localTimeout,
                    values: args
                }, ( err, rows ) => {
                    if ( err ) {
                        console.log("***Error on query:");
                        console.log(err);
                        
                        if (err.code == 'ER_ACCESS_DENIED_ERROR') {
                            if (this.host == 'localhost') {
                                return reject( Errors.ERR_002 );
                            } else {
                                return reject( Errors.ERR_003 );
                            }
                        }
                        if (err.code == 'PROTOCOL_SEQUENCE_TIMEOUT') {
                            console.log(this.host);
                            if (this.host == 'localhost') {
                                return reject( Errors.ERR_021 );
                            } else {
                                return reject( Errors.ERR_022 );
                            }
                        }
                        if (err.code == 'ER_DUP_ENTRY') {
                            console.log(this.host);
                            if (this.host == 'localhost') {
                                return reject( Errors.ERR_028 );
                            } else {
                                return reject( Errors.ERR_028 );
                            }
                        }
                        
                        
                        return reject( Errors.ERR_006 );
                    }

                    resolve( rows );
                } ); 
            } ); 
        }



        openTransacction () {
            var connection = this.connection;
            return new Promise((resolve, reject) => {
                connection.beginTransaction( function ( err ) {
                    
                  if (err) {
                      connection.destroy();
                      console.log("*** Error opening transacction.");
                      console.log(err);
                      return reject( Errors.ERR_013 );
                  }
                });
                return resolve(Errors.SUCCESS);
            });
        }
        lockTables (tableList, type, timeout) {
            
            var globalScope = this;
            var connection = this.connection;

            return new Promise((resolve, reject) => {
                var query = 'LOCK TABLES ';
                for (var i=0; i<tableList.length; i++) {
                    if (i < (tableList.length - 1)) {
                        query += tableList[i].toString() + ' ' + type +', ';
                    } else {
                        query += tableList[i].toString() + ' ' + type + ';';
                    }
                }
                console.log(query);
                return this.query(query, [], timeout)
                .then((value) => {
                    console.log("inner: tables locked.");
                    globalScope.hasLockedTables = true;
                    return resolve(value);
                })
                .catch((err) => {
                    console.log("inner: ERROR: tables not locked.");
                    globalScope.hasLockedTables = false;
                    console.log(err);
                    return reject(err);
                });
            });
        }
        unlockTables () {
            var globalScope = this;
            var connection = this.connection;

            return new Promise((resolve, reject) => {
                var query = 'UNLOCK TABLES;';
                return this.query(query, [])
                .then((value) => {
                    console.log("UNLOCK: success.");
                    globalScope.hasLockedTables = false;
                    return resolve(value);
                })
                .catch((err) => {
                    console.log("UNLOCK: error.");
                    globalScope.hasLockedTables = true;
                    console.log(err);
                    return reject(err);
                });
            });
        }
        commitTransacction () {
            var connection = this.connection;

            return new Promise(function(resolve, reject) {
                connection.commit(function(err) {
                  if (err) {
                      connection.destroy();
                      console.log("Error on commit transacction.");
                      console.log(err);
                      connection.rollback(function() {
                          connection.destroy();
                          console.log("Error on rollback.");
                          return reject( Errors.ERR_013 );
                      });
                  }
                  return resolve( Errors.SUCCESS );
                });
            });
        }
        rollbackTransacction () {
            var connection = this.connection;

            return new Promise((resolve, reject) => {
                connection.rollback(function() {
                    return resolve( Errors.ERR_013 );
                });
            });
        }
        endConnection () {
            var connection = this.connection;
            return new Promise(function(resolve, reject) {
                connection.end( err => {
                    if ( err ) {
                        connection.destroy();
                        return reject( Errors.ERR_023 );
                        console.log("*** Error al cerrar conexion de transaccion.\n");
                    }
                    console.log("Cerrada conexion de transaccion.\n");
                    return resolve( Errors.SUCCESS );
                });
            });
        }
        destroyConnection() {
            var connection = this.connection;

            return new Promise((resolve, reject) => {
                connection.destroy();
                console.log("Conexion destruida.");
                return resolve( Errors.SUCCESS );
            });
        }

    }

};
