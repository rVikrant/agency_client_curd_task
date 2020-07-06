'use strict';
// npm modules
const jwt = require('jsonwebtoken');

// constants imported
const CONSTANTS = require('../config/constants');
const RESPONSE_MESSAGES = CONSTANTS.responseMessages;

// local modules imported
const Dao = require('../dao-manager').queries;
const {agencyModel, clientModel, adminModel} = require('../models');
const UniversalFunctions = require('../util/universal-functions');
const Logger = require('./log-manager').logger;


let generateToken = (tokenData, userType) => {
	try {
		let secretKey;
		switch (userType) {
			case CONSTANTS.appDefaults.AUTH_STRATEGIES.AGENCY:
				secretKey = CONSTANTS.appDefaults.JWT_SECRET.AGENCY;
				break;
			case CONSTANTS.appDefaults.AUTH_STRATEGIES.CLIENT:
				secretKey = CONSTANTS.appDefaults.JWT_SECRET.CLIENT;
				break;
			default:
				secretKey = CONSTANTS.appDefaults.JWT_SECRET.ADMIN;
		}
		return jwt.sign(tokenData, secretKey);
	} catch (err) {
		throw err;
	}
};


let verifyToken = async (tokenData) => {
	let user;
	try{
		if (tokenData.scope === CONSTANTS.appDefaults.AUTH_STRATEGIES.AGENCY) {
      user = await Dao.findOne(agencyModel, {_id: tokenData._id, issuedAt: tokenData.issuedAt}, {__v: 0, password: 0}, {lean: true});
    } else if (tokenData.scope === CONSTANTS.appDefaults.AUTH_STRATEGIES.CLIENT) {
      user = await Dao.findOne(clientModel, {_id: tokenData._id, issuedAt: tokenData.issuedAt}, {__v: 0, password: 0}, {lean: true});
    } else {
		user = await Dao.findOne(adminModel, {_id: tokenData._id, issuedAt: tokenData.issuedAt}, {__v: 0, password: 0}, {lean: true});

	}
	}catch(err){
		Logger.error(err);
	}

	if (!!user && !!user._id) {
		user.scope = tokenData.scope;
		return {
			isValid: true,
			credentials: user
		};
	}

	else {throw UniversalFunctions.sendError("en", RESPONSE_MESSAGES.STATUS_MSG.ERROR.UNAUTHORIZED);}

};

module.exports = {
	generateToken: generateToken,
	verifyToken: verifyToken
};
