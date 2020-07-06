// npm modules
require("dotenv").config({ path: "./.env" });
const joi = require("joi");

const envVarsSchema = joi
  .object({
    NODE_ENV: joi.string().allow(["DEV", "PROD", "TEST", "STAGING"]).required(),
    PORT: joi.number().required(),

    // mongo variables
    MONGO_HOST: joi.string().required(),
    MONGO_DB_NAME: joi.string().required(),
    MONGO_USER_NAME: joi.string().required().allow(""),
    MONGO_USER_PASSWORD: joi.string().required().allow(""),

	// admin bootstrap
	ADMINPWD: joi.string().required().min(6),
	AdminEmail: joi.string().required().email({minDomainSegments: 2})
  })
  .unknown()
  .required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Enviorment validation error: ${error.message}`);
}
