import axios from 'axios';

import config from '../config';
import trycatch from '../utils/trycatch';

const instance = axios.create({
    timeout: config.isAliveTimeout,
});

const checkIsAlive = async (host: string, isAliveRoute: string, protocol: string) => {
    const { err } = await trycatch(() => instance.get(`${protocol}://${host}${isAliveRoute}`));

    return !err;
};

export { checkIsAlive };
