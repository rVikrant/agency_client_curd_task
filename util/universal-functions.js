'use strict';

// npm modules
const joi = require('joi');
// const md5 = require('md5');
// const handlebars = require('handlebars');
const mongoose = require('mongoose');
const bcrypt=require("bcryptjs");
const randomString = require("randomstring");

// constructor
const Boom = require('boom');

// local modules
// const Logger = require('../lib/log-manager').logger;

// constants imported
const CONSTANTS = require('../config/constants');
const RESPONSE_MESSAGES = CONSTANTS.responseMessages;


const failActionFunction = function (request, reply, error) {
    try{
        console.log("mmmmmmmmmm", request.payload);
        console.log("mmmmmmmmmm--------_>>>>>>>>>>.", request.query);
        console.log("mmmmmmmmmm=======",  error.output.payload.type);

        error.output.payload.type = "Joi Error";

        if (error.isBoom) {
            delete error.output.payload.validation;
            if (error.output.payload.message.indexOf("authorization") !== -1) {
                error.output.statusCode = RESPONSE_MESSAGES.STATUS_MSG.ERROR.UNAUTHORIZED.statusCode;
                return error;
            }
            let details = error.details[0];
            if (details.message.indexOf("pattern") > -1 && details.message.indexOf("required") > -1 && details.message.indexOf("fails") > -1) {
                error.output.payload.message = "Invalid " + details.path;
                return error;
            }
        }

        let customErrorMessage = '';
        if (error.output.payload.message.indexOf("[") > -1) {
            customErrorMessage = error.output.payload.message.substr(error.output.payload.message.indexOf("["));
        } else {
            customErrorMessage = error.output.payload.message;
        }
        customErrorMessage = customErrorMessage.replace(/"/g, '');
        customErrorMessage = customErrorMessage.replace('[', '');
        customErrorMessage = customErrorMessage.replace(']', '');
        customErrorMessage = customErrorMessage.replace(customErrorMessage.charAt(0), customErrorMessage.charAt(0).toUpperCase());
        error.output.payload.message = customErrorMessage;
        delete error.output.payload.validation;
        return error;
    }catch(err){
        Logger.error(err);
    }
};


const customQueryDataValidations = function (type, key, data, callback) {
    let schema = {};
    switch (type) {
        case 'PHONE_NO': schema[key] = joi.string().regex(/^[0-9]+$/).length(10);
            break;
        case 'NAME': schema[key] = joi.string().regex(/^[a-zA-Z ]+$/).min(2);
            break;
        case 'BOOLEAN': schema[key] = joi.boolean();
            break;
    }
    let value = {};
    value[key] = data;

    joi.validate(value, schema, callback);
};


const authorizationHeaderObj = joi.object({
    authorization: joi.string().required()
}).unknown();

const authorizationHeaderObjOptional = joi.object({
    authorization: joi.string().optional()
}).unknown();

const CryptData = function (stringToCrypt) {
    return md5(md5(stringToCrypt));
};

const hashPassword = function (plainTextPassword) {

    return md5(md5(plainTextPassword));

    //bcrypt.hash(plainTextPassword,saltRounds,function(err,hash){
    //  callback(err,hash);
};

const compareHashPassword = function (plainTextPassword, hash) {

    return md5(md5(plainTextPassword)) === hash;

    /*bcrypt.compare(plainTextPassword,hash,function(err,res){
       callback(err,res);
    })*/
};

const checkObjectId = function (ids) {
    const ObjectId = mongoose.Types.ObjectId;
    if (ids && ids.$in && typeof ids.$in == 'object' && ids.$in.length) {
        let length = ids.$in.length;
        for (let i = 0; i < length; i++) {
            if (!ObjectId.isValid(ids.$in[i])) {
                return false;
            }
        }
        return true;
    } else {
        return ObjectId.isValid(ids);
    }
};

/*
* @function - deleteExtraObjKeys - This method will remove extra keys from object
*
* @params {Object} obj - This will be object on which delete keys operation will be performaed
* @params {String[]} - This will be array of keys to remove from the object
*
* @return {Object} - The new object with deleted keys
* */
const deleteObjKeys = (obj,keysToRemove) => {
  if(typeof keysToRemove !== 'object' || !keysToRemove.length) {
    throw '"keysToRemove" parameter must be of type array.';
  }
  let newObj = Object.assign({},obj);
  for(let i=0;i<keysToRemove.length;i++){
    delete newObj[keysToRemove[i]];
  }

  return newObj;
};

const escapeRegex = (str)=>{
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
};

let bCryptData=async function (data) {             // bcryptjs encryption
    return new Promise((resolve,reject)=> {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(data, salt).then(result => {
                resolve(result)
            })
        })
    })
};

let compareCryptData = function (data, hash) {       // bcryptjs matching
    return new Promise((resolve,reject)=>{
        bcrypt.compare(data, hash).then(result=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        })
    })
};

const generateRandomString = function () {
    return randomString.generate(6);
};

const generateRandomOTP = function () {
    return randomString.generate({length: 4,
        charset: 'numeric'});
};


module.exports = {
    CryptData: CryptData,
    failActionFunction: failActionFunction,
    customQueryDataValidations: customQueryDataValidations,
    hashPassword: hashPassword,
    compareHashPassword: compareHashPassword,
    authorizationHeaderObj: authorizationHeaderObj,
    authorizationHeaderObjOptional:authorizationHeaderObjOptional,
    checkObjectId: checkObjectId,
    deleteObjKeys : deleteObjKeys,
    escapeRegex : escapeRegex,
    bCryptData:bCryptData,
    compareCryptData:compareCryptData,
    generateRandomString:generateRandomString,
    generateRandomOTP:generateRandomOTP
};
