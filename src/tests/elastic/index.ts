import elasticsearch from 'elasticsearch';

import trycatch from '../../utils/trycatch';
import config from '../../config';
import ElasticStatus from './status';
import { Status as WhatsupStatus } from '../../utils/whatsup/interface';

const { elastic } = config;

const checkElastichHealth = async (hosts: Array<string>) => {
    const client = new elasticsearch.Client({ ...elastic.options, hosts });

    const { err, result } = await trycatch(() => client.cluster.health(elastic.health));

    if (err) {
        return WhatsupStatus.DOWN;
    }

    return getElasticStatusForWhatsUp(result.status);
};

const getElasticStatusForWhatsUp = (elasticStatus: ElasticStatus) => {
    switch (elasticStatus) {
        case ElasticStatus.GREEN:
            return WhatsupStatus.OK;
        case ElasticStatus.YELLOW:
            return WhatsupStatus.ALERT;
        case ElasticStatus.RED:
            return WhatsupStatus.CRITICAL;
        default:
            return WhatsupStatus.DOWN;
    }
};

export { checkElastichHealth };
