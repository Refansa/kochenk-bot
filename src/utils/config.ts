import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

export interface ConfigInterface {
    developers: string[];
    guild: {
        id: string;
    };
    client: {
        id: string;
        token: string;
    };
    logging: {
        pretty: boolean;
        rateLimit: {
            minTimeout: number;
        };
    };
}

export const Config: ConfigInterface = require('../../config/config.json');
