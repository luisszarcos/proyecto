const InputParser = require("./../inputParsing.js");
const SQL = require("./../sqlAccess.js");
const Errors = require("./../errors.js");
const mysql = require('mysql');
var crypto = require("crypto");

const UserIdentifier = 'alumno';

const operationsArray = [
    ['1_1' ,{fields:1,files:0}],['1_2' ,{fields:1,files:0}],['1_3' ,{fields:1,files:0}],
    ['1_4' ,{fields:1,files:0}],['2' ,{fields:1,files:0}],['3' ,{fields:1,files:0}],
    ['4' ,{fields:3,files:0}],['5' ,{fields:1,files:0}],['6' ,{fields:2,files:0}],

    ['7',{fields:3,files:1}],['8',{fields:1,files:0}],['9',{fields:2,files:0}],
    ['10',{fields:4,files:0}],['11',{fields:1,files:0}],['12',{fields:3,files:0}],
    ['13',{fields:1,files:0}],['14',{fields:0,files:0}],['15',{fields:2,files:0}],
    ['16',{fields:1,files:0}],

    ['17',{fields:1,files:0}],['18',{fields:1,files:0}],['19_1',{fields:1,files:0}],
    ['19_2',{fields:4,files:0}],['20',{fields:4,files:0}],['21',{fields:1,files:0}],
    ['22_1',{fields:1,files:0}],['22_2',{fields:1,files:0}],['23',{fields:3,files:0}]
];

const validMimeListPerOperation = [
    ['4',InputParser.imageFileTypes],
    ['7',InputParser.acceptedFileTypes],
    ['20',InputParser.imageFileTypes]
];

/*
        index.              (int (always starts at 0))
        req.                (object with properties)
        res.                (object with properties)
        parsedReq:          (object with properties)
            fields.         (object with properties)
            fieldsMap.      (Map)
            files.          (object with properties)
            joinedParams    (array)
        functionList.       (array)
        callbackResults.    (array)
        callbackErrors.     (array)
        serverResponse.     (JSON)
        callerScope.        (object)
        callerType.         (string)
        targetOperation.    (int)
        query.              (string)
        queryArgs.          (string)
        tablesToLock        (array of strings)
*/
const callBackArray = [
    ['1_1',['getQueryFromPackage','localQuery','sendResponse']],
    ['1_2',['getQueryFromPackage','localQuery','sendResponse']],
    ['1_3',['getQueryFromPackage','localQuery','sendResponse']],

/*READ DISTRIBUIDO:*/
    ['1_4',['getQueryFromPackage','distributedRead','sendResponse']],
    ['2',['getQueryFromPackage','distributedRead','sendResponse']],
/*                      */

    ['3',['getQueryFromPackage','localQuery','sendResponse']],

/*UPDATE DISTRIBUIDO    */
    ['4',['getQueryFromPackage','distributedUpdate','sendResponse']],
/*                      */

    ['5',['getQueryFromPackage','localQuery','sendResponse']],
    ['6',['getQueryFromPackage','localQuery','sendResponse']],
    ['7',['getQueryFromPackage','localQuery','sendResponse']],
    ['8',['getQueryFromPackage','localQuery','sendResponse']],
    ['9',['getQueryFromPackage','localQuery','sendResponse']],

    ['10',['getQueryFromPackage','localQuery','sendResponse']],
    ['11',['getQueryFromPackage','localQuery','sendResponse']],
    ['12',['getQueryFromPackage','localQuery','sendResponse']],
    ['13',['getQueryFromPackage','localQuery','sendResponse']],
    ['14',['getQueryFromPackage','localQuery','sendResponse']],

/*READ DISTRIBUIDO:*/
    ['15',['getQueryFromPackage','distributedRead','sendResponse']],
    ['16',['getQueryFromPackage','distributedRead','sendResponse']],
    ['17',['getQueryFromPackage','distributedRead','sendResponse']],
    ['18',['getQueryFromPackage','distributedRead','sendResponse']],
    ['19_1',['getQueryFromPackage','distributedRead','sendResponse']],
    ['19_2',['getQueryFromPackage','distributedRead','sendResponse']],
/*                      */

/*INSERT DISTRIBUIDO:   */
    ['20',['getQueryFromPackage','distributedInsert','sendResponse']],
/*                      */

/*READ DISTRIBUIDO:*/
    ['21',['getQueryFromPackage','distributedRead','sendResponse']],
    ['22_1',['getQueryFromPackage','distributedRead','sendResponse']],
    ['22_2',['getQueryFromPackage','distributedRead','sendResponse']],

/*UPDATE DISTRIBUIDO    */
    ['23',['getQueryFromPackage','distributedUpdate','sendResponse']]
/*                      */
];


/*
    lock list per operation:
*/
const lockArray = [
    ['1_4',['alumno_tema_impartido','alumno','identificador_sitio']],
    ['2',['alumno','area_conocimiento','universidad','identificador_sitio']],
    ['4',['alumno','identificador_sitio']],

    ['14',['universidad','identificador_sitio']],
    ['15',['posgrado','area_conocimiento','alumno','identificador_sitio']],
    ['16',['posgrado','identificador_sitio']],

    ['17',['posgrado','universidad','linea_investigacion','identificador_sitio']],
    ['18',['linea_investigacion','tema','identificador_sitio']],
    ['19_1',['alumno','universidad','area_conocimiento','identificador_sitio']],

    ['19_2',['universidad','posgrado','linea_investigacion','tema','identificador_sitio']],
    ['20',['alumno','identificador_sitio','solicitud']],
    ['21',['solicitud','tema','linea_investigacion','posgrado','identificador_sitio']],

    ['22_1',['solicitud','alumno','area_conocimiento','universidad','identificador_sitio']],
    ['22_2',['solicitud','tema','linea_investigacion','posgrado','universidad','identificador_sitio']],
    ['23',['solicitud','identificador_sitio','alumno']],
];

module.exports = {

    UserIdentifier: UserIdentifier,
    operationMapping: new Map(operationsArray),
    mimeMapping: new Map(validMimeListPerOperation),
    callBack: new Map(callBackArray),
    lockMapping: new Map(lockArray),

    createQueryCall: function (operation, n) {
        var numericIdentifier = Number(operation);
        var numericN = Number(n);

        if (numericN < 0 || numericIdentifier <= 0) {
            return null;
        }
        var returnValue = "call " + UserIdentifier;
        returnValue += numericIdentifier.toString() + "(";
        for (var i = 0; i < (numericN - 1); i++) {
            returnValue += "?,";
        }
        if (numericN > 0) {
            returnValue += "?";
        }
        returnValue += ")"
        return returnValue;
    },

    processRequest: function (req, res) {

        var operationMapping = this.operationMapping;
        var mimeMapping = this.mimeMapping;
        var createQueryCall = this.createQueryCall;
        var TargetOperation = null;
        var SitioDestino = null;
        var UserIdentifier = this.UserIdentifier;
        var callBack = this.callBack;
        var parsedParams = null; // here we save the parsed req parameters.
        var fieldsMap = null; // here we save the map used to parse the fields.
        var callerScope = this;

        return new Promise ( ( resolve, reject ) => {
            // parse parameters:
            InputParser.parseMultipartForm(req)
            .then( (value) => {

                console.log(value.fields);
                console.log(value.files);

                // save the parsed parameters:
                parsedParams = value;

                // save target site:
                SitioDestino = value.fields.SitioDestino;

                // save target operation:
                TargetOperation = value.fields.Operation;

                // check if the target operation they are requesting is valid:
                if ( !(operationMapping.get(TargetOperation)) ) {
                    return reject (Errors.ERR_010);
                }

                // remove the target site from inputs:
                //delete value.fields.SitioDestino;
                // remove the Operation from the inputs:
                delete value.fields.Operation;

                // get data requiered to validate (map, expectedFields):
                var funcName = UserIdentifier + TargetOperation;
                fieldsMap = this[funcName]();

                // validate that we registered the appropriate function:
                if (!fieldsMap) {
                    return reject (Errors.ERR_018);
                }

                // return validation promise:
                return InputParser.globalValidate(
                    value.fields,
                    fieldsMap,
                    operationMapping.get(TargetOperation).fields,
                    value.files,
                    mimeMapping.get(TargetOperation),
                    operationMapping.get(TargetOperation).files
                );
            })
            .then( ( value ) => {
                // unpack files:
                var unpackedFileArray = [];
                for(var i = 0; i < value.files.length; i++) {
                    var obj = value.files[i];
                    unpackedFileArray.push(obj.ext);
                    unpackedFileArray.push(obj.name);
                    unpackedFileArray.push(obj.buffer);
                }

                // create callback package:
                var package = new Object();
                package.index = 0;
                package.req = req;
                package.res = res;
                package.parsedReq = new Object();
                package.parsedReq.fields = parsedParams.fields;
                package.parsedReq.fieldsMap = fieldsMap;
                package.parsedReq.files = parsedParams.files;
                package.parsedReq.joinedParams = value.fields.concat(
                    unpackedFileArray
                );
                package.functionList = callBack.get(TargetOperation);
                package.callbackResults = [];
                package.callbackErrors = null;
                package.serverResponse = null;
                package.query = null;
                package.queryArgs = null;
                package.SitioDestino = SitioDestino;
                package.callerType = UserIdentifier;
                package.targetOperation = TargetOperation;
                package.tablesToLock = this.lockMapping.get(
                    package.targetOperation
                );
                package.callerScope = callerScope;

                console.log(package.parsedReq.joinedParams);

                // return the package object:
                return resolve (package);
            })
            .catch( ( err ) => {
                return reject (err);
            });

        });
    },

/*
    The next group of functions return the
    map and queries which we'll use to validate the fields:
*/

    alumno1_1:  function () {
        var map = new Map();
        map.set("idAlumno",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q1_1: function (package) {
                    var args = [
                        package.parsedReq.fields.idAlumno,
                    ];
                    var query = 'call alumno1_1(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    alumno1_2:  function () {
        var map = new Map();
        map.set("idAlumno",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q1_2: function (package) {
                    var args = [
                        package.parsedReq.fields.idAlumno,
                    ];
                    var query = 'call alumno1_2(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    alumno1_3:  function () {
        var map = new Map();
        map.set("idAlumno",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q1_3: function (package) {
                    var args = [
                        package.parsedReq.fields.idAlumno,
                    ];
                    var query = 'call alumno1_3(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    alumno1_4:  function () {
        var map = new Map();
        map.set("idAlumno",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q1_4: function (package) {
                    var args = [
                        package.parsedReq.fields.idAlumno,
                    ];
                    var query = 'call alumno1_4(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    alumno2:  function () {
        var map = new Map();
        map.set("idAlumno",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q2: function (package) {
                    var args = [
                        package.parsedReq.fields.idAlumno,
                    ];
                    var query = 'call alumno2(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    alumno3:  function () {
        var map = new Map();
        map.set("idAlumno",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q3: function (package) {
                    var args = [
                        package.parsedReq.fields.idAlumno,
                    ];
                    var query = 'call alumno2(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    ////////////
    alumno4:  function () {
        var map = new Map();
        map.set("idAlumno",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        map.set("Telefono",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Phone,
                errorCode: Errors.ERR_009 }
        );
        map.set("Contrasena",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Password,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q4: function (package) {
                    var args = [
                        package.parsedReq.fields.idAlumno,
                        package.parsedReq.fields.Telefono,
                        package.parsedReq.fields.Contrasena,
                        // files:
                        /*
                        package.parsedReq.joinedParams[
                            package.parsedReq.joinedParams.length-3
                        ],
                        package.parsedReq.joinedParams[
                            package.parsedReq.joinedParams.length-2
                        ],
                        package.parsedReq.joinedParams[
                            package.parsedReq.joinedParams.length-1
                        ]
                        */
                        null, null, null
                    ];
                    var query = 'call alumno4(?,?,?,?,?,?);';
                    var backup = 'call backupalumno4(?);';
                    var rollback = 'call rollbackalumno4(?,?,?,?,?,?);';
                    query = mysql.format(query, args);
                    backup = mysql.format(backup, [package.parsedReq.fields.idAlumno]);
                    return {
                        query: query,
                        backup: backup,
                        rollback: rollback,
                    };
                },
    alumno5:  function () {
        var map = new Map();
        map.set("idRecurso",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q5: function (package) {
                    var args = [
                        package.parsedReq.fields.idRecurso
                    ];
                    var query = 'call alumno5(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    alumno6:  function () {
        var map = new Map();
        map.set("idAlumno",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        map.set("idActividad",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q6: function (package) {
                    var args = [
                        package.parsedReq.fields.idAlumno,
                        package.parsedReq.fields.idActividad
                    ];
                    var query = 'call alumno6(?,?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    alumno7:  function () {
        var map = new Map();
        map.set("idAlumno",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        map.set("idActividad",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("FechaSubida",{
                func: InputParser.validateDate,
                arguments: null,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q7: function (package) {
                    var args = [
                        package.parsedReq.fields.idAlumno,
                        package.parsedReq.fields.idActividad,
                        package.parsedReq.fields.FechaSubida,
                        // files:
                        package.parsedReq.joinedParams[
                            package.parsedReq.joinedParams.length-3
                        ],
                        package.parsedReq.joinedParams[
                            package.parsedReq.joinedParams.length-2
                        ],
                        package.parsedReq.joinedParams[
                            package.parsedReq.joinedParams.length-1
                        ]
                    ];
                    var query = 'call alumno7(?,?,?,?,?,?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    alumno8:  function () {
        var map = new Map();
        map.set("idCurso",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q8: function (package) {
                    var args = [
                        package.parsedReq.fields.idCurso
                    ];
                    var query = 'call alumno8(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    ////////////
    alumno9:  function () {
        var map = new Map();
        map.set("idAlumno",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        map.set("idCurso",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q9: function (package) {
                    var args = [
                        package.parsedReq.fields.idAlumno,
                        package.parsedReq.fields.idCurso
                    ];
                    var query = 'call alumno9(?,?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    alumno10: function () {
        var map = new Map();
        map.set("idAlumno",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        map.set("idCurso",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("publicacion",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Text,
                errorCode: Errors.ERR_009 }
        );
        map.set("Fecha",{
                func: InputParser.validateDate,
                arguments: null,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q10: function (package) {
                    var args = [
                        package.parsedReq.fields.idAlumno,
                        package.parsedReq.fields.idCurso,
                        package.parsedReq.fields.publicacion,
                        package.parsedReq.fields.Fecha
                    ];
                    var query = 'call alumno10(?,?,?,?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    alumno11: function () {
        var map = new Map();
        /*map.set("idAlumno",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );*/
        map.set("idPublicacion",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q11: function (package) {
                    var args = [
                        /*package.parsedReq.fields.idAlumno,*/
                        package.parsedReq.fields.idPublicacion
                    ];
                    var query = 'call alumno11(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    alumno12: function () {
        var map = new Map();
        map.set("idAlumno",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        map.set("idPublicacion",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("Respuesta",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Text,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q12: function (package) {
                    var dateNow = new Date();
                    dateNow = dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1) + '-' + dateNow.getDate() + ' ' + dateNow.getHours() + ':' + dateNow.getMinutes() +
                        ':' + dateNow.getSeconds();
                    var args = [
                        package.parsedReq.fields.idAlumno,
                        package.parsedReq.fields.idPublicacion,
                        package.parsedReq.fields.Respuesta,
                        dateNow

                    ];
                    var query = 'call alumno12(?,?,?,?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    alumno13: function () {
        var map = new Map();
        map.set("idAlumno",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q13: function (package) {
                    var args = [
                        package.parsedReq.fields.idAlumno
                    ];
                    var query = 'call alumno13(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    alumno14: function () {
        var map = new Map();
        return map;
    },
                q14: function (package) {
                    var args = [];
                    var query = 'call alumno14();';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },


    alumno15: function () {
        var map = new Map();
        map.set("idUniversidad",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,10
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("idAlumno",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,10
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q15: function (package) {
                    var args = [
                        package.parsedReq.fields.idUniversidad,
                        package.parsedReq.fields.idAlumno,
                    ];
                    var query = 'call alumno15(?,?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    alumno16: function () {
        var map = new Map();
        map.set("idPosgrado",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,8
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q16: function (package) {
                    var args = [
                        package.parsedReq.fields.idPosgrado
                    ];
                    var query = 'call alumno16(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    alumno17: function () {
        var map = new Map();
        map.set("idPosgrado",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,8
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q17: function (package) {
                    var args = [
                        package.parsedReq.fields.idPosgrado
                    ];
                    var query = 'call alumno17(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    alumno18: function () {
        var map = new Map();
        /*map.set("idPosgrado",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,8
                ),
                errorCode: Errors.ERR_009 }
        );*/
        map.set("idLinea",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,8
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q18: function (package) {
                    var args = [
                        /*package.parsedReq.fields.idPosgrado,*/
                        package.parsedReq.fields.idLinea
                    ];
                    var query = 'call alumno18(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    alumno19_1: function () {
        var map = new Map();
        map.set("idAlumno",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q19_1: function (package) {
                    var args = [
                        package.parsedReq.fields.idAlumno
                    ];
                    var query = 'call alumno19_1(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    alumno19_2: function () {
        var map = new Map();
        map.set("idUniversidad",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("idPosgrado",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,8
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("idLinea",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,8
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("idTema",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,8
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q19_2: function (package) {
                    var args = [
                        package.parsedReq.fields.idUniversidad,
                        package.parsedReq.fields.idPosgrado,
                        package.parsedReq.fields.idLinea,
                        package.parsedReq.fields.idTema
                    ];
                    var query = 'call alumno19_2(?,?,?,?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },

    ////////////////////
    alumno20: function () {
        var map = new Map();
        map.set("idAlumno",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        map.set("idTema",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("FechaSolicitud",{
                func: InputParser.validateDate,
                arguments: null,
                errorCode: Errors.ERR_009 }
        );
        map.set("idDestino",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,10
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                // here we need the unnaltered fields:
                q20: function (package) {
                    //
                    var ClaveAlumno = crypto.randomBytes(100).toString('hex');
                    var OrigenAlumno = null; // must change later.
                    var ClaveSolicitud = crypto.randomBytes(100).toString('hex');;
                    var OrigenSolicitud = true;
                    var args = [
                        ClaveAlumno,
                        OrigenAlumno,
                        ClaveSolicitud,
                        OrigenSolicitud,
                        package.parsedReq.fields.idTema,
                        package.parsedReq.fields.FechaSolicitud
                    ];
                    var query = // 26
                    'call alumno20(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
                    var backup = 'call backupalumno20(?);'; // 1
                    var rollback = 'call rollbackalumno20(?,?,?,?);'; // 4
                    //query = mysql.format(query, args);
                    backup = mysql.format(backup, [package.parsedReq.fields.idAlumno]);
                    return {
                        query: query,
                        backup: backup,
                        rollback: rollback,
                        args: args,
                        target: package.parsedReq.fields.idDestino
                    };
                },
    alumno21: function () {
        var map = new Map();
        map.set("idAlumno",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q21: function (package) {
                    var args = [
                        package.parsedReq.fields.idAlumno
                    ];
                    var query = 'call alumno21(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    alumno22_1: function () {
        var map = new Map();
        map.set("idSolicitud",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_Id,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q22_1: function (package) {
                    var args = [
                        package.parsedReq.fields.idSolicitud
                    ];
                    var query = 'call alumno22_1(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    alumno22_2: function () {
        var map = new Map();
        map.set("idSolicitud",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_Id,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q22_2: function (package) {
                    var args = [
                        package.parsedReq.fields.idSolicitud
                    ];
                    var query = 'call alumno22_2(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },

    alumno23: function () {
        var map = new Map();
        map.set("idSolicitud",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_Id,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("EstadoAlumno",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_EstadoAlumno,
                errorCode: Errors.ERR_009 }
        );
        map.set("idDestino",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,10
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q23: function (package) {
                    var args = [
                        Number(package.parsedReq.fields.idSolicitud),
                        package.parsedReq.fields.EstadoAlumno
                    ];
                    // save target:
                    package.target = package.parsedReq.fields.idDestino;
                    var query = 'call alumno23(?,?);';
                    query = mysql.format(query, args);
                    var backup = 'call backupalumno23(?);';
                    backup = mysql.format(
                        backup,
                        Number(package.parsedReq.fields.idSolicitud)
                    );
                    return {
                        query: query,
                        rollback: "call rollbackalumno23(?,?);",
                        backup: backup,
                        args: [],
                        target: package.parsedReq.fields.idDestino
                    };
                },

    /*****************************************************************************
    ******************************************************************************
    ******************************************************************************
    ******************************************************************************
    *****************************************************************************/

};
