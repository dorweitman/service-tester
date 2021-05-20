import { createConnection, ConnectOptions } from 'mongoose';

import trycatch from '../utils/trycatch';
import stringify from '../utils/stringiful';

const defaultConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
};

const checkMongoDBServerResponsiveness = async (connectionURI: string, connectionOptions: ConnectOptions = defaultConnectionOptions) => {
    const connection = await createConnection(connectionURI, connectionOptions);

    const adminUtil = connection.db.admin();

    const result = await adminUtil.ping();

    await connection.close();

    const { ok } = result;

    return !!ok;
};

const checkMongoDBHealth = async (connectionURI: string, connectionOptions: ConnectOptions) => {
    const { err } = await trycatch(() => checkMongoDBServerResponsiveness(connectionURI, connectionOptions));

    if (err) {
        console.error(
            stringify({
                message: '[MongoDB] Error',
                err,
            }),
        );
    }

    return !err;
};

export { checkMongoDBHealth };
