"use strict";

// local dependencies
const { DOC_STATUSES } = require("../config/constants/app-defaults").DATABASE;

// global variables
global.status = [
  DOC_STATUSES.ACTIVE,
  DOC_STATUSES.BLOCKED,
  DOC_STATUSES.DELETED,
];

// dependencies
const { adminModel } = require("../models"),
  { update } = require("../dao-manager/queries"),
  { bCryptData } = require("./universal-functions");

////////////////////////////////// boot strap function here for the app /////////////////////////


// connect to data base (mongo db)
require("../dao-manager/mongo-connection").connect();

// bootstrap admin
(async () => {
  try {
    await update(
      adminModel,
      { email: process.env.AdminEmail },
      {
        $set: {
          password: await bCryptData(process.env.ADMINPWD),
          registerationDate: Date.now(),
        },
      },
      { upsert: true }
    );

    console.log("admin bootstraped successfully");
  } catch (e) {
    console.log("error in amdin bootrap in bootstrap in utils:", e);
  }
})();
