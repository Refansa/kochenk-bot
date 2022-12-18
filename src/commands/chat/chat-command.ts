import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

import { CustomClient } from '../../extensions/index.js';
import { Logger } from '../../services/index.js';
import { Command } from '../index.js';

export default {
    data: new SlashCommandBuilder()
        .setName('chat')
        .setDescription('ChatGPT-3 Test API')
        .addStringOption(option => {
            return option.setName('prompt').setDescription('The Prompt').setRequired(true);
        }),
    execute: async (intr: ChatInputCommandInteraction) => {
        try {
            const prompt = intr.options.getString('prompt');

            await intr.deferReply();

            const result = await (intr.client as CustomClient).openAPI.sendMessage(prompt);

            await intr.editReply(`\`\`\`Prompt:\n${prompt}\n\nAnswer:\n${result.response}\`\`\``);
        } catch (err) {
            Logger.error(err);
        }
    },
} as Command;
