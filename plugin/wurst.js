"use strict";

// dependencies
const wurst = require("wurst"),
  path = require("path");

// plugin wurst
exports.plugin = {
  name: "routes",

  register: async (server) => {
    await server.register({
      plugin: wurst,
      options: {
        routes: "**/routes.js",
        cwd: path.join(__dirname,"../api"),
        log: false,
      },
    });
    console.log("wurst plugin successfull");
  },
};
