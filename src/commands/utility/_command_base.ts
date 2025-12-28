import Discord from "discord.js";

export default {
  data: new Discord.SlashCommandBuilder()
    .setName('name')
    .setDescription('description'),
  // subcommands
  // options
  // and shit

  async execute(client: Discord.Client<true>, interaction: Discord.ChatInputCommandInteraction) {
    // what the command will do
  }
}