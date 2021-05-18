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
  },
  services: {
    isAliveTimeout: env.get("IS_ALIVE_TIMEOUT").default(3000).asIntPositive(),
    list: env.get("SERVICES").asJsonArray(),
  },
  status: {
    OK: 0,
    ALERT: 1,
    CRITICAL: 2,
    DOWN: 3,
  },
};

module.exports = config;
