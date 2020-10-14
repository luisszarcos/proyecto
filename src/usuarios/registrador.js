const InputParser = require("./../inputParsing.js");
const SQL = require("./../sqlAccess.js");
const Errors = require("./../errors.js");
const mysql = require('mysql');

const UserIdentifier = 'registrador';

const operationsArray = [
    ['1' ,{fields:0,files:0}],['2' ,{fields:14,files:0}],['3' ,{fields:0,files:0}],
    ['4' ,{fields:3,files:0}],['5' ,{fields:1,files:0}],['6' ,{fields:1,files:0}],
    ['7' ,{fields:1,files:0}],['8' ,{fields:2,files:0}],['9' ,{fields:11,files:0}],

    ['10',{fields:1,files:0}],['11',{fields:1,files:0}],['12',{fields:2,files:0}],
    ['13',{fields:1,files:0}],['14_1',{fields:1,files:0}],['14_2',{fields:1,files:0}],
    ['14_3',{fields:1,files:0}],['15',{fields:5,files:0}],['16',{fields:1,files:0}],
    
    ['16_1',{fields:0,files:0}],
    ['16_2',{fields:1,files:0}],
    ['16_3',{fields:1,files:0}],

    ['17',{fields:16,files:0}],['18',{fields:1,files:0}],['19',{fields:4,files:0}],
    ['20',{fields:2,files:0}],['21',{fields:1,files:0}],['22_1',{fields:1,files:0}],
    ['22_2',{fields:0,files:0}],['23',{fields:15,files:0}]
];

const validMimeListPerOperation = [
    /*['7',InputParser.acceptedFileTypes], ['10',InputParser.acceptedFileTypes]*/
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

/*UPDATE DISTRIBUIDO    */
    ['6',['getQueryFromPackage','distributedUpdate','sendResponse']],
/*                      */

    ['7',['getQueryFromPackage','localQuery','sendResponse']],
    ['8',['getQueryFromPackage','localQuery','sendResponse']],

/*UPDATE DISTRIBUIDO    */
    ['9',['getQueryFromPackage','distributedUpdate','sendResponse']],
/*                      */

    ['10',['getQueryFromPackage','localQuery','sendResponse']],
    ['11',['getQueryFromPackage','localQuery','sendResponse']],
    ['12',['getQueryFromPackage','localQuery','sendResponse']],
    ['13',['getQueryFromPackage','localQuery','sendResponse']],
    ['14_1',['getQueryFromPackage','localQuery','sendResponse']],
    ['14_2',['getQueryFromPackage','localQuery','sendResponse']],
    ['14_3',['getQueryFromPackage','localQuery','sendResponse']],
    ['15',['getQueryFromPackage','localQuery','sendResponse']],
    ['16',['getQueryFromPackage','localQuery','sendResponse']],
    
    ['16_1',['getQueryFromPackage','localQuery','sendResponse']],
    ['16_2',['getQueryFromPackage','localQuery','sendResponse']],
    ['16_3',['getQueryFromPackage','localQuery','sendResponse']],
    
    ['17',['getQueryFromPackage','localQuery','sendResponse']],
    ['18',['getQueryFromPackage','localQuery','sendResponse']],
    ['19',['getQueryFromPackage','localQuery','sendResponse']],

    ['20',['getQueryFromPackage','localQuery','sendResponse']],
    ['21',['getQueryFromPackage','localQuery','sendResponse']],
    ['22_1',['getQueryFromPackage','localQuery','sendResponse']],
    ['22_2',['getQueryFromPackage','localQuery','sendResponse']],
    ['23',['getQueryFromPackage','localQuery','sendResponse']]
];

/*
    if we get requests for this operations, we return Errors.ERR_010
*/
const invalidOperations = [
    '20'
];

/*
    If we get requests for this operations, we must use a transacction.
    First argument is the Operation, the second is the expected number
    of lists.
*/
const transacctionOperations = [
    /*['1', 2],['16', 1]*/
];

const lockArray = [
    ['6',['alumno','identificador_sitio']],
    ['9',['alumno','identificador_sitio']]
];

module.exports = {

    UserIdentifier: UserIdentifier,
    operationMapping: new Map(operationsArray),
    mimeMapping: new Map(validMimeListPerOperation),
    callBack: new Map(callBackArray),
    lockMapping: new Map(lockArray),
    transacctionMapping: new Map(transacctionOperations),

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

                console.log("Parameters Received:");
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

    registrador1:  function () {
        var map = new Map();
        /*var validator = [
            {func: InputParser.validateWithRegExp, args:
                InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,6
                )
            },
            {func: InputParser.validateWithRegExp, args:
                InputParser.appendRangeToRegExp(
                    InputParser.RegExp_Name,1,50
                )
            }
        ];
        map.set("ListadeAreas",{
                func: InputParser.validateListOfArrays,
                arguments: validator,
                errorCode: Errors.ERR_009 }
        );*/
        return map;
    },
                q1: function (package) {
                    var baseQuery = 'call registrador1();';
                    var query = baseQuery;
                    //
                    /*
                    var args = [];
                    var query = "";
                    // iterate list and expand args:
                    for (var i=0;
                        i<package.parsedReq.fields.ListadeAreas;
                        i++
                    ) {
                        args.push(package.parsedReq.fields.ListadeAreas[i][0]);
                        args.push(package.parsedReq.fields.ListadeAreas[i][1]);
                        query += baseQuery;
                    }
                    
                    // expand:
                    query = mysql.format(query, args);
                    */
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    registrador2:  function () {
        var map = new Map();
        map.set("idReg",{
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
                    InputParser.RegExp_Name,1,20
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("Correo",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Email,
                errorCode: Errors.ERR_009 }
        );
        map.set("FechaNac",{
                func: InputParser.validateDate,
                arguments: null,
                errorCode: Errors.ERR_009 }
        );
        map.set("Genero",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Gender,
                errorCode: Errors.ERR_009 }
        );
        map.set("Direccion",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Address,
                errorCode: Errors.ERR_009 }
        );
        map.set("EntidadFederativa",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_State,
                errorCode: Errors.ERR_009 }
        );
        map.set("Ciudad",{
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
        map.set("idArea",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("Contrasena",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Password,
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
        return map;
    },
                q2: function (package) {
                    var args = [
                        package.parsedReq.fields.idReg,
                        package.parsedReq.fields.Nombres,
                        package.parsedReq.fields.Apellidos,
                        package.parsedReq.fields.Correo,
                        package.parsedReq.fields.FechaNac,
                        package.parsedReq.fields.Genero,
                        package.parsedReq.fields.Direccion,
                        package.parsedReq.fields.EntidadFederativa,
                        package.parsedReq.fields.Ciudad,
                        package.parsedReq.fields.Telefono,
                        package.parsedReq.fields.idArea,
                        package.parsedReq.fields.Contrasena,
                        package.parsedReq.fields.Fecha,
                        package.parsedReq.fields.Estado
                    ];
                    var query = 'call registrador2(?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    registrador3:  function () {
        var map = new Map();
        return map;
    },
                q3: function (package) {
                    var args = [];
                    var query = 'call registrador3();';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    registrador4:  function () {
        var map = new Map();
        map.set("Clave",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("Nombre",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_Name,1,50
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("Area",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q4: function (package) {
                    var args = [
                        package.parsedReq.fields.Clave,
                        package.parsedReq.fields.Nombre,
                        package.parsedReq.fields.Area
                    ];
                    var query = 'call registrador4(?,?,?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    registrador5:  function () {
        var map = new Map();
        map.set("idAlumno",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q5: function (package) {
                    var args = [
                        package.parsedReq.fields.idAlumno
                    ];
                    var query = 'call registrador5(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    ////////////
    registrador6:  function () {
        var map = new Map();
        map.set("idAlumno",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q6: function (package) {
                    var args = [
                        package.parsedReq.fields.idAlumno
                    ];
                    var query = 'call registrador6(?);';
                    var backup = 'call backupregistrador6(?);';
                    var rollback = 'call rollbackregistrador6(?,?);';
                    query = mysql.format(query, args);
                    backup = mysql.format(backup, args);
                    return {
                        query: query,
                        backup: backup,
                        rollback: rollback,
                    };
                },
    registrador7:  function () {
        var map = new Map();
        map.set("idAlumno",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q7: function (package) {
                    var args = [
                        package.parsedReq.fields.idAlumno
                    ];
                    var query = 'call registrador7(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    registrador8:  function () {
        var map = new Map();
        map.set("idAlumno",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        map.set("Estado",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Estado,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q8: function (package) {
                    var args = [
                        package.parsedReq.fields.idAlumno,
                        package.parsedReq.fields.Estado
                    ];
                    var query = 'call registrador8(?,?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    ////////////
    registrador9:  function () {
        var map = new Map();
        map.set("idAlumno",{
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
                    InputParser.RegExp_Name,1,20
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("Correo",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Email,
                errorCode: Errors.ERR_009 }
        );
        map.set("FechaNac",{
                func: InputParser.validateDate,
                arguments: null,
                errorCode: Errors.ERR_009 }
        );
        map.set("Genero",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Gender,
                errorCode: Errors.ERR_009 }
        );
        map.set("Direccion",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Address,
                errorCode: Errors.ERR_009 }
        );
        map.set("EntidadFederativa",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_State,
                errorCode: Errors.ERR_009 }
        );
        map.set("Ciudad",{
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
        map.set("idArea",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,0,6
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q9: function (package) {
                    var args = [
                        package.parsedReq.fields.idAlumno,
                        package.parsedReq.fields.Nombres,
                        package.parsedReq.fields.Apellidos,
                        package.parsedReq.fields.Correo,
                        package.parsedReq.fields.FechaNac,
                        package.parsedReq.fields.Genero,
                        package.parsedReq.fields.Direccion,
                        package.parsedReq.fields.EntidadFederativa,
                        package.parsedReq.fields.Ciudad,
                        package.parsedReq.fields.Telefono,
                        package.parsedReq.fields.idArea,
                    ];
                    var query = 'call registrador9(?,?,?,?,?,?,?,?,?,?,?);';
                    var backup = 'call backupregistrador9(?);';
                    var rollback = 'call rollbackregistrador9(?,?,?,?,?,?,?,?,?,?,?);';
                    query = mysql.format(query, args);
                    backup = mysql.format(backup, [
                        package.parsedReq.fields.idAlumno
                    ]);
                    return {
                        query: query,
                        backup: backup,
                        rollback: rollback,
                    };
                },
    registrador10: function () {
        var map = new Map();
        map.set("idRegistrador",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q10: function (package) {
                    var args = [
                        package.parsedReq.fields.idRegistrador
                    ];
                    var query = 'call registrador10(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    registrador11: function () {
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
                q11: function (package) {
                    var args = [
                        package.parsedReq.fields.idSolicitud
                    ];
                    var query = 'call registrador11(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    registrador12: function () {
        var map = new Map();
        map.set("idSolicitud",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_Id,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("Respuesta",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_SingleChar,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q12: function (package) {
                    var args = [
                        package.parsedReq.fields.idSolicitud,
                        package.parsedReq.fields.Respuesta
                    ];
                    var query = 'call registrador12(?,?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    registrador13: function () {
        var map = new Map();
        map.set("idReg",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q13: function (package) {
                    var args = [
                        package.parsedReq.fields.idReg
                    ];
                    var query = 'call registrador13(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    registrador14_1: function () {
        var map = new Map();
        map.set("idSolicitud",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q14_1: function (package) {
                    var args = [
                        package.parsedReq.fields.idSolicitud
                    ];
                    var query = 'call registrador14_1(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    registrador14_2: function () {
        var map = new Map();
        map.set("idSolicitud",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q14_2: function (package) {
                    var args = [
                        package.parsedReq.fields.idSolicitud
                    ];
                    var query = 'call registrador14_2(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    registrador14_3: function () {
        var map = new Map();
        map.set("idSolicitud",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q14_3: function (package) {
                    var args = [
                        package.parsedReq.fields.idSolicitud
                    ];
                    var query = 'call registrador14_3(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    registrador15: function () {
        var map = new Map();
        map.set("idSolicitud",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("idTemaImpartido",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("idProfesorTutor",{
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
        return map;
    },
                q15: function (package) {
                    var args = [
                        package.parsedReq.fields.idSolicitud,
                        package.parsedReq.fields.idTemaImpartido,
                        package.parsedReq.fields.idProfesorTutor,
                        package.parsedReq.fields.FechaInicio,
                        package.parsedReq.fields.FechaFin
                    ];
                    var query = 'call registrador15(?,?,?,?,?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    registrador16: function () {
        var map = new Map();
        map.set("idReg",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q16: function (package) {
                    var args = [
                        package.parsedReq.fields.idReg
                    ];
                    var query = 'call registrador16(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    registrador16_1: function () {
        var map = new Map();
        return map;
    },
                q16_1: function (package) {
                    var args = [ ];
                    var query = 'call registrador16_1();';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    registrador16_2: function () {
        var map = new Map();
        map.set("idUniversidad",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,10
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q16_2: function (package) {
                    var args = [
                        package.parsedReq.fields.idUniversidad
                    ];
                    var query = 'call registrador16_2(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    registrador16_3: function () {
        var map = new Map();
        map.set("idPosgrado",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,10
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q16_3: function (package) {
                    var args = [
                        package.parsedReq.fields.idPosgrado
                    ];
                    var query = 'call registrador16_3(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    registrador17: function () {
        var map = new Map();
        map.set("idReg",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        map.set("Nombre",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_Name,1,50
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("Apellidos",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_Name,1,20
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("Correo",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Email,
                errorCode: Errors.ERR_009 }
        );
        map.set("FechaNac",{
                func: InputParser.validateDate,
                arguments: null,
                errorCode: Errors.ERR_009 }
        );
        map.set("Genero",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Gender,
                errorCode: Errors.ERR_009 }
        );
        map.set("Direccion",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Address,
                errorCode: Errors.ERR_009 }
        );
        map.set("EntidadFederativa",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_State,
                errorCode: Errors.ERR_009 }
        );
        map.set("Ciudad",{
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
        map.set("CP",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_PC,
                errorCode: Errors.ERR_009 }
        );
        map.set("Contrasena",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Password,
                errorCode: Errors.ERR_009 }
        );
        map.set("FechaRegistro",{
                func: InputParser.validateDate,
                arguments: null,
                errorCode: Errors.ERR_009 }
        );
        map.set("Estado",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Estado,
                errorCode: Errors.ERR_009 }
        );
        map.set("idArea",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_Id,1,6
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("idPosgrado",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,10
                ),
                errorCode: Errors.ERR_009 }
        );
        /*
        map.set("idLinea",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,8
                ),
                errorCode: Errors.ERR_009 }
        );
        */
        return map;
    },
                q17: function (package) {
                    var args = [
                        package.parsedReq.fields.idReg,
                        package.parsedReq.fields.Nombre,
                        package.parsedReq.fields.Apellidos,
                        package.parsedReq.fields.Correo,
                        package.parsedReq.fields.FechaNac,
                        package.parsedReq.fields.Genero,
                        package.parsedReq.fields.Direccion,
                        package.parsedReq.fields.EntidadFederativa,
                        package.parsedReq.fields.Ciudad,
                        package.parsedReq.fields.Telefono,
                        package.parsedReq.fields.CP,
                        package.parsedReq.fields.Contrasena,
                        package.parsedReq.fields.FechaRegistro,
                        package.parsedReq.fields.Estado,
                        package.parsedReq.fields.idArea,
                        package.parsedReq.fields.idPosgrado,
                        null //package.parsedReq.fields.idLinea
                    ];
                    var query = 'call registrador17(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    registrador18: function () {
        var map = new Map();
        map.set("idReg",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q18: function (package) {
                    var args = [
                        /*package.parsedReq.fields.idReg*/
                    ];
                    var query = 'call registrador18();';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    registrador19: function () {
        var map = new Map();
        map.set("Clave",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        map.set("Nombre",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_Name,1,25
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
        map.set("idPosgrado",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_GenericId,1,8
                ),
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q19: function (package) {
                    var args = [
                        package.parsedReq.fields.Clave,
                        package.parsedReq.fields.Nombre,
                        package.parsedReq.fields.idArea,
                        package.parsedReq.fields.idPosgrado
                    ];
                    var query = 'call registrador19(?,?,?,?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },


    registrador20: function () {
        var map = new Map();
        map.set("idReg",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        map.set("idProfesor",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q20: function (package) {
                    var args = [
                        /*package.parsedReq.fields.idReg,*/
                        package.parsedReq.fields.idProfesor
                    ];
                    var query = 'call registrador20(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    registrador21: function () {
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
                    var query = 'call registrador21(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    registrador22_1: function () {
        var map = new Map();
        map.set("idProfesor",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
                q22_1: function (package) {
                    var args = [
                        package.parsedReq.fields.idProfesor
                    ];
                    var query = 'call registrador22_1(?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },
    registrador22_2: function () {
        var map = new Map();
        return map;
    },
                q22_2: function (package) {
                    var args = [];
                    var query = 'call registrador22_2();';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },

    registrador23: function () {
        var map = new Map();
        map.set("idProfesor",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        map.set("Nombre",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_Name,1,50
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("Apellidos",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_Name,1,20
                ),
                errorCode: Errors.ERR_009 }
        );
        map.set("Correo",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Email,
                errorCode: Errors.ERR_009 }
        );
        map.set("FechaNac",{
                func: InputParser.validateDate,
                arguments: null,
                errorCode: Errors.ERR_009 }
        );
        map.set("Genero",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Gender,
                errorCode: Errors.ERR_009 }
        );
        map.set("Direccion",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Address,
                errorCode: Errors.ERR_009 }
        );
        map.set("EntidadFederativa",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_State,
                errorCode: Errors.ERR_009 }
        );
        map.set("Ciudad",{
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
        map.set("CP",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_PC,
                errorCode: Errors.ERR_009 }
        );
        map.set("Contrasena",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Password,
                errorCode: Errors.ERR_009 }
        );
        map.set("idArea",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.appendRangeToRegExp(
                    InputParser.RegExp_Id,1,6
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
        return map;
    },
                q23: function (package) {
                    var args = [
                        package.parsedReq.fields.idProfesor,
                        package.parsedReq.fields.Nombre,
                        package.parsedReq.fields.Apellidos,
                        package.parsedReq.fields.Correo,
                        package.parsedReq.fields.FechaNac,
                        package.parsedReq.fields.Genero,
                        package.parsedReq.fields.Direccion,
                        package.parsedReq.fields.EntidadFederativa,
                        package.parsedReq.fields.Ciudad,
                        package.parsedReq.fields.Telefono,
                        package.parsedReq.fields.CP,
                        package.parsedReq.fields.Contrasena,
                        package.parsedReq.fields.idArea,
                        package.parsedReq.fields.idPosgrado,
                        package.parsedReq.fields.idLinea
                    ];
                    var query = 'call registrador23(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
                    query = mysql.format(query, args);
                    return { query: query, rollback: null, backup: null, args: [] };
                },

    /*****************************************************************************
    ******************************************************************************
    ******************************************************************************
    ******************************************************************************
    *****************************************************************************/

};
