import ping from 'ping';

const checkICMPConnection = async (host: string) => {
    const result = await ping.promise.probe(host);

    const { alive } = result;

    return alive;
};

export { checkICMPConnection };
