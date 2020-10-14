const InputParser = require("./../inputParsing.js");
const SQL = require("./../sqlAccess.js");
const Errors = require("./../errors.js");
const mysql = require('mysql');

const UserIdentifier = 'profesor';

const operationsArray = [
    ['1_1' ,{fields:1,files:0}],['1_2' ,{fields:1,files:0}],['2' ,{fields:1,files:0}],
    ['3' ,{fields:1,files:0}],['4' ,{fields:3,files:0}],['5_1' ,{fields:1,files:0}],
    ['5_2' ,{fields:1,files:0}],['5_3' ,{fields:1,files:0}],['5_4' ,{fields:1,files:0}],

    ['6' ,{fields:1,files:0}],['7' ,{fields:1,files:0}],['8_1' ,{fields:1,files:0}],
    ['8_2' ,{fields:1,files:0}],['9' ,{fields:2,files:0}],['10',{fields:2,files:0}],
    ['11',{fields:5,files:0}],['12',{fields:9,files:0}],['13',{fields:4,files:1}],

    ['14',{fields:1,files:0}],['15',{fields:2,files:0}],['16',{fields:1,files:0}],
    ['17',{fields:2,files:0}],['18',{fields:4,files:0}],['19',{fields:1,files:0}],
    ['20',{fields:4,files:0}],['21',{fields:1,files:0}],['22',{fields:2,files:0}],
];

const validMimeListPerOperation = [
    ['4',InputParser.imageFileTypes], ['13',InputParser.acceptedFileTypes]
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
    ['2',['getQueryFromPackage','localQuery','sendResponse']],
    ['3',['getQueryFromPackage','localQuery','sendResponse']],
    ['4',['getQueryFromPackage','localQuery','sendResponse']],
    ['5_1',['getQueryFromPackage','localQuery','sendResponse']],
    ['5_2',['getQueryFromPackage','localQuery','sendResponse']],
    ['5_3',['getQueryFromPackage','localQuery','sendResponse']],
    ['5_4',['getQueryFromPackage','localQuery','sendResponse']],
    ['6',['getQueryFromPackage','localQuery','sendResponse']],
    ['7',['getQueryFromPackage','localQuery','sendResponse']],
    ['8_1',['getQueryFromPackage','localQuery','sendResponse']],
    ['8_2',['getQueryFromPackage','localQuery','sendResponse']],
    ['9',['getQueryFromPackage','localQuery','sendResponse']],

    ['10',['getQueryFromPackage','localQuery','sendResponse']],
    ['11',['getQueryFromPackage','localQuery','sendResponse']],
    ['12',['getQueryFromPackage','localQuery','sendResponse']],
    ['13',['getQueryFromPackage','localQuery','sendResponse']],
    ['14',['getQueryFromPackage','localQuery','sendResponse']],
    ['15',['getQueryFromPackage','localQuery','sendResponse']],
    ['16',['getQueryFromPackage','localQuery','sendResponse']],
    ['17',['getQueryFromPackage','localQuery','sendResponse']],
    ['18',['getQueryFromPackage','localQuery','sendResponse']],
    ['19',['getQueryFromPackage','localQuery','sendResponse']],

    ['20',['getQueryFromPackage','localQuery','sendResponse']],
    ['21',['getQueryFromPackage','localQuery','sendResponse']],
    ['22',['getQueryFromPackage','localQuery','sendResponse']]
];


const lockArray = [
    /*['6',['alumno','profesor','registrador','administrador']],
    ['9',['alumno','profesor','registrador','administrador']]*/
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

    profesor1_1:  function () {
        var map = new Map();
        map.set("idProfesor",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q1_1: function (package) {
                    var args = [
                        package.parsedReq.fields.idProfesor
                    ];
                    var query = 'call profesor1_1(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    profesor1_2:  function () {
        var map = new Map();
        map.set("idProfesor",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q1_2: function (package) {
                    var args = [
                        package.parsedReq.fields.idProfesor
                    ];
                    var query = 'call profesor1_2(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    profesor2:  function () {
        var map = new Map();
        map.set("idProfesor",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q2: function (package) {
                    var args = [
                        package.parsedReq.fields.idProfesor
                    ];
                    var query = 'call profesor2(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    profesor3:  function () {
        var map = new Map();
        map.set("idProfesor",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q3: function (package) {
                    var args = [
                        package.parsedReq.fields.idProfesor
                    ];
                    var query = 'call profesor3(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    profesor4:  function () {
        var map = new Map();
        map.set("idProfesor",{
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
                        package.parsedReq.fields.idProfesor,
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
                        ]*/
                        null, null, null
                    ];
                    var query = 'call profesor4(?,?,?,?,?,?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    profesor5_1:  function () {
        var map = new Map();
        map.set("idCurso",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,8
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q5_1: function (package) {
                    var args = [
                        package.parsedReq.fields.idCurso
                    ];
                    var query = 'call profesor5_1(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    profesor5_2:  function () {
        var map = new Map();
        map.set("idCurso",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,8
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q5_2: function (package) {
                    var args = [
                        package.parsedReq.fields.idCurso
                    ];
                    var query = 'call profesor5_2(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    profesor5_3:  function () {
        var map = new Map();
        map.set("idCurso",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,8
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q5_3: function (package) {
                    var args = [
                        package.parsedReq.fields.idCurso
                    ];
                    var query = 'call profesor5_3(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    profesor5_4:  function () {
        var map = new Map();
        map.set("idCurso",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,8
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q5_4: function (package) {
                    var args = [
                        package.parsedReq.fields.idCurso
                    ];
                    var query = 'call profesor5_4(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    profesor6:  function () {
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
                q6: function (package) {
                    var args = [
                        package.parsedReq.fields.idRecurso
                    ];
                    var query = 'call profesor6(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    profesor7:  function () {
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
                q7: function (package) {
                    var args = [
                        package.parsedReq.fields.idRecurso
                    ];
                    var query = 'call profesor7(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    profesor8_1:  function () {
        var map = new Map();
        map.set("idActividad",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q8_1: function (package) {
                    var args = [
                        package.parsedReq.fields.idActividad
                    ];
                    var query = 'call profesor8_1(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },

    profesor8_2:  function () {
        var map = new Map();
        map.set("idActividad",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q8_2: function (package) {
                    var args = [
                        package.parsedReq.fields.idActividad
                    ];
                    var query = 'call profesor8_2(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    profesor9:  function () {
        var map = new Map();
        map.set("idActividad",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("idAlumno",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q9: function (package) {
                    var args = [
                        package.parsedReq.fields.idActividad,
                        package.parsedReq.fields.idAlumno
                    ];
                    var query = 'call profesor9(?,?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    profesor10: function () {
        var map = new Map();
        map.set("idActividad",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("idAlumno",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q10: function (package) {
                    var args = [
                        package.parsedReq.fields.idAlumno,
                        package.parsedReq.fields.idActividad
                    ];
                    var query = 'call profesor10(?,?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    profesor11: function () {
        var map = new Map();
        map.set("idActividad",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,10
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("idAlumno",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        map.set("FechaCalificada",{
                func: InputParser.validateDate,
                arguments: null,
                errorCode: Errors.ERR_009 }
        );
        map.set("Calificacion",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_Id,1,10
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("Comentarios",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Text,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q11: function (package) {
                    var args = [
                        package.parsedReq.fields.idAlumno,
                        package.parsedReq.fields.idActividad,
                        package.parsedReq.fields.FechaCalificada,
                        package.parsedReq.fields.Calificacion,
                        package.parsedReq.fields.Comentarios
                    ];
                    var query = 'call profesor11(?,?,?,?,?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    profesor12: function () {
        var map = new Map();
        map.set("idCurso",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,10
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("Nombre",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Text,
                errorCode: Errors.ERR_009 }
        );
        map.set("Actividad",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Text,
                errorCode: Errors.ERR_009 }
        );
        map.set("FechaAsignacion",{
                func: InputParser.validateDate,
                arguments: null,
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
        map.set("Tipo",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_SingleChar,
                errorCode: Errors.ERR_009 }
        );
        map.set("HoraFin",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Text,
                errorCode: Errors.ERR_009 }
        );
        map.set("HoraInicio",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Text,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q12: function (package) {
                    var args = [
                        package.parsedReq.fields.idCurso,
                        package.parsedReq.fields.Nombre,
                        package.parsedReq.fields.Actividad,
                        package.parsedReq.fields.FechaAsignacion,
                        package.parsedReq.fields.FechaInicio + ' ' + package.parsedReq.fields.HoraInicio,
                        package.parsedReq.fields.FechaFin + ' ' + package.parsedReq.fields.HoraFin,
                        package.parsedReq.fields.Tipo
                    ];
                    var query = 'call profesor12(?,?,?,?,?,?,?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    profesor13: function () {
        var map = new Map();
        map.set("idCurso",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,8
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("Descripcion",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Text,
                errorCode: Errors.ERR_009 }
        );
        map.set("Fecha",{
                func: InputParser.validateDate,
                arguments: null,
                errorCode: Errors.ERR_009 }
        );
        map.set("NombreRecurso",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Text,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q13: function (package) {
                    var args = [
                        package.parsedReq.fields.idCurso,
                        package.parsedReq.fields.Fecha,
                        package.parsedReq.fields.Descripcion,
                        package.parsedReq.fields.NombreRecurso,
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
                    var query = 'call profesor13(?,?,?,?,?,?,?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    profesor14: function () {
        var map = new Map();
        map.set("idCurso",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,8
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q14: function (package) {
                    var args = [
                        package.parsedReq.fields.idCurso
                    ];
                    var query = 'call profesor14(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    profesor15: function () {
        var map = new Map();
        map.set("idCurso",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,8
                ),
                errorCode: Errors.ERR_009 }
        );
        var validator = [
            {func: InputParser.validateWithRegExp, args:
                InputParser.RegExp_CompoundId
            },
            {func: InputParser.validateWithRegExp, args:
                InputParser.appendRangeToRegExp(
                    InputParser.RegExp_Id,1,4
                )
            },
            {func: InputParser.validateWithRegExp, args:
                InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,10
                )
            }
        ];
        map.set("ListadeAlumnosInscritosalcurso",{
                func: InputParser.validateListOfObjects/*validateListOfArrays*/,
                arguments: validator,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q15: function (package) {
                    var baseQuery = 'call profesor15(?,?,?,?);';
                    //
                    var args = [];
                    var query = "";
                    console.log("UNPARSED:")
                    console.log(package.parsedReq.fields.ListadeAlumnosInscritosalcurso);
                    package.parsedReq.fields.ListadeAlumnosInscritosalcurso = JSON.parse(
                        package.parsedReq.fields.ListadeAlumnosInscritosalcurso
                    );
                    console.log("PARSED:");
                    console.log(package.parsedReq.fields.ListadeAlumnosInscritosalcurso);
                    // iterate list and expand args:
                    for (var i=0;
                        i<package.parsedReq.fields.ListadeAlumnosInscritosalcurso.length;
                        i++
                    ) {
                        args.push(package.parsedReq.fields.idCurso);
                        args.push(package.parsedReq.fields.ListadeAlumnosInscritosalcurso[i].Id);
                        args.push(package.parsedReq.fields.ListadeAlumnosInscritosalcurso[i].Calificacion);
                        args.push(package.parsedReq.fields.ListadeAlumnosInscritosalcurso[i].Estado);
                        query += baseQuery;
                    }
                    // expand:
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    profesor16: function () {
        var map = new Map();
        map.set("idCurso",{
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
                        package.parsedReq.fields.idCurso
                    ];
                    var query = 'call profesor16(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    profesor17: function () {
        var map = new Map();
        map.set("idProfesor",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        map.set("idCurso",{
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
                        package.parsedReq.fields.idProfesor,
                        package.parsedReq.fields.idCurso
                    ];
                    var query = 'call profesor17(?,?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    profesor18: function () {
        var map = new Map();
        map.set("idProfesor",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        map.set("idCurso",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,10
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("Publicacion",{
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
                q18: function (package) {
                    var args = [
                        package.parsedReq.fields.idProfesor,
                        package.parsedReq.fields.idCurso,
                        package.parsedReq.fields.Publicacion,
                        package.parsedReq.fields.Fecha
                    ];
                    var query = 'call profesor18(?,?,?,?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    profesor19: function () {
        var map = new Map();
        /*map.set("idProfesor",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );*/
        map.set("idPublicacion",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_Id,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q19: function (package) {
                    var args = [
                        /*package.parsedReq.fields.idProfesor,*/
                        package.parsedReq.fields.idPublicacion
                    ];
                    var query = 'call profesor19(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },


    profesor20: function () {
        var map = new Map();
        map.set("idProfesor",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        map.set("idPublicacion",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_Id,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("Respuesta",{
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
                q20: function (package) {
                    var args = [
                        package.parsedReq.fields.idProfesor,
                        package.parsedReq.fields.idPublicacion,
                        package.parsedReq.fields.Respuesta,
                        package.parsedReq.fields.Fecha
                    ];
                    var query = 'call profesor20(?,?,?,?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    profesor21: function () {
        var map = new Map();
        map.set("idProfesor",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q21: function (package) {
                    var args = [
                        package.parsedReq.fields.idProfesor
                    ];
                    var query = 'call profesor21(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    profesor22: function () {
        var map = new Map();
        map.set("idProfesor",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        map.set("idAlumno",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q22: function (package) {
                    var args = [
                        package.parsedReq.fields.idProfesor,
                        package.parsedReq.fields.idAlumno
                    ];
                    var query = 'call profesor22(?,?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },

    /*****************************************************************************
    ******************************************************************************
    ******************************************************************************
    ******************************************************************************
    *****************************************************************************/

};
