import { Events } from 'discord.js';
import "dotenv/config"
import { Afk } from '#models';


export default {
  name: Events.MessageCreate, 
  async execute(client, message) {
    const prefix = process.env.PREFIX
	
	  if (!message.guild || message.author.bot) return;

	  // AFK
	  const mentioned = message.mentions.users.first();
	  if (mentioned) {
		const afkData = await Afk.findOne({ userId: mentioned.id });
		if (afkData) {
		  message.channel.send({
			content: `**${mentioned.username}** şu anda AFK: ${afkData.reason}`
		  });
		}
	  }

	  const selfAfk = await Afk.findOne({ userId: message.author.id });
	  if (selfAfk) {
		await Afk.deleteOne({ userId: message.author.id });
		message.reply('Hoş geldin, artık AFK değilsin.');
	  }
	
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.prefixCommands.get(commandName);

    if (!command) return;

    try {
      await command(client, message, args);
    } catch (error) {
      console.error(`❌ Error executing command: ${commandName}`, error);
      message.channel.send('❌ There was an error executing that command.');
    }
  },
};
