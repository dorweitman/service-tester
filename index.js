const schedule = require("node-schedule");

const config = require("./config");
const stringify = require("./utils/stringiful");
const { checkIsAlive, checkICMPConnection } = require("./tests");
const { sendDataToWhatsup } = require("./whatsup");

const { cronTimer, services, status } = config;

const determineStatus = (arrOfBooleans) => {
  if (arrOfBooleans.every(Boolean)) {
    return status.OK;
  }

  if (arrOfBooleans.includes(false) && arrOfBooleans.includes(true)) {
    return status.CRITICAL;
  }

  return status.DOWN;
};

const main = async () => {
  console.log("Checking...");

  let resultsForWhatsup = [];
  for (const service of services.list) {
    const { name, hosts, isAliveRoute, functionalityIdOne, functionalityIdTwo, protocol } = service;

    const hostIsAliveChecker = (host) => checkIsAlive(host, isAliveRoute, protocol);

    const connectivities = await Promise.all(hosts.map(hostIsAliveChecker));
    const pings = await Promise.all(hosts.map(checkICMPConnection));

    const responsiveStatus = determineStatus(connectivities);
    const reachableStatus = determineStatus(pings);

    const timeStamp = new Date();
    const status = Math.max(responsiveStatus, reachableStatus);

    const functionalities = [
      {
        id: functionalityIdOne,
        name: `${name} Server`,
        status: reachableStatus,
        timeStamp,
        description: "Check Server",
        tests: [
          {
            name: "ICMP connection",
            passed: reachableStatus === 0,
            timeStamp,
            description: "Pings the server",
            duration: 0,
          },
        ],
      },
      {
        id: functionalityIdTwo,
        name: `${name} Service`,
        status: responsiveStatus,
        timeStamp,
        description: "Check Service",
        tests: [
          {
            name: `GET ${isAliveRoute}`,
            passed: responsiveStatus === 0,
            timeStamp,
            description: "Perfrom GET Request",
            duration: 0,
          },
        ],
      },
    ];

    const whatsupResults = { name, status, timeStamp, functionalities };

    resultsForWhatsup.push(whatsupResults);
  }

  console.log(stringify(resultsForWhatsup));

  await Promise.allSettled(resultsForWhatsup.map(sendDataToWhatsup));
};

schedule.scheduleJob(cronTimer, main);
