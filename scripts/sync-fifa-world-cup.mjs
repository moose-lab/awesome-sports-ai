import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dataPath = join(root, "visualizations", "source-data.json");
const scoreboardBaseUrl = "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard";
const easternTimeZone = "America/New_York";

const clone = (value) => JSON.parse(JSON.stringify(value));

const formatJson = (value) => `${JSON.stringify(value, null, 2)}\n`;

const addUtcDays = (date, days) =>
  new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + days));

const formatApiDate = (date) =>
  `${date.getUTCFullYear()}${String(date.getUTCMonth() + 1).padStart(2, "0")}${String(date.getUTCDate()).padStart(2, "0")}`;

const formatGeneratedDate = (date) =>
  `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;

// Tournament window with a small margin around the Jun 11 opener and Jul 19 final.
export const isWithinTournamentWindow = (now = new Date()) => {
  const t = now.getTime();
  const start = Date.UTC(2026, 5, 10, 0, 0, 0); // Jun 10, 2026 UTC
  const end = Date.UTC(2026, 6, 20, 23, 59, 59); // Jul 20, 2026 UTC
  return t >= start && t <= end;
};

const formatLongDate = (date) =>
  new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);

const formatFixtureDate = (date) =>
  new Intl.DateTimeFormat("en-US", {
    timeZone: easternTimeZone,
    month: "short",
    day: "numeric",
  }).format(date);

const formatEasternKickoff = (date) => {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: easternTimeZone,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
      .formatToParts(date)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value])
  );
  const dayPeriod = parts.dayPeriod.toLowerCase() === "am" ? "a.m." : "p.m.";
  const minute = parts.minute === "00" ? "" : `:${parts.minute}`;
  return `${parts.hour}${minute} ${dayPeriod} ET`;
};

const stripDiacritics = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const normalizeTeamName = (value) => {
  const ascii = stripDiacritics(value);
  const replacements = {
    "Cape Verde": "Cabo Verde",
    "Ivory Coast": "Cote d'Ivoire",
  };
  return replacements[ascii] ?? ascii;
};

const venueCity = (competition) => {
  const city = competition.venue?.address?.city ?? "";
  return city.split(",")[0] || competition.venue?.fullName || "TBD";
};

const groupFromNote = (competition) => {
  const note = competition.altGameNote ?? "";
  const match = note.match(/Group [A-L]/);
  return match?.[0] ?? "Group stage";
};

const statusFromCompetition = (competition) => {
  const type = competition.status?.type ?? {};
  if (type.completed || type.state === "post") {
    return "Final";
  }
  if (type.state === "in") {
    return "Live";
  }
  return "Scheduled";
};

const scoreForFixture = (status, home, away, eventDate) => {
  if (status === "Scheduled") {
    return formatEasternKickoff(eventDate);
  }
  return `${home.team.abbreviation} ${home.score ?? "0"} - ${away.team.abbreviation} ${away.score ?? "0"}`;
};

const normalizeFixtureMatch = (match) => match.split(" v ").map(normalizeTeamName).join(" v ");

const fixtureKey = (fixture) => normalizeFixtureMatch(fixture.match);

const sortableDate = (fixture) => {
  if (fixture.sortKey) {
    return fixture.sortKey;
  }
  const match = fixture.date.match(/^([A-Z][a-z]{2}) (\d{1,2})$/);
  if (!match) {
    return "9999-12-31T00:00:00.000Z";
  }
  const monthIndex = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  }[match[1]];
  return new Date(Date.UTC(2026, monthIndex, Number(match[2]))).toISOString();
};

const publicFixture = (fixture) => {
  const { sortKey, ...rest } = fixture;
  return rest;
};

const plural = (count, singular, pluralForm = `${singular}s`) =>
  count === 1 ? `one ${singular}` : `${count} ${pluralForm}`;

const beVerb = (count) => (count === 1 ? "is" : "are");

const liveScoreValue = (fixture) => {
  if (!fixture) {
    return "None";
  }
  const match = fixture.score.match(/^([A-Z]{2,4}) (\d+) - [A-Z]{2,4} (\d+)$/);
  if (!match) {
    return fixture.score;
  }
  return `${match[1]} ${match[2]}-${match[3]}`;
};

const liveSummary = (fixture) => {
  if (!fixture) {
    return "no match is live";
  }
  const [home, away] = fixture.match.split(" v ");
  const score = fixture.score.match(/^[A-Z]{2,4} (\d+) - [A-Z]{2,4} (\d+)$/);
  if (!score) {
    return `${fixture.match} is live`;
  }
  const homeScore = Number(score[1]);
  const awayScore = Number(score[2]);
  if (homeScore === awayScore) {
    return `${home} and ${away} are tied ${homeScore}-${awayScore} live`;
  }
  if (homeScore > awayScore) {
    return `${home} leads ${away} ${homeScore}-${awayScore} live`;
  }
  return `${away} leads ${home} ${awayScore}-${homeScore} live`;
};

export const buildDateWindow = (now = new Date()) => [
  formatApiDate(addUtcDays(now, -2)),
  formatApiDate(addUtcDays(now, -1)),
  formatApiDate(addUtcDays(now, 0)),
  formatApiDate(addUtcDays(now, 1)),
];

export const normalizeScoreboardEvents = (scoreboards) =>
  scoreboards
    .flatMap((scoreboard) => scoreboard.events ?? [])
    .map((event) => {
      const competition = event.competitions?.[0];
      if (!competition) {
        return null;
      }
      const home = competition.competitors?.find((competitor) => competitor.homeAway === "home");
      const away = competition.competitors?.find((competitor) => competitor.homeAway === "away");
      if (!home || !away) {
        return null;
      }

      const eventDate = new Date(event.date);
      const status = statusFromCompetition(competition);
      const group = groupFromNote(competition);

      return {
        date: formatFixtureDate(eventDate),
        match: `${normalizeTeamName(home.team.displayName)} v ${normalizeTeamName(away.team.displayName)}`,
        group,
        venue: competition.venue?.fullName ?? "TBD",
        tag: group,
        status,
        score: scoreForFixture(status, home, away, eventDate),
        insight: status === "Scheduled" ? venueCity(competition) : status === "Live" ? "Live window" : "Full time",
        sortKey: eventDate.toISOString(),
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.sortKey.localeCompare(b.sortKey))
    .map(publicFixture);

const mergeFixtures = (existingFixtures, incomingFixtures) => {
  const fixturesByKey = new Map();

  existingFixtures.forEach((fixture, index) => {
    fixturesByKey.set(fixtureKey(fixture), {
      ...fixture,
      sortKey: sortableDate(fixture),
      originalIndex: index,
    });
  });

  incomingFixtures.forEach((fixture) => {
    const existing = fixturesByKey.get(fixtureKey(fixture));
    fixturesByKey.set(fixtureKey(fixture), {
      ...existing,
      ...fixture,
      tag: existing?.tag && existing.tag !== existing.group ? existing.tag : fixture.tag,
      sortKey: sortableDate(fixture),
      originalIndex: existing?.originalIndex ?? existingFixtures.length,
    });
  });

  return Array.from(fixturesByKey.values())
    .sort((a, b) => a.sortKey.localeCompare(b.sortKey) || a.originalIndex - b.originalIndex)
    .map(({ originalIndex, ...fixture }) => publicFixture(fixture));
};

const usesKnockoutStats = (stats) =>
  Array.isArray(stats) && stats.some((stat) => stat.label === "Knockout field");

const buildStats = (existingStats, fixtures) => {
  if (usesKnockoutStats(existingStats)) {
    return existingStats;
  }

  const finalCount = fixtures.filter((fixture) => fixture.status === "Final").length;
  const liveFixture = fixtures.find((fixture) => fixture.status === "Live");
  const scheduledCount = fixtures.filter((fixture) => fixture.status === "Scheduled").length;

  return [
    {
      label: "Final results",
      value: String(finalCount),
    },
    {
      label: "Live match",
      value: liveScoreValue(liveFixture),
    },
    {
      label: "Scheduled next",
      value: String(scheduledCount),
    },
    {
      label: "Tournament field",
      value: "48 teams",
    },
  ];
};

const buildFixtureSummary = (existingSummary, fixtures) => {
  const finalCount = fixtures.filter((fixture) => fixture.status === "Final").length;
  const liveFixture = fixtures.find((fixture) => fixture.status === "Live");
  const scheduledCount = fixtures.filter((fixture) => fixture.status === "Scheduled").length;
  const firstDate = fixtures[0]?.date ?? "";
  const lastDate = fixtures.at(-1)?.date ?? firstDate;
  const finalPhrase = `${finalCount === 1 ? "One match is" : `${finalCount} matches are`} final`;
  const scheduledPhrase =
    scheduledCount === 0
      ? "no fixtures are scheduled next"
      : `${plural(scheduledCount, "fixture")} ${beVerb(scheduledCount)} scheduled next`;

  return {
    ...existingSummary,
    label: existingSummary?.label ?? "Knockout-stage tool contract",
    window:
      existingSummary?.label === "Knockout-stage tool contract" && existingSummary?.window
        ? existingSummary.window
        : firstDate === lastDate
          ? firstDate
          : `${firstDate}-${lastDate.replace(/^[A-Z][a-z]{2} /, "")}`,
    detail: `${finalPhrase}, ${liveSummary(liveFixture)}, and ${scheduledPhrase}.`,
  };
};

const streamStatus = (fixtures) => {
  if (fixtures.some((fixture) => fixture.status === "Live")) {
    return "Live coverage active";
  }
  if (fixtures.some((fixture) => fixture.status === "Scheduled")) {
    return "Pre-match coverage queued";
  }
  return "Post-match snapshot";
};

const buildUpdateStream = (existingStream, fixtures, fixtureSummary, now) => {
  if (!existingStream) {
    return undefined;
  }

  return {
    ...existingStream,
    currentWindow:
      existingStream.label === "Knockout update stream" && existingStream.currentWindow
        ? existingStream.currentWindow
        : fixtureSummary.window,
    lastVerifiedAt: formatGeneratedDate(now),
    status: streamStatus(fixtures),
  };
};

export const syncSourceData = (sourceData, scoreboards, options = {}) => {
  const now = options.now ?? new Date();
  const data = clone(sourceData);
  const incomingFixtures = normalizeScoreboardEvents(scoreboards);
  const fifaWorldCup = data.fifaWorldCup;
  const fixtures = mergeFixtures(fifaWorldCup.confirmedFixtures ?? [], incomingFixtures);
  const fixtureSummary = buildFixtureSummary(fifaWorldCup.fixtureSummary, fixtures);
  const updateStream = buildUpdateStream(fifaWorldCup.updateStream, fixtures, fixtureSummary, now);

  data.generatedDate = formatGeneratedDate(now);
  data.fifaWorldCup = {
    ...fifaWorldCup,
    updated: `Updated ${formatLongDate(now)}`,
    stats: buildStats(fifaWorldCup.stats, fixtures),
    fixtureSummary,
    ...(updateStream ? { updateStream } : {}),
    confirmedFixtures: fixtures,
  };

  return {
    data,
    changed: formatJson(data) !== formatJson(sourceData),
  };
};

export const fetchScoreboard = async (date, fetchImpl = globalThis.fetch) => {
  const url = `${scoreboardBaseUrl}?dates=${date}`;
  const response = await fetchImpl(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ESPN scoreboard ${date}: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

export const syncFifaWorldCupFile = async (options = {}) => {
  const now = options.now ?? new Date();
  const sourcePath = options.sourcePath ?? dataPath;
  const fetchImpl = options.fetchImpl ?? globalThis.fetch;
  const sourceText = readFileSync(sourcePath, "utf8");
  const sourceData = JSON.parse(sourceText);
  const scoreboards = await Promise.all(buildDateWindow(now).map((date) => fetchScoreboard(date, fetchImpl)));
  const result = syncSourceData(sourceData, scoreboards, { now });

  if (result.changed) {
    writeFileSync(sourcePath, formatJson(result.data));
  }

  return result;
};

const isCli = process.argv[1] === fileURLToPath(import.meta.url);

if (isCli) {
  if (!isWithinTournamentWindow(new Date())) {
    console.log("Outside FIFA World Cup window; skipping ESPN sync.");
  } else {
    syncFifaWorldCupFile()
      .then(({ changed }) => {
        console.log(changed ? "Updated visualizations/source-data.json" : "No FIFA World Cup data changes");
      })
      .catch((error) => {
        console.error(error);
        process.exitCode = 1;
      });
  }
}
