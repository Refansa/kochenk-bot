import { ConfigInterface } from './index.js';

export const Config: ConfigInterface = {
    developers: [process.env.DEVELOPERS],
    guild: {
        id: process.env.GUILD_ID,
    },
    client: {
        id: process.env.CLIENT_ID,
        token: process.env.CLIENT_TOKEN,
    },
    logging: {
        pretty: true,
        rateLimit: {
            minTimeout: 30,
        },
    },
};
