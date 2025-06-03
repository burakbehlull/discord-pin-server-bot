import { Events } from 'discord.js';
import { User } from '#models';
import config from '../config.json' assert { type: 'json' };

const { pointBlockedChannels, pointBlockedCategories } = config;

export default {
    name: Events.MessageCreate,
    async execute(client, message) {
        if (message.author.bot) return;
        if (pointBlockedChannels.includes(message.channel.id)) return;
        if (pointBlockedCategories.includes(message.channel.parentId)) return;

        const imageAttachments = message.attachments.filter(att => att.contentType?.startsWith('image'));
        const imageEmbeds = message.embeds.filter(embed => embed.image);
        const imageCount = imageAttachments.size + imageEmbeds.length;

        if (imageCount === 0) return;

        try {
            await User.findOneAndUpdate(
                { userId: message.author.id },
                { $inc: { points: imageCount } },
                { upsert: true, new: true }
            );
        } catch (err) {
            console.error('Puan artış hatası:', err);
        }
    }
};
