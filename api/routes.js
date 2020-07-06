"use strict";

// dependencies
const {APP} = require("../config/constants/app-defaults");


module.exports = [
    {
      method: "GET",
      path: "/",
      handler: (request, h) => {
        return `WELCOME To ${APP.NAME}`;
      },
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/{file*}",
      handler: {
        directory: {
          path: "Uploads/",
        },
      },
      config: {
        auth: false,
      },
    },
  ]