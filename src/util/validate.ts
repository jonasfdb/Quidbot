import Discord from "discord.js";

export function validateClientReady(client: Discord.Client): asserts client is Discord.Client<true> {
  if (!client.isReady()) {
    throw new Error(`Client not ready!`);
  }
}

export function validateCommandInteractionInGuild(interaction: Discord.CommandInteraction): asserts interaction is Discord.CommandInteraction & {
  guild: Discord.Guild;
  member: Discord.GuildMember;
  channel: Discord.GuildChannel;
  isRepliable: true;
} {
  if (!interaction.guild || !interaction.member || !interaction.channel) {
    throw new Error('Guild, member, or channel missing from command.');
  }

  if (interaction.channel.isDMBased() || !interaction.inGuild()) {
    throw new Error('Command must be used on a server.')
  }

  if (!interaction.isRepliable()) {
    throw new Error('Interaction cannot be replied to.')
  }
}

export function validateInteractionCallbackResponse(interactionCallback: Discord.InteractionCallbackResponse): asserts interactionCallback is Discord.InteractionCallbackResponse & {
  interaction: Discord.InteractionCallback,
  resource: Discord.InteractionCallbackResource & {
    message: Discord.Message,
  }
} {
  if (!interactionCallback || !interactionCallback.interaction || !interactionCallback.resource) {
    throw new Error('Expected InteractionCallbackResponse, got something else or has missing properties.')
  }

  if (!interactionCallback.resource?.message) {
    throw new Error('InnteractionCallbackResponse is missing properties in its resources.')
  }
}

export function validateGuildMember(member: unknown): asserts member is Discord.GuildMember {
  if (!member || !(member instanceof Discord.GuildMember)) {
    throw new Error("Expected GuildMember, got something else.");
  }
}

export function validateGuildTextChannel(channel: unknown): asserts channel is Discord.GuildTextBasedChannel {
  if (!channel || !(channel instanceof Discord.TextChannel || channel instanceof Discord.NewsChannel || channel instanceof Discord.ThreadChannel)) {
    throw new Error('Expected GuildTextBasedChannel, got something else.')
  }
}

export function validateGuildVoiceChannel(channel: unknown): asserts channel is Discord.VoiceBasedChannel {
  if (!channel || !(channel instanceof Discord.VoiceChannel)) {
    throw new Error("Expected VoiceBasedChannel, got something else.");
  }
}

export function validateGuildChannel(channel: unknown): asserts channel is Discord.GuildChannel {
  if (!channel || !(channel instanceof Discord.GuildChannel)) {
    throw new Error("Expected GuildChannel, got something else.");
  }
}

export function validateRole(role: unknown): asserts role is Discord.Role {
  if (!role || !(role instanceof Discord.Role)) {
    throw new Error('Expected Role, got something else.')
  }
}

export function validateNumber(number: unknown): asserts number is number {
  if (!number || typeof number !== 'number') {
    throw new Error("Expected Number, got something else.")
  }
}

export function validateNullNumber(number: unknown): asserts number is number {
  if (typeof number !== 'number' || number !== 0) {
    throw new Error("Expected Number of size 0, got something else.")
  }
}

export function validateString(string: unknown): asserts string is string {
  if (!string || typeof string !== 'string') {
    throw new Error('Expected String, got something else.')
  }
}
