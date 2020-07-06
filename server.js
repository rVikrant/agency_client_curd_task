"use strict";

// validate enviorment file
require("./env-validation");

// npm modules
const Hapi = require("hapi");

// local modules
const Bootstrap = require("./util/bootstrap"); // let it be on top here
const Plugins = require("./plugin");
const { APP, SERVER } = require("./config/constants").appDefaults;
const Logger = require("./lib/log-manager").logger;

// Create Server
let server = new Hapi.Server({
  app: {
    name: APP.NAME,
  },
  port: process.env.PORT || SERVER.PORT,
  routes: {
    cors: true,
  },
});

(async (initServer) => {
  try {
    // Register All Plugins
    await server.register(Plugins);

    server.events.on("response", (request) => {
      Logger.info(
        "info",
        `[${request.method.toUpperCase()} ${request.url.path} ](${
          request.response.statusCode
        }) : ${request.info.responded - request.info.received} ms`
      );
    });

    // hapi swagger workaround(but a ugly hack for version 9.0.1)
    server.ext("onRequest", async (request, h) => {
      request.headers["x-forwarded-host"] =
        request.headers["x-forwarded-host"] || request.info.host;
      return h.continue;
    });

    server.ext("onPreAuth", (request, h) => {
      Logger.info("info", `onPreAuth`);
      return h.continue;
    });

    server.ext("onCredentials", (request, h) => {
      Logger.info("info", `onCredentials`);
      return h.continue;
    });

    server.ext("onPostAuth", (request, h) => {
      Logger.info("info", `onPostAuth`);
      return h.continue;
    });

    // Start Server
    await server.start();

    Logger.log("info", `Server running at ${server.info.uri}`);
  } catch (error) {
    Logger.error(error);
  }
})();

module.exports = server;
