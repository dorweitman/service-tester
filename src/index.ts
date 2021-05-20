import { scheduleJob } from 'node-schedule';

import config from './config';
import stringify from './utils/stringiful';
import { checkIsAlive, checkICMPConnection } from './tests';
import { sendDataToWhatsup } from './utils/whatsup';
import { IWhatsupSystemInfo } from './utils/whatsup/interface';
import { determineStatus } from './utils/status';

const { cronTimer, systems } = config;

const main = async () => {
    const timeStamp = new Date();

    console.log(`[${timeStamp.toISOString()}] Preparing to perform tests...`);

    let resultsForWhatsup: Array<IWhatsupSystemInfo> = [];
    for (const system of systems) {
        const { name, applicationHosts, isAliveRoute, functionalityIdOne, functionalityIdTwo, protocol } = system;

        const hostIsAliveChecker = (host: string) => checkIsAlive(host, isAliveRoute, protocol);

        const connectivities = (await Promise.all(applicationHosts.map(hostIsAliveChecker))) as boolean[];
        const pings = (await Promise.all(applicationHosts.map(checkICMPConnection))) as boolean[];

        const responsiveStatus = determineStatus(connectivities);
        const reachableStatus = determineStatus(pings);

        const status = Math.max(responsiveStatus, reachableStatus);

        const functionalities = [
            {
                id: functionalityIdOne,
                name: `${name} Server`,
                status: reachableStatus,
                timeStamp,
                description: 'Check Server',
                tests: [
                    {
                        name: 'ICMP connection',
                        passed: reachableStatus === 0,
                        timeStamp,
                        description: 'Pings the server',
                        duration: 0,
                    },
                ],
            },
            {
                id: functionalityIdTwo,
                name: `${name} Service`,
                status: responsiveStatus,
                timeStamp,
                description: 'Check Service',
                tests: [
                    {
                        name: `GET ${isAliveRoute}`,
                        passed: responsiveStatus === 0,
                        timeStamp,
                        description: 'Perfrom GET Request',
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

scheduleJob(cronTimer, main);
