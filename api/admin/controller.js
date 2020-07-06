"use strict";

// constants imported
const { AUTH_STRATEGIES } = require("../../config/constants/app-defaults");
const {
  INVALID_EMAIL,
  INVALID_PASSWORD,
} = require("../../config/constants/response-messages").STATUS_MSG.ERROR;

// local modules
const { logger } = require("../../lib/log-manager");
const { adminModel } = require("../../models");
const { generateToken } = require("../../lib/token-manager");
const { compareCryptData } = require("../../util/universal-functions");
const { findOne, findAndUpdate } = require("../../dao-manager/queries");

const login = async (payload) => {
  try {
    logger.info(`\n admin auth controller login fn: ......\n`);

    // check admin exist
    let criteria = {
      email: payload.email,
    };

    let adminData = await findOne(adminModel, criteria, {}, { lean: true });

    if (!!adminData && adminData._id) {
      // admin exist -> check password else throw error for same
      if (compareCryptData(payload.password, adminData.password)) {
        // generating token
        let tokenData = {
          _id: adminData._id,
          issuedAt: Date.now(),
          scope: AUTH_STRATEGIES.ADMIN,
        };

        adminData.accessToken = generateToken(tokenData);

        adminData = await findAndUpdate(
          adminModel,
          criteria,
          {
            $set: {
              issuedAt: tokenData.issuedAt,
              accessToken: adminData.accessToken,
            },
          },
          {
            lean: true,
            new: true,
            projection: { password: 0, __v: 0, registrationDate: 0, issuedAt: 0 },
          }
        );

        return adminData;
      } else {
        throw INVALID_PASSWORD;
      }
    } else {
      throw INVALID_EMAIL;
    }
  } catch (e) {
    logger.log(
      "error",
      `error in admin auth controller login fn: .... \n :${e}`
    );
    throw e;
  }
};

module.exports = {
  login: login,
};
