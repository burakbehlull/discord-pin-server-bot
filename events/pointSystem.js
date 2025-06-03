import { Events } from 'discord.js';
import { User } from '#models';
import config from '../config.json' assert { type: 'json' };

export default {
    name: Events.MessageCreate,
    async execute(client, message) {
        if (message.author.bot) return;

        if (config.blockedChannels.includes(message.channel.id)) return;

        const hasImage = message.attachments.some(att => att.contentType?.startsWith('image'))
            || message.embeds.some(embed => embed.image);

        if (!hasImage) return;

        try {
            const userId = message.author.id;

            const userData = await User.findOneAndUpdate(
                { userId },
                { $inc: { points: 1 } },
                { upsert: true, new: true }
            )
        } catch (err) {
            console.error('Puan artış hatası:', err);
        }
    }
};
