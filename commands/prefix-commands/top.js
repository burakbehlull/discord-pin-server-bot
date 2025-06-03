import { User } from '#models';
import { messageSender } from "#helpers"

export default {
  name: 'top',
  description: 'En yüksek 10 puanlı kullanıcıyı gösterir.',
  async execute(client, message, args) {
    try {
		
	  const sender = new messageSender(message)
      const topUsers = await User.find().sort({ points: -1 }).limit(10);

      if (!topUsers.length) return sender.reply(sender.errorEmbed('Henüz puan alan kullanıcı yok.'));
      

      let description = '';
      for (let i = 0; i < topUsers.length; i++) {
        const userData = topUsers[i];
        let username = userData.userId;
		let globalName;
        try {
          const member = await message.guild.members.fetch(userData.userId);
          username = member.user.tag;
		  globalName = member.user.globalName;
		  
        } catch {}

        description += `**${i + 1}.** ${globalName} / ${username} — \`${userData.points}\` puan\n`;
      }

	  const IEmbed = sender.embed({
		  author: { name: message.guild.name, iconURL: message.guild.iconURL()},
		  title: '🏆 Puan Sıralaması - İlk 10',
          description,
          color: 0xFFD700
	  })
      await message.channel.send({
        embeds: [IEmbed],
      });
    } catch (err) {
      console.error('error:', err);
      sender.reply(sender.errorEmbed('Bir hata oluştu.'));
    }
  },
};
