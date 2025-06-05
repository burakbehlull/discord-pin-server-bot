import { Settings } from '#models';
import { PermissionsManager } from '#managers';


export default {
  name: 'otorol',
  description: 'Yeni gelen üyelere otomatik verilecek rolü ayarlar.',
  usage: '.otorol @rol',
  async execute(client, message, args) {
	const PM = new PermissionsManager(message);

	const ctrl = await PM.control(PM.flags.Administrator)
	if (!ctrl) return sender.reply(sender.errorEmbed("❌ Yetkin yok."));

    const role = message.mentions.roles.first();
    if (!role) {
      return message.reply('❌ Lütfen bir rol etiketleyin. Örn: `.otorol @Üye`');
    }

    try {
      const updated = await Settings.findOneAndUpdate(
        { guildId: message.guild.id },
        { autoRoleId: role.id },
        { upsert: true, new: true }
      );

      message.reply(`Otomatik rol başarıyla \`${role.name}\` olarak ayarlandı.`);
    } catch (err) {
      console.error(err);
      message.reply('❌ Bir hata oluştu, lütfen tekrar deneyin.');
    }
  }
};
