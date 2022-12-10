import { AutocompleteInteraction, CommandInteraction, SlashCommandBuilder } from 'discord.js';

export interface Command {
    data: SlashCommandBuilder;
    autocomplete?(intr: AutocompleteInteraction): Promise<void>;
    execute(intr: CommandInteraction): Promise<void>;
}

export enum CommandDeferType {
    PUBLIC = 'PUBLIC',
    HIDDEN = 'HIDDEN',
    NONE = 'NONE',
}
