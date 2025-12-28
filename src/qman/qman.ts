import cron from "node-cron";
import pLimit from "p-limit";
import { Client } from "discord.js";
import { DateTime } from "luxon";
import { Op } from "sequelize";
import { Guild } from "../util/database/models/Guild";
import { computeNextScheduledAtUtcIso, shouldSendNow } from "./qmanScheduler";
import { sendQotdToGuild } from "./qmanSender";
import { Question } from "../util/database/models/Question";

const limit = pLimit(8);
let runCount = 0;

export function startQman(client: Client) {
  console.log("[QMAN] Starting...");
  cron.schedule("*/5 * * * *", async () => {  // once every 5 minutes
    console.log(`[QMAN] Running scheduler at ${new Date().toISOString()}, run ${runCount++}`);
    const nowUtc = DateTime.utc();
    const nowIso = nowUtc.toISO();

    // get guilds that need scheduling (null) or are due (nowIso)
    // Op is operation (check sequelize docs)
    const guilds = await Guild.findAll({
      where: {
        [Op.or]: [
          { questionNextScheduledAt: { [Op.is]:   null    }},
          { questionNextScheduledAt: { [Op.lte]:  nowIso  }},
        ],
      },
    });

    console.log(guilds, nowIso);

    const questions = await Question.findAll();
    const question = questions[Math.floor(Math.random() * questions.length)].questionText;

    console.log(`[QMAN] Sent question ${question}`);

    const tasks = guilds.map((guild) =>
      limit(async () => {
        const timezone = guild.questionSentAtTimezone;
        const localHour = guild.questionSentAtLocalHour;

        // no invalid configs
        if (!timezone) return;
        if (localHour === null || localHour === undefined) return;
        if (localHour < 0 || localHour > 23) return;

        // init schedule if missing
        if (!guild.questionNextScheduledAt) {
          guild.questionNextScheduledAt = computeNextScheduledAtUtcIso(timezone, localHour, nowUtc);
          await guild.save();
          return;
        }

        if (!shouldSendNow(timezone, guild.questionNextScheduledAt, guild.questionLastSentAt, nowUtc)) {
          return;
        }

        await sendQotdToGuild(client, guild, question);

        guild.questionLastSentAt = nowUtc.toISO();
        guild.questionNextScheduledAt = computeNextScheduledAtUtcIso(timezone, localHour, nowUtc);
        await guild.save();
      })
    );

    await Promise.allSettled(tasks);
  });
}