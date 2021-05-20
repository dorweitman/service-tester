const elasticsearch = require("elasticsearch");

const trycatch = require("../utils/trycatch");
const config = require("../config");

const { elastic, whatsup } = config;
const { status } = whatsup;

const checkElastichHealth = async (hosts) => {
  const client = new elasticsearch.Client({ ...elastic.options, hosts });

  const { err, result } = await trycatch(() => client.cluster.health());

  if (err) {
    return status.DOWN;
  }

  return getElasticStatusForWhatsUp(result.status);
};

const getElasticStatusForWhatsUp = (elasticStatus) => {
  switch (elasticStatus) {
    case "green":
      return status.OK;
    case "yellow":
      return status.ALERT;
    case "red":
      return status.CRITICAL;
    default:
      return status.DOWN;
  }
};

module.exports = { checkElastichHealth };
