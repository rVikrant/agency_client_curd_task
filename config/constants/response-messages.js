module.exports = {
  STATUS_MSG: {
    SUCCESS: {
      DEFAULT: {
        statusCode: 200,
        message: {
          en: "Success",
        },
        type: "DEFAULT",
      },
      SUCCESS: {
        statusCode: 200,
        message: {
          en: "Success.",
        },
        type: "SUCCESS",
      },
      CREATED: {
        statusCode: 201,
        message: {
          en: "Successfully created.",
        },
        type: "CREATED",
      },
    },
    ERROR: {
      INVALID_TOKEN_TYPE: {
        statusCode: 400,
        message: {
          en: "Token type must be of Bearer type.",
        },
        type: "INVALID_TOKEN_TYPE",
      },
      INVALID_TOKEN: {
        statusCode: 401,
        message: {
          en: "Invalid token.",
        },
        type: "UNAUTHORIZED",
      },
      UNAUTHORIZED: {
        statusCode: 401,
        message: {
          en: "You are not authorized to perform this action.",
        },
        type: "UNAUTHORIZED",
      },
      INVALID_EMAIL: {
				statusCode: 400,
        message: {
            en : 'Sorry this email does not exist.'
        },
				type: 'INVALID_EMAIL'
      },
      INVALID_PASSWORD: {
				statusCode: 400,
        message: {
            en : 'Invalid password.'
        },
				type: 'INVALID_PASSWORD'
      },
      AGENCY_CLIENT_EXISTS: {
        statusCode: 400,
        message: {
          en:
            "Client with same email exists with the agency. Please try again with other email",
        },
        type: "AGENCY_CLIENT_EXISTS",
      },
      AGENCY_EXIST: {
        statusCode: 400,
        message: {
            en: "Agency with this name already exists"
        },
        type: "AGENCY_EXIST"
      },
      SOMETHING_WENT_WRONG: {
        statusCode: 500,
        message: {
          en: "Something went wrong on server.",
        },
        type: "SOMETHING_WENT_WRONG",
      },
      DB_ERROR: {
        statusCode: 400,
        message: {
          en: "DB Error : ",
        },
        type: "DB_ERROR",
      },
      DUPLICATE: {
        statusCode: 400,
        message: {
          en: "Duplicate Entry",
        },
        type: "DUPLICATE",
      },
      APP_ERROR: {
        statusCode: 400,
        message: {
          en: "Application Error.",
        },
        type: "APP_ERROR",
      },
    },
  },
};
