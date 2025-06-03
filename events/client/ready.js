import { Events } from 'discord.js'

export default {
    name: Events.ClientReady,
    once: true,
    async execute(client, ActivityType) {
        console.log(`${client.user.tag} adlı bot hazır!`);
        client.user.setPresence({
			activities: [
				{
					name: `Pin!`,
					type: ActivityType.Listening
				}
			],
			status: "idle",
			shardId: 0
		})
    }
}