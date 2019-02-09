/**
 * @author: Shoukath Mohammed, Sricharan Baru
 */

/**
 * @constant
 */
export const Env: any = {
    Cte: 'cte',
    Stp: 'stp',
    Prod: 'prod',
    Sit1: 'sit1',
    Sit2: 'sit2',
    Sit3: 'sit3',
    Dev1: 'dev1',
    Dev2: 'dev2',
    Dev3: 'dev3',
    Local: 'local'
};

/**
 * @constant
 * @description:
 * Global configuration object with defaults
 * and enviroments specific values in default
 * can be over written by updating the same
 * property in required environment. The defaults
 * will have configuration for prod environment
 */
export const ENV_CONFIG = {
    local: {
        env: Env.Sit2,
        production: false,
        apiKey: '769c71df-fd85-4645-92e0-b8003a8a4ef3',
        baseUrl: 'http://localhost:4200/'
    },
    stp: {
        env: Env.Stp,
        production: true,
        apiKey: '769c71df-fd85-4645-92e0-b8003a8a4ef3',
        baseUrl: 'https://stpservices.caremark.com:11101/'
    },
    cte: {
        env: Env.Cte,
        production: true,
        baseUrl: 'https://ctepbmservices.caremark.com/'
    },
    sit1: {
        env: Env.Sit1,
        production: false,
        apiKey: '769c71df-fd85-4645-92e0-b8003a8a4ef3',
        baseUrl: 'https://sit1pbmservices.caremark.com/'
    },
    sit2: {
        env: Env.Sit2,
        production: false,
        apiKey: '769c71df-fd85-4645-92e0-b8003a8a4ef3',
        baseUrl: 'https://sit2pbmservices.caremark.com/'
    },
    sit3: {
        env: Env.Sit3,
        production: false,
        apiKey: '769c71df-fd85-4645-92e0-b8003a8a4ef3',
        baseUrl: 'https://sit3pbmservices.caremark.com/'
    },
    dev1: {
        env: Env.Dev1,
        production: false,
        apiKey: '769c71df-fd85-4645-92e0-b8003a8a4ef3',
        baseUrl: 'https://devservices-west.caremark.com:11101/'
    },
    dev2: {
        env: Env.Dev2,
        production: false,
        apiKey: '769c71df-fd85-4645-92e0-b8003a8a4ef3',
        baseUrl: 'https://devservices-west.caremark.com:11102/'
    },
    dev3: {
        env: Env.Dev3,
        production: false,
        apiKey: '769c71df-fd85-4645-92e0-b8003a8a4ef3',
        baseUrl: 'https://devservices-west.caremark.com:11103/'
    },
    prod: {
        env: Env.Prod,
        production: true,
        faststyle: 'caremark',
        baseUrl: 'https://pbmservices.caremark.com/',
        apiKey: 'mm56884e-d777-4f52-b9e5-38e49c0b3e72'
    },
    defaults: {
        env: Env.Prod,
        production: true,
        faststyle: 'caremark',
        baseUrl: 'https://pbmservices.caremark.com/',
        apiKey: 'mm56884e-d777-4f52-b9e5-38e49c0b3e72'
    }
};
