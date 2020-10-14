const InputParser = require("./../inputParsing.js");
const SQL = require("./../sqlAccess.js");
const Errors = require("./../errors.js");
const mysql = require('mysql');

const UserIdentifier = 'login';


const operationsArray = [
    ['1' ,{fields:3,files:0}],['2' ,{fields:2,files:0}]
];

const validMimeListPerOperation = [
    ['1',InputParser.acceptedFileTypes], ['2',InputParser.acceptedFileTypes]
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
*/
const callBackArray = [
    ['1',[
        'getQueryFromPackage',
        'localQuery',
        'saveFingerPrint',
        'sendResponse'
    ]],
    ['2',[
        'getQueryFromPackage',
        'localQuery',
        'sendRecoveryEmail',
        'sendResponse'
    ]],
    ['3',[
        'getQueryFromPackage',
        'localQuery',
        'saveFingerPrint',
        'sendResponse'
    ]]
];

/*
    if we get requests for this operations, we return Errors.ERR_010
*/
const invalidOperations = [
    '7','23','36','37','41','43','44','47'
];

/*
    if we get requests for this operations, we must use a transacction:
*/
const transacctionOperations = [
    ['9', 2],['16', 1]
];

const insertOperations = [
    ['1', true], ['2', true]
];

/*
    lock list per operation:
*/
const lockArray = [
    ['1',['alumno','profesor','registrador','administrador']],
    ['2',['alumno','profesor','registrador','administrador']]
];


module.exports = {

    UserIdentifier: UserIdentifier,
    operationMapping: new Map(operationsArray),
    mimeMapping: new Map(validMimeListPerOperation),
    callBack: new Map(callBackArray),
    transacctionMapping: new Map(transacctionOperations),
    lockMapping: new Map(lockArray),
    insertMapping: new Map(insertOperations),

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
            // special case: for insertion we need to pass clavei:
            if ( this.insertMapping.get(operation) ) {
                returnValue += "?,";
            }
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
                SitioDestino = value.fields.origen;

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

    login1:  function () {
        var map = new Map();
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
        map.set("TipoUsuario",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_UserType,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
    login2:  function () {
        var map = new Map();
        map.set("Correo",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_Email,
                errorCode: Errors.ERR_009 }
        );
        map.set("TipoUsuario",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_UserType,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },
    login3:  function () {
        var map = new Map();
        map.set("IdUsuario",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_CompoundId,
                errorCode: Errors.ERR_009 }
        );
        map.set("TipoUsuario",{
                func: InputParser.validateWithRegExp,
                arguments: InputParser.RegExp_UserType,
                errorCode: Errors.ERR_009 }
        );
        return map;
    },

/*****************************************************************************
******************************************************************************
******************************************************************************
******************************************************************************
*****************************************************************************/

    q1: function (package) {
        var args = [
            package.parsedReq.fields.Correo,
            package.parsedReq.fields.Contrasena,
            package.parsedReq.fields.TipoUsuario
        ];
        var query = 'call login1(?,?,?);';
        query = mysql.format(query, args);
        return { query: query, rollback: null, backup: null, args: [] };
    },
    q2: function (package) {
        var args = [
            package.parsedReq.fields.Correo,
            package.parsedReq.fields.TipoUsuario
        ];
        var query = 'call login2(?,?);';
        query = mysql.format(query, args);
        return { query: query, rollback: null, backup: null, args: [] };
    },
    q3: function (package) {
        var args = [
            package.parsedReq.fields.IdUsuario,
            package.parsedReq.fields.TipoUsuario
        ];
        var query = 'call login3(?,?);';
        query = mysql.format(query, args);
        return { query: query, rollback: null, backup: null, args: [] };
    },

};
