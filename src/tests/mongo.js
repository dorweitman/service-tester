const mongoose = require("mongoose");

const trycatch = require("../utils/trycatch");
const stringify = require("../utils/stringiful");

const defaultConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
};

const checkMongoDBServerResponsiveness = async (
  connectionURI,
  connectionOptions = defaultConnectionOptions
) => {
  const connection = await mongoose.createConnection(
    connectionURI,
    connectionOptions
  );

  const adminUtil = connection.db.admin();

  const result = await adminUtil.ping();

  await connection.close();

  const { ok } = result;

  return !!ok;
};

const checkMongoDBHealth = async (connectionURI, connectionOptions) => {
  const { err } = await trycatch(() =>
    checkMongoDBServerResponsiveness(connectionURI, connectionOptions)
  );

  if (err) {
    console.error(
      stringify({
        message: "[MongoDB] Error",
        error,
      })
    );
  }

  return !err;
};

module.exports = { checkMongoDBHealth };
