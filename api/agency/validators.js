"use strict";

// npm modules
const joi = require("joi");

// local modules
const UniversalFunctions = require("../../util/universal-functions"),
  APP_CONSTANTS = require("../../config/constants").appDefaults,
  headers = UniversalFunctions.authorizationHeaderObj,
  failAction = UniversalFunctions.failActionFunction;

let validator = {};

// saveAgencyAndClient validator
validator.saveAgencyAndClient = {
  payload: {
    name: joi.string().required().description("agency name here"),
    city: joi.string().required().description("agency city here"),
    state: joi.string().required().description("agency state here"),
    phoneNo: joi
      .string()
      .regex(/^\+[1-9]{1-3}[0-9]{6-15}$/)
      .required()
      .description(
        "agency phone no here with countrycode prefixed + here like +912345678091"
      ),
    address: joi.string().required().description("agency address here here"),
    correspondence: joi
      .string()
      .description("agency correspondenc/secondry address here"),
    clients: joi.array().items(
      joi.object().keys({
        name: joi.string().required().description("client name here"),
        email: joi
          .string()
          .email({ minDomainSegments: 2 })
          .required()
          .description("client email id here"),
        phoneNo: joi
          .string()
          .regex(/^\+[1-9]{1-3}[0-9]{6-15}$/)
          .required()
          .description(
            "client phone no here with countrycode prefixed + here like +912345678091"
          ),
        totalBill: joi
          .number()
          .min(0)
          .required()
          .description("client bill here"),
      })
    ),
  },
  headers: headers,
  failAction: failAction,
};

// update client
validator.updateClient = {
  params: {
    id: joi
      .string()
      .length(24)
      .required()
      .description("client _id whose to update"),
  },
  payload: {
	name: joi.string().required().description("client name here"),
	agencyId: joi
	.string()
	.length(24)
	.required()
	.description("agency _id whose client to update"),
    email: joi
      .string()
      .email({ minDomainSegments: 2 })
      .required()
      .description("client email id here"),
    phoneNo: joi
      .string()
      .regex(/^\+[1-9]{1-3}[0-9]{6-15}$/)
      .required()
      .description(
        "client phone no here with countrycode prefixed + here like +912345678091"
      ),
    totalBill: joi.number().min(0).required().description("client bill here"),
  },
  headers: headers,
  failAction: failAction,
};

// get agencies
validator.topClients = {
  query: {
    skip: joi.number().min(0),
    limit: joi.number().min(0)
  },
  headers: headers,
  failAction: failAction,
};

// get agency
validator.agency = {
  params: {
    id: joi.string().length(24).description("agency _id"),
  },
  headers: headers,
  failAction: failAction,
};

module.exports = validator;
