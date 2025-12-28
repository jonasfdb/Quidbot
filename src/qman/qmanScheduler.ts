import { DateTime } from "luxon";

export function parseUtcIso(iso: string | null | undefined): DateTime | null {
  if (!iso) return null;
  const dt = DateTime.fromISO(iso, { zone: "utc" });
  return dt.isValid ? dt : null;
}

// calculates next scheduled time to send a QOTD as iso string
export function computeNextScheduledAtUtcIso(
  timezone: string,
  localHour: number,
  nowUtc: DateTime = DateTime.utc()
): string | null {
  const nowLocal = nowUtc.setZone(timezone);

  // candidate of time to send a QOTD at (builds today at hour:00 in server timezone)
  let candidate = DateTime.fromObject(
    {
      year: nowLocal.year,
      month: nowLocal.month,
      day: nowLocal.day,
      hour: localHour,
      minute: 0,
      second: 0,
      millisecond: 0,
    },
    { zone: timezone }
  );

  // daylight savings must perish and is handled here
  if (!candidate.isValid) {
    let probe = candidate;
    for (let i = 0; i < 6 && !probe.isValid; i++) {
      probe = probe.plus({ hours: 1 });
    }
    candidate = probe.isValid
      ? probe
      : nowLocal.plus({ days: 1 }).startOf("day").plus({ hours: localHour });
  }

  if (candidate <= nowLocal) {
    candidate = candidate.plus({ days: 1 });
  }

  return candidate.toUTC().toISO();
}

export function shouldSendNow(
  timezone: string,
  nextScheduledAtUtcIso: string | null | undefined,
  lastSentAtUtcIso: string | null | undefined,
  nowUtc: DateTime = DateTime.utc()
): boolean {
  const next = parseUtcIso(nextScheduledAtUtcIso);
  const last = parseUtcIso(lastSentAtUtcIso);

  const nowLocal = nowUtc.setZone(timezone);
  const todayLocal = nowLocal.toISODate(); // YYYY-MM-DD

  const lastSentLocalDate = last ? last.setZone(timezone).toISODate() : null;

  const due = next ? nowUtc >= next : true; // its due if missing
  const alreadySentToday = lastSentLocalDate === todayLocal;

  return due && !alreadySentToday;
}