// require('dotenv').config();

module.exports = {
  APP: {
    NAME: "Agency",
  },
  SERVER: {
    HOST: "localhost",
    PORT: 8000,
  },
  API: {
    VERSIONS: {
      v1: "v1",
    },
  },
  JWT_SECRET: {
    ADMIN: process.env.JWT_SECRET_ADMIN,
    AGENCY: process.env.JWT_SECRET_AGENCY,
    CLIENT: process.env.JWT_SECRET_CLIENT,
  },
  AUTH_STRATEGIES: {
    ADMIN: "ADMIN",
    AGENCY: "AGENCY",
    CLIENT: "CLIENT"
  },
  DATABASE: {
    DOC_STATUSES: {
      // DB DOCUMENTS
      ACTIVE: "ACTIVE",
      BLOCKED: "BLOCKED",
      DELETED: "DELETED",
    },
    DEVICE_TYPES: {
      WEB: "WEB",
      IOS: "IOS",
      ANDROID: "ANDROID",
    },
    LANGUAGES: {
      EN: "en",
    },
  },
  DB_LOGGER_TYPES: {
    ERROR: {
      CLIENT: "CLIENT",
      SERVER: "SERVER",
      THIRD_PARTY: "THIRD PARTY",
    },
    LOGGER: {
      REQUEST: "REQUEST",
      RESPONSE: "RESPONSE",
      CRON: "CRON",
      BACKEND_PROCESS: "BACEKND PROCESS",
    },
  },
};
