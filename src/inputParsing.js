const formidable = require('formidable');
const Errors = require("./errors.js");
const FileType = require('file-type');
const fs = require('fs');

const maxFieldsPerRequest = 100;

const mimeList = [
    'doc','docx','pdf','xlsx','xls',
    'pptx','ppt','png','jpg','mp4','mp3',
    'zip','rar'
];

const imageMimeList = [
    'png','jpg'
];


module.exports = {

    RegExp_Site: "^[a-zA-Z0-9]{1,20}$",
    RegExp_GenericFileName: "[a-zA-Z0-9 ._-]{1,35}",
    RegExp_GenericId: "^[a-zA-Z0-9]",
    RegExp_GenericIdWithSpace: "^[a-zA-Z0-9 ]",
    RegExp_Operation:  "^[0-9]+(_[0-9]+)?$",
    RegExp_Id:  "^[0-9]",
    RegExp_Strikes: "^[0-4]$",
    RegExp_PC: "^[0-9]{1,8}$",
    RegExp_SingleChar: "^[a-zA-Z]$",
    //RegExp_CompoundId:  "^[A-Z]{2}[0-9]{1,8}$",
    RegExp_CompoundId:  "^[0-9]{1,6}[A-Z]{2}[0-9]{1,6}$",
    RegExp_Name: "^[a-zA-Z ]", //"^[a-zA-Z ]{1,10}$"
    RegExp_Phone: "^[0-9 -]{6,15}$", //"^[0-9 -]{6,15}$"
    RegExp_Address: "^[a-zA-Z0-9 #,.\\n\\t]{1,200}$",
    RegExp_Gender: "^[H|M]{1}$",
    RegExp_Boolean: "^(true|false)$",
    RegExp_Estado: "^[A|I]$",
    RegExp_EstadoAlumno: "^[R|A]$",
    RegExp_Strike: "^[0-4]$",
    RegExp_Password: '^[a-zA-Z0-9 !?¿!¡#&%(){}´+,.;:<>-]{8,25}$',
    RegExp_Text: '^[a-zA-Z0-9 \\n\\t!?¿!¡#&%(){}´+,.;:<>-]{1,500}$',
    RegExp_UserType: "^(alumno|profesor|registrador|administrador)$",
    RegExp_GenericText: "^[a-zA-Z0-9 ]{1,10}$",
    RegExp_State: "^(AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|\
MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS)$",
    RegExp_IdLocation: "^(AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC\
|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS)[0-9]{3}$" ,
    RegExp_Email: '^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]\
{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$',

    acceptedFileTypes: mimeList,

    imageFileTypes: imageMimeList,

    pdf: ['pdf'],

    globalValidate: function (fields, fieldsMap, expectedFields, files, mimelist, expectedFiles) {

            return new Promise( ( resolve, reject ) => {
                
                var returnValue = new Object();
//console.log("START");
                var dataToValidate = this.getValidatableFields(
                    fields,
                    fieldsMap
                );
                if (dataToValidate == null) {
                    return reject (Errors.ERR_008);
                }
//console.log(dataToValidate);

                var inputData = this.validateFields(
                    dataToValidate,
                    expectedFields
                );
//console.log(inputData);

                if (inputData.validity == false) {
                    reject (inputData.errorCode);
                }
//console.log("good");

                returnValue.fields = inputData.data;

                var filesArray = this.getValidatableFiles(
                    files,
                    mimelist,
                    expectedFiles
                );
//console.log(filesArray);

                if (filesArray == null) {
                    return reject (Errors.ERR_016);
                }
                this.validateFiles(filesArray)
                .then( ( value ) => {

                    returnValue.files = [];

                    value.forEach((item, i) => {
                        returnValue.files.push({
                            ext: item.ext,
                            mime: item.mime,
                            name: item.name,
                            buffer: item.buffer
                        });
                    });

                    return resolve ( returnValue );
                }).catch( ( err ) => {
                    return reject ( err );
                });
            });
    },

    validateFields: function (arrayWithData, expectedCount) {

        var dataToReturn = [];
        var count = 0;
        
        for (index in arrayWithData) {
            count++;
            //if input field is empty, break:
            if (arrayWithData[index].input == undefined ||
                arrayWithData[index].input == null) {
                    break;
            }

            console.log(arrayWithData[index]);
            
            if (arrayWithData[index].func != null &&
                arrayWithData[index].func != undefined) {
                var evaluated = arrayWithData[index].func(
                        arrayWithData[index].input,
                        arrayWithData[index].arguments
                    )
                    
                if (evaluated == false) {
                    return {
                        index: index,
                        validity:false,
                        errorCode:arrayWithData[index].errorCode,
                        data: null
                    };
                }
                dataToReturn.push( arrayWithData[index].input );
            }
        }
        
        if (count != expectedCount) {
            return {
                index: -1,
                validity:false,
                errorCode:Errors.ERR_008,
                data: null
            };
        }

        
        
        return {
            index:null,
            validity:true,
            errorCode:null,
            data: dataToReturn
        };
    },

    parseMultipartForm: function (req) {

        const form = formidable({
            multiples: true,
            maxFileSize: 150*1024*1024, //150 MB.
            maxFields: maxFieldsPerRequest
        });

        return new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                resolve({
                    err: err,
                    fields: fields,
                    files: files
                });
            }).on('aborted', (args) => {
                reject(Errors.ERR_011);
            }).on('error', (args) => {
                reject(Errors.ERR_011);
            });
        });
    },

    getValidatableFields: function (fields, map) {
        
        var inputFields = [];

        var fieldsInputNamesArray = [];

        
        map.forEach( (content, key) => {
            fieldsInputNamesArray.push(key);
        });

        
        if (fieldsInputNamesArray.length == 0) {
            return inputFields;
        }

        
        
        if ( Object.keys(fields).length != fieldsInputNamesArray.length) {
            return null;
        }

        
        
        
        for (var i = 0; i < fieldsInputNamesArray.length; i++) {
            var currentProperty = fieldsInputNamesArray[i];
            
            //console.log(currentProperty, " - ", fields[currentProperty]);
            
            if (fields[currentProperty]) {
                inputFields.push({
                    input: fields[currentProperty],
                    func: map.get(currentProperty).func,
                    arguments: map.get(currentProperty).arguments,
                    errorCode: map.get(currentProperty).errorCode
                });
            } else {
                
                return null;
            }
        }
        return inputFields;
    },

    validateFiles: function (files) {

        
        var promiseArray = [];
        
        files.forEach( ( item, i ) => {
            promiseArray.push(
                this.validateMIMEtypeOfFile(item.path, item.mimeList, item.name)
            );
        });

        
        return Promise.all( promiseArray );
    },

    getValidatableFiles: function (files, mimelist, expectedFiles) {
        var returnValue = [];

        
        for (const property in files) {
            
            if (files[property].size > 0) {
                returnValue.push({
                    path: files[property].path,
                    mimeList: mimelist,
                    name: files[property].name
                });
            }
        }

        if (returnValue.length != expectedFiles) {
            return null;
        }
        return returnValue;
    },


    appendRangeToRegExp: function (regExp, min, max) {
        return (regExp + '{' + min.toString() + ',' + max.toString() + '}$');
    },

    validateJSON: function (json) {
        json = typeof json !== "string"
            ? JSON.stringify(json)
            : json;

        try {
            json = JSON.parse(json);
        } catch (e) {
            return false;
        }

        if (typeof json === "object" && json !== null) {
            return true;
        }

        return false;
    },

    validateListOfObjects: function (list, validatorArray) {
        
        var parsed;
        list = typeof list !== "string"
            ? JSON.stringify(list)
            : list;

        try {
            list = JSON.parse(list);
        } catch (e) {
            return false;
        }

        var parsed = list;
        for(var i = 0; i < parsed.length; i++) {
            var obj = parsed[i];
            var counter = 0;
            for (let key in obj) {
                var currentValidator = validatorArray[counter];
                console.log(currentValidator);
                console.log(obj[key]);
                console.log("");
                if ( currentValidator.func(obj[key], currentValidator.args) == false ) {
                    return false;
                }
                counter++;
            }
        }
        return true;
    },

    validateListOfArrays: function (list, validatorArray) {
        
        var parsed;
        list = typeof list !== "string"
            ? JSON.stringify(list)
            : list;

        try {
            list = JSON.parse(list);
        } catch (e) {
            return false;
        }

        var parsed = list;
        for(var i = 0; i < parsed.length; i++) {
            var arr = parsed[i];
            
            
            if (arr.length != validatorArray.length) {
                return false;
            }
            for(var j = 0; j < arr.length; j++) {
                var currentValidator = validatorArray[j];
                if ( currentValidator.func(arr[j], currentValidator.args) == false ) {
                    return false;
                }
            }
        }
        return true;
    },

    validateWithRegExp: function (item, regExp) {
        var regex = new RegExp(regExp);
        if( !regex.test(item.toString()) ) {
            return false;
        }
        return true;
    },

    validateDate: function (dateString) {
        let parsedDate = Date.parse(dateString);
        if (isNaN(parsedDate)) {
            return false;
        }
        return true;
    },

    validateNumber: function (item) {
        const parsed = Number(item);
        if (isNaN(parsed) || item == "" || item == null || item == undefined) {
            return false;
        }
        return true;
    },

    validateMIMEtypeOfFile: function (path, mimeList, name) {

        return new Promise( ( resolve, reject ) => {
            FileType.fromFile(path)
            .then( ( type ) => {

                
                if (type == null || type == undefined) {
                    throw Errors.ERR_017;
                }
                if ( !mimeList.includes(type.ext) ) {
                    throw Errors.ERR_017;
                }
                
                fs.readFile( path, null, (err, data) => {
                  if (err) {
                      return reject (Errors.ERR_014);
                  }
                  resolve ({
                      ext: type.ext,
                      mime: type.mime,
                      name: name,
                      buffer: (
                          'data:' +
                          type.mime +
                          ';base64,' +
                          data.toString('base64')
                      ),
                  });
                });
            }).catch( ( err ) => {
                return reject (err);
            });
        });
    }

};
