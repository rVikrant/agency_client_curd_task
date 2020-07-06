'use strict';

//  constants imported
const CONSTANTS = require('../config/constants');

// local modules
const TokenManager = require('../lib/token-manager');

exports.plugin = {
    name: 'auth',
    register: async (server, options) => {
        await server.register(require('hapi-auth-jwt2'));
        server.auth.strategy(CONSTANTS.appDefaults.AUTH_STRATEGIES.ADMIN,
            'jwt',
            {
                key: CONSTANTS.appDefaults.JWT_SECRET.ADMIN,          // Never Share your secret key
                validate: TokenManager.verifyToken, // validate function defined above
                verifyOptions: { algorithms: ['HS256'] } // pick a strong algorithm
            });
        server.auth.strategy(CONSTANTS.appDefaults.AUTH_STRATEGIES.AGENCY,
            'jwt',
            {
                key: CONSTANTS.appDefaults.JWT_SECRET.AGENCY,          // Never Share your secret key
                validate: TokenManager.verifyToken, // validate function defined above
                verifyOptions: { algorithms: ['HS256'] } // pick a strong algorithm
            });
        server.auth.strategy(CONSTANTS.appDefaults.AUTH_STRATEGIES.CLIENT,
            'jwt',
            {
                key: CONSTANTS.appDefaults.JWT_SECRET.CLIENT,          // Never Share your secret key
                validate: TokenManager.verifyToken, // validate function defined above
                verifyOptions: { algorithms: ['HS256'] } // pick a strong algorithm
            });
        server.auth.default(CONSTANTS.appDefaults.AUTH_STRATEGIES.ADMIN);
    }
};
