import { ActivityType, Client, Events } from "discord.js";
import { startQman } from "../qman/qman";

export default {
	name: Events.ClientReady,
	once: true,

	async execute(client: Client<true>) {
		client.user!.setPresence({ status: "online", activities: [{ name: 'existence', type: ActivityType.Competing }] });
		console.warn(`Startup successful! Bot is ready!`);

    startQman(client);
	},
};