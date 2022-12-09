import { REST, Routes } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { Command } from '../commands/index.js';
import { CustomClient } from '../extensions/index.js';
import { Config } from '../utils/config.js';
import { Logger } from './logger.js';

export class CommandRegistrationService {
    constructor(private rest: REST) {}

    public async process(client: CustomClient): Promise<void> {
        const commands = [];

        const commandsPath = fileURLToPath(
            new URL(path.join('..', 'commands', 'chat'), import.meta.url)
        );
        const commandFiles = fs
            .readdirSync(commandsPath)
            .filter(file => file.endsWith('command.js'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command: Command = (await import(filePath)).default;

            commands.push(command.data.toJSON());

            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
            } else {
                Logger.error(
                    `The command at ${filePath} is missing a required "data" or "execute" property.`
                );
            }
        }

        (async () => {
            try {
                Logger.info(`Started refreshing ${commands.length} application (/) commands.`);

                await this.rest.put(Routes.applicationCommands(Config.client.id), {
                    body: commands,
                });

                Logger.info(`Successfully reloaded ${commands.length} application (/) commands.`);
            } catch (err) {
                Logger.error(err);
            }
        })();
    }
}
