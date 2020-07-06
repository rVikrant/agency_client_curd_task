"use strict";

// constants imported
const { API } = require("../../config/constants/app-defaults"),
  {
    SUCCESS,
  } = require("../../config/constants/response-messages").STATUS_MSG.SUCCESS;

// local modules
const responseManager = require("../../lib/response-manager"),
  ErrorResponse = responseManager.wrapError("AdminAuthRoute"),
  SuccessResponse = responseManager.sendSuccess;

const routeValidator = require("./validator"),
  Controller = require("./controller"),
  formDataPlugin = {
    "hapi-swagger": {
      payloadType: "form",
    },
  };
let routes = [
  // admin login
  {
    method: "POST",
    path: `/login`,
    config: {
      description: "admin login route",
      auth: false,
      tags: ["api", "admin", "login"],
      handler: async (request, h) => {
        try {
          let responseData = await Controller.login(request.payload);
          return SuccessResponse("en", SUCCESS, responseData);
        } catch (err) {
          return ErrorResponse(
            "en",
            "AdminController.login",
            err,
            request.payload
          );
        }
      },
      validate: routeValidator.login,
      plugins: formDataPlugin,
    },
  },
];
module.exports = routes;
