import config from '../config.json' assert { type: 'json' };
import { messageSender } from "#helpers";

const { allowedCategoryIds, allowedChannelIds, allowedUsers } = config;

export default {
  name: 'messageCreate',
  async execute(client, message) {
    const sender = new messageSender(message);

    if (message.author.bot) return;
    if (message.channel.type !== 0) return;


    const hasText = message.content?.trim().length > 0;
    const hasOnlyMedia =
      message.attachments.size > 0 && !hasText;

    if (hasOnlyMedia) return;

    const channelId = message.channel.id;
    const parentId = message.channel.parentId;
    const authorId = message.author.id;

    const isAllowedUser = allowedUsers.includes(authorId);
    const isAllowedChannel = allowedChannelIds.includes(channelId);
    const isInAllowedCategory = allowedCategoryIds.includes(parentId);

    if (!isAllowedUser && !isAllowedChannel && !isInAllowedCategory) {
      try {
        await message.delete();

        const IEmbed = sender.errorEmbed(`${message.author}, bu kanalda mesaj gönderemezsin.`);
        const warning = await message.channel.send({ embeds: [IEmbed] });

        setTimeout(() => {
          warning.delete().catch(() => {});
        }, 5000);
      } catch (err) {
        console.error('Mesaj silinirken hata:', err);
      }
    }
  },
};

