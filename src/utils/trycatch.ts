type TryCatchResult = {
    result?: any;
    err?: any;
};

const trycatch = async (func: Function, ...args: any[]) => {
    const result: TryCatchResult = {};

    try {
        result.result = await func(...args);
    } catch (err) {
        result.err = err;
    }

    return result;
};

export default trycatch;
