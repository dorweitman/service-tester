import { createStringifyFunction } from 'stringiful';

const stringify = createStringifyFunction({
    inspectOptions: {
        colors: true,
        depth: null,
    },
});

export default stringify;
