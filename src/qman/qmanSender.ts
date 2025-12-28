import { Client, EmbedBuilder } from "discord.js";
import { Guild } from "../util/database/models/Guild";
import { validateGuildTextChannel } from "../util/validate";
import { colors } from "../util/json/colors";
import { generateQuestionID } from "./qmanGenerators";

export async function sendQotdToGuild(client: Client, guildRow: Guild, questionText: string) {
  const channelID = guildRow.questionChannelID;
  if (!channelID) return;

  const channel = await client.channels.fetch(channelID).catch(() => null);
  if (!channel) return;
  validateGuildTextChannel(channel);

  const embQuestion = new EmbedBuilder()
    .setTitle(`🧙‍♂️ - Question Time!`)
    .setDescription(
      `## ${questionText}\n\n` + 
      `-# Question ID: **${generateQuestionID()}** | Tags: **(none yet)** | Asked by **Quidbot**`
    )
    .setColor(colors.default)
    .setTimestamp(new Date());

  await channel.send({ embeds: [embQuestion] });
}