const axios = require("axios");

const { whatsup } = require("./config");
const trycatch = require("./utils/trycatch");
const stringify = require("./utils/stringiful");

const { baseUri, updateRoute, requestTimeout } = whatsup;

const instance = axios.create({
  baseURL: baseUri,
  timeout: requestTimeout,
});

const sendDataToWhatsup = async (whatsupData) => {
  const { err } = await trycatch(() => instance.post(updateRoute, whatsupData));

  if (err) {
    console.error(
      stringify({ message: "[ERROR] Failed to send data to Whatsup.", err })
    );

    return;
  }

  console.log("[LOGGER] Sent data to Whatsup!");
};

module.exports = { sendDataToWhatsup };
