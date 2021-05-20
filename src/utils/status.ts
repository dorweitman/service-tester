import { Status } from './whatsup/interface';

const determineStatus = (arrOfBooleans: Array<boolean>) => {
    const numberOfTrueOccurrences = arrOfBooleans.filter(Boolean).length;

    if (numberOfTrueOccurrences === arrOfBooleans.length) {
        return Status.OK;
    }

    const numberOfFalseOccurrences = arrOfBooleans.length - numberOfTrueOccurrences;

    if (numberOfTrueOccurrences > numberOfFalseOccurrences) {
        return Status.ALERT;
    }

    if (numberOfFalseOccurrences > numberOfTrueOccurrences) {
        return Status.CRITICAL;
    }

    return Status.DOWN;
};

export { determineStatus };
