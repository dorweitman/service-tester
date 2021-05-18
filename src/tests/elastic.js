const elasticsearch = require("elasticsearch");

const trycatch = require("../utils/trycatch");
const config = require("../config");

const { elastic } = config;

const checkElastichHealth = async (hosts) => {
  const client = new elasticsearch.Client({ ...elastic.options, hosts });

  const { err } = await trycatch(() => client.ping());

  return !err;
};

module.exports = { checkElastichHealth };
