import env from 'env-var';
import dotenv from 'dotenv';

dotenv.config();

const config = {
    cronTimer: env.get('CRON_TIMER').default('0 */5 * * * *').asString(),
    whatsup: {
        baseUri: env.get('WHATSUP_BASE_URI').required().asUrlString(),
        updateRoute: env.get('WHATSUP_UPDATE_ROUTE').required().asString(),
        requestTimeout: env.get('WHATSUP_REQUEST_TIMEOUT').default(1500).asIntPositive(),
    },
    systems: env.get('SYSTEMS').required().asJsonArray(),
    isAliveTimeout: env.get('IS_ALIVE_TIMEOUT').default(3000).asIntPositive(),
    elastic: {
        options: {
            pingTimeout: env.get('ELASTIC_PING_TIMEOUT').default(5000).asIntPositive(),
        },
        health: {
            requestTimeout: env.get('ELASTIC_REQUEST_TIMEOUT').default(5000).asIntPositive(),
        },
    },
};

export default config;
