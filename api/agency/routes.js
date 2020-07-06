"use strict";

// constants imported
const constants = require("../../config/constants"),
  APP_CONSTANTS = constants.appDefaults,
  RESPONSE_MESSAGES = constants.responseMessages;

// local modules
const responseManager = require("../../lib/response-manager"),
  ErrorResponse = responseManager.wrapError("AgencyRoute"),
  SuccessResponse = responseManager.sendSuccess;

const routeValidator = require("./validators"),
  AgencyController = require("./controller"),
  UniversalFunctions = require("../../util/universal-functions"),
  formDataPlugin = {
    "hapi-swagger": {
      payloadType: "form",
    },
  },
  defaultPlugin = {
    "hapi-swagger": {},
  };

let AuthRoutes = [
  // save agency with client route
  {
    method: "POST",
    path: `/client`,
    config: {
      description: "create agency with the client",
      auth: APP_CONSTANTS.AUTH_STRATEGIES.ADMIN,
      tags: ["api", "agency"],
      handler: async (request, h) => {
        try {
          if (request.auth && request.auth.credentials) {
            let responseData = await AgencyController.saveAgencyAndClient(
              request.payload,
              request.auth.credentials
            );
            return SuccessResponse(
              "en",
              RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.SUCCESS,
              responseData
            );
          } else
            return ErrorResponse(
              "en",
              "AgencyController.saveAgencyAndClient",
              RESPONSE_MESSAGES.STATUS_MSG.ERROR.UNAUTHORIZED
            );
        } catch (err) {
          return ErrorResponse(
            "en",
            "AgencyController.saveAgencyAndClient",
            err,
            request.payload
          );
        }
      },
      validate: routeValidator.saveAgencyAndClient,
      plugins: defaultPlugin,
    },
  },

  // update client details
  {
    method: "PUT",
    path: `/client/{id}`,
    config: {
      description: "update the client",
      auth: APP_CONSTANTS.AUTH_STRATEGIES.ADMIN,
      tags: ["api", "client", "update"],
      handler: async (request, h) => {
        try {
          if (request.auth && request.auth.credentials) {
            let responseData = await AgencyController.updateClient(
              request.params,
              request.payload,
              request.auth.credentials
            );
            return SuccessResponse(
              "en",
              RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.SUCCESS,
              responseData
            );
          } else
            return ErrorResponse(
              "en",
              "AgencyController.updateClient",
              RESPONSE_MESSAGES.STATUS_MSG.ERROR.UNAUTHORIZED
            );
        } catch (err) {
          return ErrorResponse(
            "en",
            "AgencyController.updateClient",
            err,
            request.payload
          );
        }
      },
      validate: routeValidator.updateClient,
      plugins: formDataPlugin,
    },
  },

  // agencies with clients at top with totalBIlls details route
  {
    method: "GET",
    path: `/clients`,
    config: {
      description: "get agencies top client as per total bills",
      auth: APP_CONSTANTS.AUTH_STRATEGIES.ADMIN,
      tags: ["api", "agencies", "view", "topClients"],
      handler: async (request, h) => {
        try {
          if (request.auth && request.auth.credentials) {
            let responseData = await AgencyController.topClients(
              request.query,
              request.auth.credentials
            );
            return SuccessResponse(
              "en",
              RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.SUCCESS,
              responseData
            );
          } else
            return ErrorResponse(
              "en",
              "AgencyController.topClients",
              RESPONSE_MESSAGES.STATUS_MSG.ERROR.UNAUTHORIZED
            );
        } catch (err) {
          return ErrorResponse(
            "en",
            "AgencyController.topClients",
            err,
            request.query
          );
        }
      },
      validate: routeValidator.topClients,
      plugins: formDataPlugin,
    },
  },

  // agenc details route
  {
    method: "GET",
    path: `/{id}`,
    config: {
      description: "get agency details",
      auth: APP_CONSTANTS.AUTH_STRATEGIES.ADMIN,
      tags: ["api", "agency", "view"],
      handler: async (request, h) => {
        try {
          if (request.auth && request.auth.credentials) {
            let responseData = await AgencyController.agencyDetails(
              request.params,
              request.query,
              request.auth.credentials
            );
            return SuccessResponse(
              "en",
              RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.SUCCESS,
              responseData
            );
          } else
            return ErrorResponse(
              "en",
              "AgencyController.agency",
              RESPONSE_MESSAGES.STATUS_MSG.ERROR.UNAUTHORIZED
            );
        } catch (err) {
          return ErrorResponse(
            "en",
            "AgencyController.agency",
            err,
            request.query
          );
        }
      },
      validate: routeValidator.agency,
      plugins: formDataPlugin,
    },
  },
];

let NonAuthRoutes = [];

module.exports = [...NonAuthRoutes, ...AuthRoutes];
