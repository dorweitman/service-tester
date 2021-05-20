const { checkIsAlive } = require("./alive");
const { checkICMPConnection } = require("./icmp");
const { checkMongoDBHealth } = require("./mongo");
const { checkElastichHealth } = require("./elastic");

module.exports = {
  checkIsAlive,
  checkICMPConnection,
  checkMongoDBHealth,
  checkElastichHealth,
};
