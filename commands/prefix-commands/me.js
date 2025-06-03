import { User } from '#models';
import { messageSender } from "#helpers"

export default {
  name: 'me',
  description: 'Kendi puanını gösterir.',
  async execute(client, message, args) {
    try {
      const userId = message.author.id;
      const userData = await User.findOne({ userId });
	  const sender = new messageSender(message)
	  

      if (!userData) {
        return message.reply('Henüz puanın yok.');
      }
		
	  // `${message.author.tag} - Puan`
	  const IEmbed = sender.embed({
		  author: { name: message.guild.name, iconURL: message.guild.iconURL()},
		  title: null,
          description: `**Toplam puanın:** \`${userData.points}\``,
          color: 0x3498DB
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
