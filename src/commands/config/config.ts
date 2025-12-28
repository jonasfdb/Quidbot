import Discord from "discord.js";
import { validateCommandInteractionInGuild, validateGuildTextChannel } from "../../util/validate";
import { findGuild } from "../../util/database/dbutils";
import { timezoneMap } from "../../util/database/lookup/timezones";
import { computeNextScheduledAtUtcIso } from "../../qman/qmanScheduler";
import { colors } from "../../util/json/colors";
import { emojis } from "../../util/json/emojis";

export default {
  data: new Discord.SlashCommandBuilder()
    .setName("config")
    .setDescription("Command group for all server settings.")
    .addSubcommand((subcommand) => subcommand
      .setName("current")
      .setDescription("List all current settings.")
    )
    .addSubcommandGroup((subcommandGroup) => subcommandGroup
      .setName('set')
      .setDescription('Edit Quidbot settings.')
      .addSubcommand((subcommand) => subcommand
        .setName("qotd-channel")
        .setDescription("Tell Quidbot where to ask the questions.")
        .addChannelOption((option) => option
          .setName("channel")
          .setDescription("Where Quidbot will send the question of the day.")
          .setRequired(true)
        )
      )
      .addSubcommand((subcommand) => subcommand
        .setName("time")
        .setDescription("When Quidbot will ask the question.")
        .addStringOption((option) => option
          .setName("timezone")
          .setDescription("The timezone of your server.")
          .setRequired(true)
          .addChoices(
            { name: '[-10] (SST/HST) - Samoa, Hawaii',            value: '-10' },
            { name: '[-9] (AKT) - Alaska',                        value: '-9' },
            { name: '[-8] (PT) - Los Angeles, Vancouver',         value: '-8' },
            { name: '[-7] (MT) - Denver, Phoenix, Yukon',         value: '-7' },
            { name: '[-6] (CT) - Chicago, Mexico City',           value: '-6' },
            { name: '[-5] (ET) - New York, Toronto',              value: '-5' },
            { name: '[-4] (AT) - Halifax, Barbados',              value: '-4' },
            { name: '[-3] (BRT) - Sao Paulo, Buenos Aires',       value: '-3' },
            { name: '[+0] (UTC) - London, Lisbon',                value: '0' },
            { name: '[+1] (CET) - Berlin, Paris, Rome',           value: '1' },
            { name: '[+2] (EET) - Athens, Helsinki',              value: '2' },
            { name: '[+3] (MSK) - Moscow, Istanbul',              value: '3' },
            { name: '[+4] (GST) - Dubai, Abu Dhabi',              value: '4' },
            { name: '[+5.5] (IST) - Kolkata, Delhi',              value: '5' },
            { name: '[+7] (ICT) - Bangkok, Jakarta',              value: '7' },
            { name: '[+8] (CST) - Hong Kong, Singapore, Perth',   value: '8' },
            { name: '[+9] (JST) - Tokyo, Seoul',                  value: '9' },
            { name: '[+10] (AEST) - Guam, Sydney, Melbourne',     value: '10' },
            { name: '[+12] (NZST) - Fiji, Auckland, Wellington',  value: '12' }
          )
        )
        .addStringOption((option) => option
          .setName("time")
          .setDescription("The hour of the day to send the question at.")
          .setRequired(true)
          .addChoices(
            { name: '00:00 / 12am',            value: '0' },
            { name: '01:00 / 1am',             value: '1' },
            { name: '02:00 / 2am',             value: '2' },
            { name: '03:00 / 3am',             value: '3' },
            { name: '04:00 / 4am',             value: '4' },
            { name: '05:00 / 5am',             value: '5' },
            { name: '06:00 / 6am',             value: '6' },
            { name: '07:00 / 7am',             value: '7' },
            { name: '08:00 / 8am',             value: '8' },
            { name: '09:00 / 9am',             value: '9' },
            { name: '10:00 / 10am',            value: '10' },
            { name: '11:00 / 11am',            value: '11' },
            { name: '12:00 / 12pm',            value: '12' },
            { name: '13:00 / 1pm',             value: '13' },
            { name: '14:00 / 2pm',             value: '14' },
            { name: '15:00 / 3pm',             value: '15' },
            { name: '16:00 / 4pm',             value: '16' },
            { name: '17:00 / 5pm',             value: '17' },
            { name: '18:00 / 6pm',             value: '18' },
            { name: '19:00 / 7pm',             value: '19' },
            { name: '20:00 / 8pm',             value: '20' },
            { name: '21:00 / 9pm',             value: '21' },
            { name: '22:00 / 10pm',            value: '22' },
            { name: '23:00 / 11pm',            value: '23' }
          )
        )
        .addStringOption((option) => option
          .setName("daylight-saving")
          .setDescription("Observe daylight saving time?")
          // .setRequired(true)
          .addChoices(
            { name: 'Ignore daylight savings',  value: '0' },
            { name: 'Observe daylight savings', value: '1' }
          )
        )
      )
    )
    .setDefaultMemberPermissions(Discord.PermissionFlagsBits.ManageGuild),

  async execute(client: Discord.Client<true>, interaction: Discord.ChatInputCommandInteraction) {
    validateCommandInteractionInGuild(interaction);
    let dGuild = await findGuild(interaction.guild.id);

    switch (interaction.options.getSubcommandGroup() || interaction.options.getSubcommand()) {
      case `current`:
        const embCurrent = new Discord.EmbedBuilder()
          .setColor(colors.success)
          .setTitle(`${emojis.config} - Current Configuration`)
          .setDescription(
            `Questions are sent in <#${dGuild.questionChannelID}> everyday at ` +
            `**${dGuild.questionSentAtLocalHour !== null && dGuild.questionSentAtLocalHour !== undefined ? `${dGuild.questionSentAtLocalHour}:00` : '_Not set_'}** ` +
            `in timezone **${timezoneMap.get(dGuild.guildTimezoneIdentifier?.toString())?.label || '_Not set_'}**. ` +
            `Daylight saving time is **${dGuild.guildObservesDaylightSavings ? 'observed' : 'not observed'}**.`
          )
          .setFooter({ text: `Use /config set to change settings.` });

        await interaction.reply({ embeds: [embCurrent] });
        break;
      case `set`:
        switch (interaction.options.getSubcommand()) {
          case `qotd-channel`:
            let qotdChannel = interaction.options.getChannel("channel", true);
            validateGuildTextChannel(qotdChannel);

            if (!qotdChannel) {
              throw new Error("Invalid channel provided.");
            }

            dGuild.questionChannelID = qotdChannel.id;
            await dGuild.save();

            const embChannelSet = new Discord.EmbedBuilder()
              .setColor(colors.success)
              .setTitle(`${emojis.checkmark} - Got it!`)
              .setDescription(
                `Quidbot will now ask the question of the day in <#${qotdChannel.id}>.` + 
                `Make sure it has permissions to send messages there!`
              );

            await interaction.reply({ embeds: [embChannelSet] });
            break;

          case `time`:
            let timezoneOption = interaction.options.getString("timezone", true);
            let timeOption = interaction.options.getString("time", true);
            let dstOption = interaction.options.getString("daylight-saving");

            const timezoneLookup = timezoneMap.get(timezoneOption);
            if (!timezoneLookup) {
              throw new Error("Invalid timezone provided.");
            }

            let timezone: string;
            let dstEmbedDescription: string;

            if (!dstOption) {
              timezone = timezoneLookup.withoutDst;
              dstOption = '0';
              dstEmbedDescription = 'ignored by default';
            } else {
              timezone = dstOption === '1' && timezoneLookup.withDst
                ? timezoneLookup.withDst
                : timezoneLookup.withoutDst;
              dstEmbedDescription = dstOption === '1' ? 'observed' : 'ignored';

              if (dstOption === '1' && !timezoneLookup.withDst) {
                dstOption = '0';
                timezone = timezoneLookup.withoutDst;
                dstEmbedDescription = 'is ignored because this timezone does not observe it';
              }
            }

            dGuild.guildTimezoneIdentifier = timezoneOption;
            dGuild.guildObservesDaylightSavings = dstOption === '1' ? true : false;
            dGuild.questionSentAtTimezone = timezone;
            dGuild.questionSentAtLocalHour = parseInt(timeOption, 10);
            dGuild.questionNextScheduledAt = computeNextScheduledAtUtcIso(timezone, parseInt(timeOption, 10));
            await dGuild.save();

            const embTimeSet = new Discord.EmbedBuilder()
              .setColor(colors.success)
              .setTitle(`${emojis.checkmark} - Got it!`)
              .setDescription(
                `Quidbot will now ask the question of the day at **${timeOption}:00** in timezone **${timezoneLookup.label}**. ` + 
                `Daylight saving time is **${dstEmbedDescription}**.`
              );

            await interaction.reply({ embeds: [embTimeSet] });
            break;
          default:
            throw new Error("Invalid subcommand.");
      }
    }
  }
}