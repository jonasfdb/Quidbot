import Discord from "discord.js";
import { emojis } from "../../util/json/emojis";
import { colors } from "../../util/json/colors";
import { validateCommandInteractionInGuild } from "../../util/validate";
import { findGuild } from "../../util/database/dbutils";

export default {
  data: new Discord.SlashCommandBuilder()
    .setName('ping')
    .setDescription('Ping information.'),

  async execute(client: Discord.Client<true>, interaction: Discord.ChatInputCommandInteraction) {
    validateCommandInteractionInGuild(interaction);
    const received = Date.now();

    const embPinging = new Discord.EmbedBuilder()
      .setColor(colors.default)
      .setTitle("Current pings:")
      .setAuthor({ iconURL: client.user.displayAvatarURL().toString(), name: 'Orb' })
      .setDescription(`${emojis.animatedLoading} Pinging...`)

    let sent = await interaction.reply({ embeds: [embPinging] });

    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;
    const uptimeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    let wsPing = Math.floor(client.ws.ping) < 1 ? `?` : Math.ceil(client.ws.ping);

    const embPing = new Discord.EmbedBuilder()
      .setColor(colors.default)
      .setTitle("\u{1F3D3} Pong!")
      .setAuthor({ iconURL: client.user.displayAvatarURL().toString(), name: 'Quidbot' })
      .setDescription(`Asking questions for **${uptimeString}**.`)
      .addFields(
        {
          name: "Ping values",
          value: `\n\u{251C} **${received - sent.createdAt.getTime()} ms** Discord > Bot` +
            `\n\u{251C} **${wsPing} ms** Bot > Discord API` +
            `\n\u{2514} **${Math.ceil(client.ws.ping) + (received - sent.createdAt.getTime()) + 1} ms total** `,
          inline: false,
        }
      )
      .setTimestamp();

    await interaction.editReply({ embeds: [embPing] });
  }
}
