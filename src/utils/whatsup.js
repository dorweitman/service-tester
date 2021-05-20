const axios = require("axios");
const seedrandom = require("seedrandom");

const { whatsup } = require("../config");
const trycatch = require("./trycatch");
const stringify = require("./stringiful");

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

const generateUniqueFunctionalityId = (system, functionality) => {
  return seedrandom(`${system}${functionality}`)();
};

module.exports = { sendDataToWhatsup, generateUniqueFunctionalityId };
