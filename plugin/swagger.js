'use strict';

// npm modules
const   inert       = require('inert');
const   vision      = require('vision');
const   hapiSwagger = require('hapi-swagger');

// local modules
// const  Logger   =   require('../lib/log-manager').logger;
const {APP} = require("../config/constants/app-defaults");



exports.plugin = {
    name: 'swagger-plugin',

    register: async (server) => {
        const swaggerOptions = {
            info: {
                title: `${process.env.NODE_ENV} APi Doc of '${APP.NAME}' project routes`
            },
            schemes: ["http", "https"]
        };
        await server.register([
            inert,
            vision,
            {
                plugin: hapiSwagger,
                options: swaggerOptions
            }
        ]);
        console.log('Swagger Loaded');
    }
};
