import { SlashCommandBuilder } from 'discord.js';

import { Command } from '../index.js';

export default {
    data: new SlashCommandBuilder().setName('replit').setDescription('Testing new command'),
    execute: async intr => {
        await intr.reply('It Works!');
    },
} as Command;
