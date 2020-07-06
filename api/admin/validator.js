'use strict';

// npm modules
const joi = require('joi');

// local modules
const UniversalFunctions = require('../../util/universal-functions'),
    failAction = UniversalFunctions.failActionFunction;


let validator = {};

validator.login = {
    payload: {
      email: joi.string().email({minDomainSegments: 2}).required(),
      password: joi.string().required()
    },
    failAction: failAction
};

module.exports = validator;
