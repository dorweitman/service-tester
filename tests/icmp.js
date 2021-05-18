const ping = require("ping");

const checkICMPConnection = async (host) => {
  const result = await ping.promise.probe(host);

  const { alive } = result;
  
  return alive;
};

module.exports = { checkICMPConnection };
