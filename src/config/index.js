const env = require("env-var");
const dotenv = require("dotenv");

dotenv.config();

const config = {
  cronTimer: env.get("CRON_TIMER").default("0 */5 * * * *").asString(),
  whatsup: {
    baseUri: env.get("WHATSUP_BASE_URI").required().asUrlString(),
    updateRoute: env.get("WHATSUP_UPDATE_ROUTE").required().asString(),
    requestTimeout: env
      .get("WHATSUP_REQUEST_TIMEOUT")
      .default(1500)
      .asIntPositive(),
    status: {
      OK: 0,
      ALERT: 1,
      CRITICAL: 2,
      DOWN: 3,
    },
  },
  services: {
    isAliveTimeout: env.get("IS_ALIVE_TIMEOUT").default(3000).asIntPositive(),
    list: env.get("SERVICES").asJsonArray(),
  },
  elastic: {
    options: {
      pingTimeout: env
        .get("ELASTIC_PING_TIMEOUT")
        .default(5000)
        .asIntPositive(),
    },
    requestTimeout: env
      .get("ELASTIC_REQUEST_TIMEOUT")
      .default(5000)
      .asIntPositive(),
  },
};

module.exports = config;
