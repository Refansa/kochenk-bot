import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

export interface Command {
    data: SlashCommandBuilder;
    execute(intr: CommandInteraction): Promise<void>;
}

export enum CommandDeferType {
    PUBLIC = 'PUBLIC',
    HIDDEN = 'HIDDEN',
    NONE = 'NONE',
}
