const axios = require("axios");

const config = require("../config");
const trycatch = require("../utils/trycatch");

const instance = axios.create({
  timeout: config.services.isAliveTimeout,
});

const checkIsAlive = async (host, isAliveRoute, protocol) => {
  const { err } = await trycatch(() => instance.get(`${protocol}://${host}${isAliveRoute}`));

  return !err;
};

module.exports = { checkIsAlive };
