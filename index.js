const schedule = require("node-schedule");

const config = require("./src/config");
const stringify = require("./src/utils/stringiful");
const { checkIsAlive, checkICMPConnection,  } = require("./src/tests");
const { sendDataToWhatsup } = require("./src/utils/whatsup");
const { determineStatus } = require("./src/utils/status");

const { cronTimer, services } = config;

const main = async () => {
  const timeStamp = new Date();

  console.log(`[${timeStamp.toISOString()}] Preparing to perform tests...`);

  let resultsForWhatsup = []; 
  for (const service of services.list) {
    const { name, applicationHosts, isAliveRoute, functionalityIdOne, functionalityIdTwo, protocol } = service;

    const hostIsAliveChecker = (host) => checkIsAlive(host, isAliveRoute, protocol);

    const connectivities = await Promise.all(applicationHosts.map(hostIsAliveChecker));
    const pings = await Promise.all(applicationHosts.map(checkICMPConnection));

    const responsiveStatus = determineStatus(connectivities);
    const reachableStatus = determineStatus(pings);

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
