import { SlashCommandBuilder } from 'discord.js';

import { Command } from '../index.js';

export default {
    data: new SlashCommandBuilder().setName('test').setDescription('Testing command'),
    execute: async intr => {
        await intr.reply('Test');
    },
} as Command;
