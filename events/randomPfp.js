import { Events, EmbedBuilder } from 'discord.js'
import config from '../config.json' assert { type: 'json' };

const { randomPfpChannel, isRandomPfp } = config

export default {
    name: Events.UserUpdate,
    async execute(interaction, oldUser, newUser) {
        try {
			if(!isRandomPfp) return
			
            function isGifAvatar(avatarUrl) {
				return avatarUrl.includes('.gif');
			}
            

            const user = await interaction.users.fetch(oldUser.id)
            const channel = await interaction.channels.cache.get(randomPfpChannel)
            
            let avatar = user.displayAvatarURL({ dynamic: true, size: 1024 });
            if(oldUser===newUser) return
			
            if(isGifAvatar(avatar)){
                avatar.replace('webp', 'gif')
            } else {
                avatar.replace('webp', 'png')
            }

			
			const guild = channel.guild;
			
            const embed = new EmbedBuilder()
            .setTitle(`**${user.globalName}** | ${user.username}`)
            .setImage(avatar)
			.setTimestamp()
			.setFooter({
				text: guild.name,
				iconURL: guild.iconURL({ dynamic: true })
			})
            
            await channel.send({embeds: [embed]})
        } catch (error) {
            console.log('Hata: ', error.message)
        }
    }
}