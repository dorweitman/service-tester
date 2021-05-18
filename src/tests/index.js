const { checkIsAlive } = require("./alive");
const { checkICMPConnection } = require("./icmp");
const { checkMongoDBHealth } = require("./mongo");

module.exports = { checkIsAlive, checkICMPConnection, checkMongoDBHealth };
