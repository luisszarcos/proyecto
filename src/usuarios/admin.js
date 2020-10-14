const InputParser = require("./../inputParsing.js");
const SQL = require("./../sqlAccess.js");
const Errors = require("./../errors.js");
const mysql = require('mysql');

const UserIdentifier = 'admin';


const operationsArray = [
    ['1' ,{fields:1,files:0}],['2' ,{fields:5,files:0}],['3' ,{fields:1,files:0}],
    ['4' ,{fields:1,files:0}],['5' ,{fields:7,files:1}],['6' ,{fields:2,files:0}],
    ['7' ,{fields:1,files:0}],['8' ,{fields:1,files:0}],['9' ,{fields:1,files:0}],

    ['10',{fields:2,files:1}],['11',{fields:1,files:0}],['12',{fields:1,files:0}],
    ['13_1',{fields:5,files:0}],['13_2',{fields:2,files:0}],['13_3',{fields:2,files:0}],
    ['14_1',{fields:1,files:0}],['14_2',{fields:1,files:0}],['15',{fields:1,files:0}],

    ['16',{fields:1,files:0}],['17',{fields:2,files:0}],['18',{fields:1,files:0}],
    ['19',{fields:2,files:0}],['20',{fields:0,files:0}],['21',{fields:4,files:0}],
    ['22',{fields:1,files:0}],['23',{fields:1,files:0}],['24',{fields:1,files:0}],

    ['25',{fields:3,files:0}],['26',{fields:1,files:0}],['27',{fields:1,files:0}],
    ['28',{fields:7,files:0}],['29',{fields:2,files:0}],['30',{fields:1,files:0}],
    ['31',{fields:1,files:0}],['32',{fields:6,files:0}],['33',{fields:7,files:0}],

    ['34',{fields:1,files:0}],['35',{fields:2,files:0}],['36',{fields:5,files:0}],
    ['37',{fields:1,files:0}],['38',{fields:1,files:0}],['39',{fields:1,files:0}],
    ['40',{fields:3,files:0}]
];

const validMimeListPerOperation = [
    ['5',InputParser.acceptedFileTypes], ['10',InputParser.pdf]
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
    ['1',['getQueryFromPackage','localQuery','sendResponse']],
    ['2',['getQueryFromPackage','localQuery','sendResponse']],
    ['3',['getQueryFromPackage','localQuery','sendResponse']],
    ['4',['getQueryFromPackage','localQuery','sendResponse']],
    ['5',['getQueryFromPackage','localQuery','sendResponse']],
    ['6',['getQueryFromPackage','localQuery','sendResponse']],
    ['7',['getQueryFromPackage','localQuery','sendResponse']],
    ['8',['getQueryFromPackage','localQuery','sendResponse']],
    ['9',['getQueryFromPackage','localQuery','sendResponse']],

    ['10',['getQueryFromPackage','localQuery','sendResponse']],
    ['11',['getQueryFromPackage','localQuery','sendResponse']],
    ['12',['getQueryFromPackage','localQuery','sendResponse']],
    
    ['13_1',['getQueryFromPackage','localQuery','sendResponse']],
    ['13_2',['getQueryFromPackage','localQuery','sendResponse']],
    ['13_3',['getQueryFromPackage','localQuery','sendResponse']],
    ['14_1',['getQueryFromPackage','localQuery','sendResponse']],
    ['14_2',['getQueryFromPackage','localQuery','sendResponse']],
    
    ['15',['getQueryFromPackage','localQuery','sendResponse']],
    ['16',['getQueryFromPackage','localQuery','sendResponse']],
    ['17',['getQueryFromPackage','localQuery','sendResponse']],
    ['18',['getQueryFromPackage','localQuery','sendResponse']],
    ['19',['getQueryFromPackage','localQuery','sendResponse']],

    //['20',['getQueryFromPackage','localQuery','sendResponse']],
    ['21',['getQueryFromPackage','localQuery','sendResponse']],
    ['22',['getQueryFromPackage','localQuery','sendResponse']],
    ['23',['getQueryFromPackage','localQuery','sendResponse']],
    ['24',['getQueryFromPackage','localQuery','sendResponse']],
    ['25',['getQueryFromPackage','localQuery','sendResponse']],
    ['26',['getQueryFromPackage','localQuery','sendResponse']],
    ['27',['getQueryFromPackage','localQuery','sendResponse']],
    ['28',['getQueryFromPackage','localQuery','sendResponse']],
    ['29',['getQueryFromPackage','localQuery','sendResponse']],

    ['30',['getQueryFromPackage','localQuery','sendResponse']],
    ['31',['getQueryFromPackage','localQuery','sendResponse']],
    ['32',['getQueryFromPackage','localQuery','sendResponse']],
    ['33',['getQueryFromPackage','localQuery','sendResponse']],
    ['34',['getQueryFromPackage','localQuery','sendResponse']],
    ['35',['getQueryFromPackage','localQuery','sendResponse']],
    ['36',['getQueryFromPackage','localQuery','sendResponse']],
    ['37',['getQueryFromPackage','localQuery','sendResponse']],

/*INSERT DISTRIBUIDO:   */
    ['38',['getQueryFromPackage','distributedInsert','sendResponse']],
/*                      */

    ['39',['getQueryFromPackage','localQuery','sendResponse']],

/*UPDATE DISTRIBUIDO    */
    ['40',['getQueryFromPackage','distributedUpdate','sendResponse']]
/*                      */
];

/*
    lock list per operation:
*/
const lockArray = [
    ['38',['area_conocimiento','identificador_sitio']],
    ['40',['area_conocimiento','identificador_sitio','administrador']]
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

    admin1:  function () {
        var map = new Map();
        map.set("idAdmin",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q1: function (package) {
                    var args = [
                        package.parsedReq.fields.idAdmin
                    ];
                    var query = 'call admin1(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin2:  function () {
        var map = new Map();
        map.set("idAdmin",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        map.set("Clave",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,0,10
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("Nombre",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_Name,0,65
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("idArea",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_Id,0,6
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("Nivel",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,0,1
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q2: function (package) {
                    var args = [
                        package.parsedReq.fields.idAdmin,
                        package.parsedReq.fields.Clave,
                        package.parsedReq.fields.Nombre,
                        package.parsedReq.fields.idArea,
                        package.parsedReq.fields.Nivel
                    ];
                    var query = 'call admin2(?,?,?,?,?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin3:  function () {
        var map = new Map();
        map.set("idAdmin",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q3: function (package) {
                    var args = [
                        package.parsedReq.fields.idAdmin
                    ];
                    var query = 'call admin3(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin4:  function () {
        var map = new Map();
        map.set("idAdmin",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q4: function (package) {
                    var args = [
                        package.parsedReq.fields.idAdmin
                    ];
                    var query = 'call admin4(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin5:  function () {
        var map = new Map();
        map.set("idAdmin",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        map.set("idArea",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_Id,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("Nombre",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_Name,1,65
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("Clave",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("Fecha",{
                func: InputParser.validateDate,
                arguments: null,
                errorCode: Errors.ERR_009 }
        );
        map.set("Estado",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Estado,
                errorCode: Errors.ERR_009 }
        );
        map.set("Nivel",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,1
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q5: function (package) {
                    var args = [
                        // fields:
                        package.parsedReq.fields.idAdmin,
                        package.parsedReq.fields.idArea,
                        package.parsedReq.fields.Nombre,
                        package.parsedReq.fields.Clave,
                        package.parsedReq.fields.Fecha,
                        package.parsedReq.fields.Estado,
                        package.parsedReq.fields.Nivel,
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
                    var query = 'call admin5(?,?,?,?,?,?,?,?,?,?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin6:  function () {
        var map = new Map();
        map.set("idAdmin",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        map.set("idPosgrado",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,8
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q6: function (package) {
                    var args = [
                        package.parsedReq.fields.idAdmin,
                        package.parsedReq.fields.idPosgrado
                    ];
                    var query = 'call admin6(?,?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin7:  function () {
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
                q7: function (package) {
                    var args = [
                        package.parsedReq.fields.idPosgrado
                    ];
                    var query = 'call admin7(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin8:  function () {
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
                q8: function (package) {
                    var args = [
                        package.parsedReq.fields.idPosgrado
                    ];
                    var query = 'call admin8(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin9:  function () {
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
                q9: function (package) {
                    var args = [
                        package.parsedReq.fields.idPosgrado
                    ];
                    var query = 'call admin9(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin10: function () {
        var map = new Map();
        map.set("idPosgrado",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,8
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("Nombre",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_Name,1,65
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q10: function (package) {
                    var args = [
                        package.parsedReq.fields.idPosgrado,
                        package.parsedReq.fields.Nombre,
                        // files:
                        /*
                        package.parsedReq.joinedParams[
                            package.parsedReq.joinedParams.length-3
                        ],
                        package.parsedReq.joinedParams[
                            package.parsedReq.joinedParams.length-2
                        ],
                        */
                        package.parsedReq.joinedParams[
                            package.parsedReq.joinedParams.length-1
                        ]
                    ];
                    var query = 'call admin10(?,?,?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin11: function () {
        var map = new Map();
        map.set("idArea",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_Id,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q11: function (package) {
                    var args = [
                        package.parsedReq.fields.idArea
                    ];
                    var query = 'call admin11(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin12: function () {
        var map = new Map();
        map.set("idProfesor",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q12: function (package) {
                    var args = [
                        package.parsedReq.fields.idProfesor
                    ];
                    var query = 'call admin12(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin13_1: function () {
        var map = new Map();
        map.set("idAdmin",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        map.set("idPosgrado",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,8
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("Nombre",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_Name,1,65
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("Clave",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("Estado",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Estado,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q13_1: function (package) {
                    var args = [
                        package.parsedReq.fields.idAdmin,
                        package.parsedReq.fields.idPosgrado,
                        package.parsedReq.fields.Nombre,
                        package.parsedReq.fields.Clave,
                        package.parsedReq.fields.Estado
                    ];
                    var query = 'call admin13_1(?,?,?,?,?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin13_2: function () {
        var map = new Map();
        map.set("idLinea",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,8
                ),
                errorCode: Errors.ERR_009 }
        );
        //
        var validator = [
            {
                func: InputParser.validateWithRegExp,
                args: InputParser.RegExp_CompoundId
            }
        ];
        map.set("ListadeProfesores",{
                func: InputParser.validateListOfObjects,
                arguments: validator,
                errorCode: Errors.ERR_009 }
        );
        //
        return map;
    },
                q13_2: function (package) {
                    var baseQuery = 'call admin13_2(?,?);';
                    //
                    var args = [];
                    var query = "";
                    // iterate list and expand args:
                    console.log("******");
                    console.log();
                    console.log("------");
                    package.parsedReq.fields.ListadeProfesores = JSON.parse(
                        package.parsedReq.fields.ListadeProfesores
                    );
                    for (var i=0;
                        i<package.parsedReq.fields.ListadeProfesores.length;
                        i++
                    ) {
                        args.push(package.parsedReq.fields.idLinea);
                        args.push(package.parsedReq.fields.ListadeProfesores[i].IdProfesor);
                        query += baseQuery;
                    }
                    // expand:
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin13_3: function () {
        var map = new Map();
        map.set("idLinea",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,8
                ),
                errorCode: Errors.ERR_009 }
        );
        //
        var validator = [
            {   // clave
                func: InputParser.validateWithRegExp,
                args: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,6
                )
            },
            {   // nombre
                func: InputParser.validateWithRegExp,
                args: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericIdWithSpace,1,35
                )
            },
            {   // estado
                func: InputParser.validateWithRegExp,
                args: InputParser.RegExp_Estado
            }
        ];
        map.set("ListadeTemas",{
                func: InputParser.validateListOfObjects,
                arguments: validator,
                errorCode: Errors.ERR_009 }
        );
        //
        return map;
    },
                q13_3: function (package) {
                    console.log("WENTERED GET QUERY:");
                    var baseQuery = 'call admin13_3(?,?,?,?);';
                    //
                    var args = [];
                    var query = "";
                    // iterate list and expand args:
                    
                    console.log("------");
                    console.log(package.parsedReq.fields);
                    console.log("++++++");
                    package.parsedReq.fields.ListadeTemas = JSON.parse(
                        package.parsedReq.fields.ListadeTemas
                    );
                    for (var i=0;
                        i<package.parsedReq.fields.ListadeTemas.length;
                        i++
                    ) {
                        args.push(package.parsedReq.fields.idLinea);
                        // nombre
                        args.push(package.parsedReq.fields.ListadeTemas[i].Nombre);
                        // clave
                        args.push(package.parsedReq.fields.ListadeTemas[i].Clave);
                        // estado
                        args.push(package.parsedReq.fields.ListadeTemas[i].Estado);
                        query += baseQuery;
                    }
                    // expand:
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin14_1: function () {
        var map = new Map();
        map.set("idLinea",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,8
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q14_1: function (package) {
                    var args = [
                        package.parsedReq.fields.idLinea
                    ];
                    var query = 'call admin14_1(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin14_2: function () {
        var map = new Map();
        map.set("idLinea",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,8
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q14_2: function (package) {
                    var args = [
                        package.parsedReq.fields.idLinea
                    ];
                    var query = 'call admin14_2(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin15: function () {
        var map = new Map();
        map.set("idLinea",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,8
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q15: function (package) {
                    var args = [
                        package.parsedReq.fields.idLinea
                    ];
                    var query = 'call admin15(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin16: function () {
        var map = new Map();
        map.set("idProfesor",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q16: function (package) {
                    var args = [
                        package.parsedReq.fields.idProfesor
                    ];
                    var query = 'call admin16(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin17: function () {
        var map = new Map();
        map.set("idLinea",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,8
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("idArea",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_Id,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q17: function (package) {
                    var args = [
                        package.parsedReq.fields.idLinea,
                        package.parsedReq.fields.idArea
                    ];
                    var query = 'call admin17(?,?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin18: function () {
        var map = new Map();
        map.set("idProfesor",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q18: function (package) {
                    var args = [
                        package.parsedReq.fields.idProfesor
                    ];
                    var query = 'call admin18(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin19: function () {
        var map = new Map();
        map.set("idLinea",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,8
                ),
                errorCode: Errors.ERR_009 }
        );
        //
        var validator = [
            {   // id
                func: InputParser.validateWithRegExp,
                args: InputParser.RegExp_CompoundId
            },
            {   // id
                func: InputParser.validateWithRegExp,
                args: InputParser.RegExp_Boolean
            }
        ];
        map.set("ListadeProfesores",{
                func: InputParser.validateListOfObjects,
                arguments: validator,
                errorCode: Errors.ERR_009 }
        );
        //
        /*
        map.set("SeAgrega",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Boolean,
                errorCode: Errors.ERR_009 }
        );
        */
        return map;
    },
                q19: function (package) {
                    var baseQuery = 'call admin19(?,?,?);';
                    //
                    var args = [];
                    var query = "";
                    // iterate list and expand args:
                    package.parsedReq.fields.ListadeProfesores = JSON.parse(
                        package.parsedReq.fields.ListadeProfesores
                    );
                    for (var i=0;
                        i<package.parsedReq.fields.ListadeProfesores.length;
                        i++
                    ) {
                        args.push(package.parsedReq.fields.idLinea);
                        // id
                        args.push(package.parsedReq.fields.ListadeProfesores[i].IdProfesor);
                        if (package.parsedReq.fields.ListadeProfesores[i].SeAgrega == 'true') {
                            args.push(true);
                        } else {
                            args.push(false);
                        }
                        query += baseQuery;
                    }
                    // expand:
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },

    admin20: function () {},

    admin21: function () {
        var map = new Map();
        map.set("idLinea",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,8
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("Nombre",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_Name,1,65
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("Clave",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("Estado",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Estado,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q21: function (package) {
                    var args = [
                        package.parsedReq.fields.idLinea,
                        package.parsedReq.fields.Nombre,
                        package.parsedReq.fields.Clave,
                        package.parsedReq.fields.Estado
                    ];
                    var query = 'call admin21(?,?,?,?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin22: function () {
        var map = new Map();
        map.set("idTema",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,8
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q22: function (package) {
                    var args = [
                        package.parsedReq.fields.idTema
                    ];
                    var query = 'call admin22(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin23: function () {
        var map = new Map();
        map.set("idTema",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,8
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q23: function (package) {
                    var args = [
                        package.parsedReq.fields.idTema
                    ];
                    var query = 'call admin23(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin24: function () {
        var map = new Map();
        map.set("idTema",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,8
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q24: function (package) {
                    var args = [
                        package.parsedReq.fields.idTema
                    ];
                    var query = 'call admin24(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin25: function () {
        var map = new Map();
        map.set("idTema",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,8
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("Nombre",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_Name,1,65
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("Clave",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q25: function (package) {
                    var args = [
                        package.parsedReq.fields.idTema,
                        package.parsedReq.fields.Nombre,
                        package.parsedReq.fields.Clave
                    ];
                    var query = 'call admin25(?,?,?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin26: function () {
        var map = new Map();
        map.set("idTema",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,8
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q26: function (package) {
                    var args = [
                        package.parsedReq.fields.idTema
                    ];
                    var query = 'call admin26(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin27: function () {
        var map = new Map();
        map.set("idProfesor",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q27: function (package) {
                    var args = [
                        package.parsedReq.fields.idProfesor
                    ];
                    var query = 'call admin27(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin28: function () {
        var map = new Map();
        map.set("idTema",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,8
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("idProfesor",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        map.set("Letra",{//Grupo
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Estado,
                errorCode: Errors.ERR_009 }
        );
        map.set("FechaInicio",{
                func: InputParser.validateDate,
                arguments: null,
                errorCode: Errors.ERR_009 }
        );
        map.set("FechaFin",{
                func: InputParser.validateDate,
                arguments: null,
                errorCode: Errors.ERR_009 }
        );
        map.set("Cupo",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_Id,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("Estado",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Estado,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q28: function (package) {
                    var args = [
                        package.parsedReq.fields.idTema,
                        package.parsedReq.fields.idProfesor,
                        package.parsedReq.fields.Letra,
                        package.parsedReq.fields.FechaInicio,
                        package.parsedReq.fields.FechaFin,
                        package.parsedReq.fields.Cupo,
                        package.parsedReq.fields.Estado
                    ];
                    var query = 'call admin28(?,?,?,?,?,?,?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin29: function () {
        var map = new Map();
        map.set("idAdmin",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        map.set("idTemaImpartido",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,8
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q29: function (package) {
                    var args = [
                        /*package.parsedReq.fields.idAdmin,*/
                        package.parsedReq.fields.idTemaImpartido
                    ];
                    var query = 'call admin29(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin30: function () {
        var map = new Map();
        map.set("idTemaImpartido",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,8
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q30: function (package) {
                    var args = [
                        package.parsedReq.fields.idTemaImpartido
                    ];
                    var query = 'call admin30(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin31: function () {
        var map = new Map();
        map.set("idTemaImpartido",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,8
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q31: function (package) {
                    var args = [
                        package.parsedReq.fields.idTemaImpartido
                    ];
                    var query = 'call admin31(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin32: function () {
        var map = new Map();
        map.set("idTemaImpartido",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,8
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("idProfesor",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        map.set("FechaInicio",{
                func: InputParser.validateDate,
                arguments: null,
                errorCode: Errors.ERR_009 }
        );
        map.set("FechaFin",{
                func: InputParser.validateDate,
                arguments: null,
                errorCode: Errors.ERR_009 }
        );
        map.set("Cupo",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_Id,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("Estado",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Estado,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q32: function (package) {
                    var args = [
                        package.parsedReq.fields.idTemaImpartido,
                        package.parsedReq.fields.idProfesor,
                        package.parsedReq.fields.FechaInicio,
                        package.parsedReq.fields.FechaFin,
                        package.parsedReq.fields.Cupo,
                        package.parsedReq.fields.Estado,
                    ];
                    var query = 'call admin32(?,?,?,?,?,?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin33: function () {
        var map = new Map();
        map.set("idAdmin",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        map.set("Nombres",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_Name,1,50
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("Apellidos",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_Name,1,50
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("Telefono",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Phone,
                errorCode: Errors.ERR_009 }
        );
        map.set("Correo",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Email,
                errorCode: Errors.ERR_009 }
        );
        map.set("Contrasena",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Password,
                errorCode: Errors.ERR_009 }
        );
        map.set("Estado",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Estado,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q33: function (package) {
                    var args = [
                        package.parsedReq.fields.idAdmin,
                        package.parsedReq.fields.Nombres,
                        package.parsedReq.fields.Apellidos,
                        package.parsedReq.fields.Telefono,
                        package.parsedReq.fields.Correo,
                        package.parsedReq.fields.Contrasena,
                        package.parsedReq.fields.Estado
                    ];
                    var query = 'call admin33(?,?,?,?,?,?,?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin34: function () {
        var map = new Map();
        map.set("idAdmin",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q34: function (package) {
                    var args = [
                        package.parsedReq.fields.idAdmin
                    ];
                    var query = 'call admin34(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin35: function () {
        var map = new Map();
        map.set("idAdmin",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        map.set("idRegistrador",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,10
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q35: function (package) {
                    var args = [
                        package.parsedReq.fields.idAdmin,
                        package.parsedReq.fields.idRegistrador
                    ];
                    var query = 'call admin35(?,?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin36: function () {
        var map = new Map();
        map.set("idRegistrador",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,10
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("Nombres",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_Name,1,50
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("Apellidos",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_Name,1,50
                ),
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
                q36: function (package) {
                    var args = [
                        package.parsedReq.fields.idRegistrador,
                        package.parsedReq.fields.Nombres,
                        package.parsedReq.fields.Apellidos,
                        package.parsedReq.fields.Telefono,
                        package.parsedReq.fields.Contrasena
                    ];
                    var query = 'call admin36(?,?,?,?,?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin37: function () {
        var map = new Map();
        map.set("idRegistrador",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,10
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q37: function (package) {
                    var args = [
                        package.parsedReq.fields.idRegistrador
                    ];
                    var query = 'call admin37(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin38: function () {
        var map = new Map();
        map.set("Nombre",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_Name,1,30
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q38: function (package) {
                    var args = [
                        package.parsedReq.fields.Nombre
                    ];
                    var query = 'call admin38(?);';
                    var backup = 'call backupadmin38(?);'; // 1
                    var rollback = 'call rollbackadmin38(?);'; // 1
                    query = mysql.format(query, args);
                    backup = mysql.format(backup, args);
                    //return { query: query, rollback: null, backup: null, args: [] };
                    return {
                        query: query,
                        backup: backup,
                        rollback: rollback,
                        args: []
                    };
                },
    admin39: function () {
        var map = new Map();
        map.set("idAdmin",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q39: function (package) {
                    var args = [
                        package.parsedReq.fields.idAdmin
                    ];
                    var query = 'call admin39(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    admin40: function () {
        var map = new Map();
        map.set("idAdmin",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        map.set("idAreaConocimiento",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_Id,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("NuevoNombre",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_Name,1,30
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q40: function (package) {                    
                    var args = [
                        package.parsedReq.fields.idAdmin,
                        package.parsedReq.fields.idAreaConocimiento,
                        package.parsedReq.fields.NuevoNombre
                    ];
                    var query = 'call admin40(?,?,?);';
                    var backup = 'call backupadmin38(?);'; // 1
                    var rollback = 'call rollbackadmin38(?,?);'; // 1
                    query = mysql.format(query, args);
                    backup = mysql.format(backup, [
                        package.parsedReq.fields.idAreaConocimiento
                    ]);
                    return {
                        query: query,
                        backup: backup,
                        rollback: rollback,
                        args: []
                    };
                },

    /*****************************************************************************
    ******************************************************************************
    ******************************************************************************
    ******************************************************************************
    *****************************************************************************/

};
