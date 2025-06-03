import { User } from '#models';

export default {
  name: 'me',
  description: 'Kendi puanını gösterir.',
  async execute(client, message, args) {
    try {
      const userId = message.author.id;
      const userData = await User.findOne({ userId });

      if (!userData) {
        return message.reply('Henüz puanın yok.');
      }

      await message.channel.send({
        embeds: [{
          title: `${message.author.tag} - Puanın`,
          description: `Toplam puanın: \`${userData.points}\``,
          color: 0x3498DB,
          timestamp: new Date(),
        }],
      });
    } catch (err) {
      console.error('error:', err);
      message.reply('Bir hata oluştu.');
    }
  },
};
