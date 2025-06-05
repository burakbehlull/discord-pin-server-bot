import { Events, EmbedBuilder } from 'discord.js';
import config from '../config.json' assert { type: 'json' };

const { randomBannerChannel, isRandomBanner } = config;

export default {
    name: Events.UserUpdate,
    async execute(interaction, oldUser, newUser) {
        try {
            if (!isRandomBanner) return;

            if (oldUser.banner === newUser.banner) return;

            const user = await newUser.fetch();
            const channel = await newUser.client.channels.fetch(randomBannerChannel);
            const guild = channel.guild;

            const banner = user.bannerURL({ dynamic: true, size: 2048 });

            if (!banner) return;

            const embed = new EmbedBuilder()
                .setTitle(`${user.globalName || user.username}`)
                .setImage(banner)
                .setTimestamp()
                .setFooter({
                    text: guild.name,
                    iconURL: guild.iconURL({ dynamic: true })
                });

            await channel.send({ embeds: [embed] });
        } catch (error) {
            console.error('Banner kontrolünde hata: ', error);
        }
    }
};
