import axios from 'axios';
import seedrandom from 'seedrandom';

import config from '../../config';
import trycatch from '../trycatch';
import stringify from '../stringiful';

const { whatsup } = config;
const { baseUri, updateRoute, requestTimeout } = whatsup;

const instance = axios.create({
    baseURL: baseUri,
    timeout: requestTimeout,
});

const sendDataToWhatsup = async (whatsupData) => {
    const { err } = await trycatch(() => instance.post(updateRoute, whatsupData));

    if (err) {
        console.error(stringify({ message: '[ERROR] Failed to send data to Whatsup.', err }));

        return;
    }

    console.log('[LOGGER] Sent data to Whatsup!');
};

const generateUniqueFunctionalityId = (system, functionality) => {
    return seedrandom(`${system}${functionality}`)();
};

export { sendDataToWhatsup, generateUniqueFunctionalityId };
