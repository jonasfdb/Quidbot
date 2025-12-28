import Discord from "discord.js";

export function getGuildIcon(interaction: Discord.ChatInputCommandInteraction): string {
  // validateCommandInteractionInGuild(interaction);
  // validation not needed because this function is only called after chat input command has already been validated in handler
  let guildIcon = interaction.guild?.iconURL({ extension: "png" }) ?? interaction.client.user.avatarURL({ extension: "png" });

  return guildIcon as string;
}
