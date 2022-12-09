import { Events, Interaction } from 'discord.js';

import { CustomClient } from '../extensions/index.js';
import { Logger } from '../services/index.js';

export class Bot {
    private ready = false;

    constructor(private token: string, private client: CustomClient) {}

    public async start(): Promise<void> {
        this.registerListeners();
        await this.login(this.token);
    }

    private registerListeners(): void {
        this.client.on(Events.ClientReady, () => this.onReady());
        this.client.on(Events.InteractionCreate, intr => this.onInteraction(intr));
    }

    private async login(token: string): Promise<void> {
        try {
            await this.client.login(token);
        } catch (err) {
            Logger.error('An error occurred while the client attempted to login.', err);
        }
    }

    private async onReady(): Promise<void> {
        const userTag = this.client.user.tag;
        Logger.info(`Client logged in as ${userTag}`);

        this.ready = true;
        Logger.info('Client is ready!');
    }

    private async onInteraction(interaction: Interaction): Promise<void> {
        if (!interaction.isChatInputCommand()) return;

        const command = this.client.commands.get(interaction.commandName);

        if (!command) {
            Logger.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (err) {
            Logger.error(err);
        }
    }
}
