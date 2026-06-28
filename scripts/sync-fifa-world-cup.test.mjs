import assert from "node:assert/strict";
import test from "node:test";

import {
  buildDateWindow,
  isWithinTournamentWindow,
  normalizeScoreboardEvents,
  syncSourceData,
} from "./sync-fifa-world-cup.mjs";

const event = ({
  id,
  date,
  homeName,
  homeAbbr,
  homeScore = "0",
  awayName,
  awayAbbr,
  awayScore = "0",
  state,
  completed = false,
  shortDetail,
  venue,
  city,
  group,
}) => ({
  id,
  date,
  competitions: [
    {
      altGameNote: `FIFA World Cup, ${group}`,
      venue: {
        fullName: venue,
        address: {
          city,
        },
      },
      status: {
        type: {
          state,
          completed,
          shortDetail,
        },
      },
      competitors: [
        {
          homeAway: "home",
          score: homeScore,
          team: {
            abbreviation: homeAbbr,
            displayName: homeName,
          },
        },
        {
          homeAway: "away",
          score: awayScore,
          team: {
            abbreviation: awayAbbr,
            displayName: awayName,
          },
        },
      ],
    },
  ],
});

const scoreboard = {
  events: [
    event({
      id: "760422",
      date: "2026-06-14T17:00:00Z",
      homeName: "Germany",
      homeAbbr: "GER",
      homeScore: "7",
      awayName: "Curaçao",
      awayAbbr: "CUW",
      awayScore: "1",
      state: "post",
      completed: true,
      shortDetail: "FT",
      venue: "NRG Stadium",
      city: "Houston, Texas",
      group: "Group E",
    }),
    event({
      id: "760424",
      date: "2026-06-15T02:00:00Z",
      homeName: "Sweden",
      homeAbbr: "SWE",
      homeScore: "2",
      awayName: "Tunisia",
      awayAbbr: "TUN",
      awayScore: "0",
      state: "in",
      shortDetail: "37'",
      venue: "Estadio BBVA",
      city: "Guadalupe",
      group: "Group F",
    }),
    event({
      id: "760428",
      date: "2026-06-15T16:00:00Z",
      homeName: "Spain",
      homeAbbr: "ESP",
      awayName: "Cape Verde",
      awayAbbr: "CPV",
      state: "pre",
      shortDetail: "Scheduled",
      venue: "Mercedes-Benz Stadium",
      city: "Atlanta, Georgia",
      group: "Group H",
    }),
  ],
};

const sourceData = {
  generatedDate: "2026-06-14",
  nbaFinals: {
    title: "NBA Finals 2026: Knicks Champions",
    updated: "Updated June 14, 2026",
  },
  fifaWorldCup: {
    title: "FIFA World Cup 2026",
    subtitle: "Canada, Mexico, United States",
    updated: "Updated June 14, 2026",
    links: [],
    stats: [],
    fixtureSummary: {
      label: "Knockout-stage tool contract",
      window: "Round of 32",
      detail: "Old detail",
    },
    updateStream: {
      label: "Knockout update stream",
      cadence: "Every 5 minutes during the tournament window",
      currentWindow: "Round of 32",
      source: "ESPN FIFA World Cup scoreboard API",
      lastVerifiedAt: "2026-06-14",
      status: "Pending refresh",
      consumers: ["Sports AI Hub", "Knockout tool map", "Match Center route"],
    },
    confirmedFixtures: [
      {
        date: "Jun 14",
        match: "Germany v Curacao",
        group: "Group E",
        venue: "Houston Stadium",
        tag: "Group E",
        status: "Scheduled",
        score: "1 p.m. ET",
        insight: "Houston",
      },
      {
        date: "Jun 15",
        match: "Spain v Cabo Verde",
        group: "Group H",
        venue: "Mercedes-Benz Stadium",
        tag: "Group H",
        status: "Scheduled",
        score: "12 p.m. ET",
        insight: "Atlanta",
      },
    ],
    milestones: [],
  },
};

test("buildDateWindow covers the stale-live catch-up window in UTC", () => {
  assert.deepEqual(buildDateWindow(new Date("2026-06-15T05:00:00Z")), [
    "20260613",
    "20260614",
    "20260615",
    "20260616",
  ]);
});

test("normalizes ESPN scoreboard events into FIFA source-data fixtures", () => {
  const fixtures = normalizeScoreboardEvents([scoreboard]);

  assert.deepEqual(fixtures.map((fixture) => fixture.match), [
    "Germany v Curacao",
    "Sweden v Tunisia",
    "Spain v Cabo Verde",
  ]);
  assert.deepEqual(fixtures.map((fixture) => fixture.status), ["Final", "Live", "Scheduled"]);
  assert.equal(fixtures[0].score, "GER 7 - CUW 1");
  assert.equal(fixtures[1].date, "Jun 14");
  assert.equal(fixtures[1].score, "SWE 2 - TUN 0");
  assert.equal(fixtures[2].score, "12 p.m. ET");
  assert.equal(fixtures[2].venue, "Mercedes-Benz Stadium");
});

test("syncSourceData updates only the FIFA snapshot and preserves NBA data", () => {
  const { data, changed } = syncSourceData(sourceData, [scoreboard], {
    now: new Date("2026-06-15T05:00:00Z"),
  });

  assert.equal(changed, true);
  assert.equal(data.generatedDate, "2026-06-15");
  assert.deepEqual(data.nbaFinals, sourceData.nbaFinals);
  assert.equal(data.fifaWorldCup.updated, "Updated June 15, 2026");
  assert.deepEqual(data.fifaWorldCup.stats, [
    {
      label: "Final results",
      value: "1",
    },
    {
      label: "Live match",
      value: "SWE 2-0",
    },
    {
      label: "Scheduled next",
      value: "1",
    },
    {
      label: "Tournament field",
      value: "48 teams",
    },
  ]);
  assert.match(data.fifaWorldCup.fixtureSummary.detail, /One match is final/);
  assert.match(data.fifaWorldCup.fixtureSummary.detail, /Sweden leads Tunisia 2-0 live/);
  assert.match(data.fifaWorldCup.fixtureSummary.detail, /one fixture is scheduled next/);
  assert.equal(data.fifaWorldCup.updateStream.currentWindow, "Jun 14-15");
  assert.equal(data.fifaWorldCup.updateStream.lastVerifiedAt, "2026-06-15");
  assert.equal(data.fifaWorldCup.updateStream.status, "Live coverage active");
});

test("syncSourceData describes away-leading live matches correctly", () => {
  const awayLeadingScoreboard = {
    events: [
      event({
        id: "760499",
        date: "2026-06-25T22:00:00Z",
        homeName: "Czechia",
        homeAbbr: "CZE",
        homeScore: "0",
        awayName: "Mexico",
        awayAbbr: "MEX",
        awayScore: "3",
        state: "in",
        shortDetail: "63'",
        venue: "Mexico City Stadium",
        city: "Mexico City",
        group: "Group A",
      }),
    ],
  };

  const { data } = syncSourceData(
    {
      ...sourceData,
      fifaWorldCup: {
        ...sourceData.fifaWorldCup,
        confirmedFixtures: [],
      },
    },
    [awayLeadingScoreboard],
    {
      now: new Date("2026-06-25T23:00:00Z"),
    }
  );

  assert.match(data.fifaWorldCup.fixtureSummary.detail, /Mexico leads Czechia 3-0 live/);
});

test("syncSourceData describes tied live matches correctly", () => {
  const tiedScoreboard = {
    events: [
      event({
        id: "760500",
        date: "2026-06-25T20:00:00Z",
        homeName: "Morocco",
        homeAbbr: "MAR",
        homeScore: "1",
        awayName: "Haiti",
        awayAbbr: "HAI",
        awayScore: "1",
        state: "in",
        shortDetail: "52'",
        venue: "MetLife Stadium",
        city: "East Rutherford",
        group: "Group C",
      }),
    ],
  };

  const { data } = syncSourceData(
    {
      ...sourceData,
      fifaWorldCup: {
        ...sourceData.fifaWorldCup,
        confirmedFixtures: [],
      },
    },
    [tiedScoreboard],
    {
      now: new Date("2026-06-25T21:00:00Z"),
    }
  );

  assert.match(data.fifaWorldCup.fixtureSummary.detail, /Morocco and Haiti are tied 1-1 live/);
});

test("syncSourceData is idempotent for the same scoreboard payload", () => {
  const first = syncSourceData(sourceData, [scoreboard], {
    now: new Date("2026-06-15T05:00:00Z"),
  });
  const second = syncSourceData(first.data, [scoreboard], {
    now: new Date("2026-06-15T05:00:00Z"),
  });

  assert.equal(second.changed, false);
  assert.deepEqual(second.data, first.data);
});

test("isWithinTournamentWindow is true during the tournament", () => {
  assert.equal(isWithinTournamentWindow(new Date("2026-06-25T12:00:00Z")), true);
  assert.equal(isWithinTournamentWindow(new Date("2026-06-11T00:00:00Z")), true);
  assert.equal(isWithinTournamentWindow(new Date("2026-07-19T20:00:00Z")), true);
});

test("isWithinTournamentWindow is false outside the tournament", () => {
  assert.equal(isWithinTournamentWindow(new Date("2026-05-01T12:00:00Z")), false);
  assert.equal(isWithinTournamentWindow(new Date("2026-08-01T12:00:00Z")), false);
});
