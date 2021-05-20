const config = require("../config");

const {
  whatsup: { status },
} = config;

const determineStatus = (arrOfBooleans) => {
  if (arrOfBooleans.every(Boolean)) {
    return status.OK;
  }

  if (arrOfBooleans.includes(false) && arrOfBooleans.includes(true)) {
    return status.CRITICAL;
  }

  return status.DOWN;
};

module.exports = { determineStatus };
