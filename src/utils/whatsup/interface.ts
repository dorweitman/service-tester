export interface IWhatsupTestResult {
    name: string;
    passed: boolean;
    description: string;
    timeStamp: Date;
    duration: number;
}

export interface IWhatsupFunctionality {
    id: number;
    name: string;
    status: number;
    description: string;
    timeStamp: Date;
    tests: IWhatsupTestResult[];
}

export interface IWhatsupSystemInfo {
    name: string;
    status: number;
    timeStamp: Date;
    functionalities: IWhatsupFunctionality[];
}

export enum Status {
    OK = 0,
    ALERT = 1,
    CRITICAL = 2,
    DOWN = 3,
}
