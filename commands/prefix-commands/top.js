import { User } from '#models';

export default {
  name: 'top',
  description: 'En yüksek 10 puanlı kullanıcıyı gösterir.',
  async execute(client, message, args) {
    try {
      const topUsers = await User.find().sort({ points: -1 }).limit(10);

      if (!topUsers.length) {
        return message.reply('Henüz puan alan kullanıcı yok.');
      }

      let description = '';
      for (let i = 0; i < topUsers.length; i++) {
        const userData = topUsers[i];
        let username = userData.userId;

        try {
          const member = await message.guild.members.fetch(userData.userId);
          username = member.user.tag;
        } catch {
          // Kullanıcı bulunmazsa userId göster
        }

        description += `**${i + 1}.** ${username} — \`${userData.points}\` puan\n`;
      }

      await message.channel.send({
        embeds: [{
          title: '🏆 Puan Sıralaması - İlk 10',
          description,
          color: 0xFFD700,
          timestamp: new Date(),
        }],
      });
    } catch (err) {
      console.error('error:', err);
      message.reply('Bir hata oluştu.');
    }
  },
};
