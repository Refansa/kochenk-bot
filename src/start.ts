import { GatewayIntentBits, REST } from 'discord.js';

import { CustomClient } from './extensions/custom-client.js';
import { Bot } from './models/index.js';
import { CommandRegistrationService, Logger } from './services/index.js';
import { Config } from './utils/index.js';

async function start(): Promise<void> {
    const client = new CustomClient({
        intents: [GatewayIntentBits.Guilds],
    });

    const bot = new Bot(Config.client.token, client);

    try {
        const rest = new REST({ version: '10' }).setToken(Config.client.token);
        const commandRegistrationService = new CommandRegistrationService(rest);
        await commandRegistrationService.process(client, process.argv);
    } catch (err) {
        Logger.error(err);
        process.exit();
    }

    await bot.start();
}

start().catch(err => {
    Logger.error(err);
});
