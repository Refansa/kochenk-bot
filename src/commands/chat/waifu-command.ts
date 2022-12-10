import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';

import { Command } from '../index.js';

export default {
    data: new SlashCommandBuilder()
        .setName('waifu')
        .setDescription('Randomly get your waifu!')
        .addBooleanOption(option => {
            return option.setName('is_nsfw').setDescription('Set if nsfw');
        }),
    execute: async (intr: ChatInputCommandInteraction) => {
        const is_nsfw = intr.options.getBoolean('is_nsfw') ?? false;
        const res = await fetch(`https://api.waifu.im/search?is_nsfw=${is_nsfw}`);
        const data = (await res.json()).images[0];

        const embed = new EmbedBuilder()
            .setColor('DarkGold')
            .setTitle(data.tags[0].name)
            .setDescription(data.tags[0].description)
            .setImage(data.url);

        await intr.reply({ embeds: [embed] });
    },
} as Command;
