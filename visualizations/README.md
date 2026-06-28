# Visualizations

Generated visual assets and source data used by this repository.

## Assets

- [nba-finals-2026.svg](nba-finals-2026.svg) - NBA Finals championship snapshot with team stamps, win seals, margin labels, and game-by-game context.
- [source-data.json](source-data.json) - Structured data used to generate remaining SVG assets and feed the World Cup knockout toolkit contract.

## Regenerate

```bash
node scripts/generate-visualizations.mjs
```

## FIFA World Cup Sync

The FIFA World Cup source data can be refreshed locally:

```bash
node scripts/sync-fifa-world-cup.mjs
node scripts/generate-visualizations.mjs
node --test scripts/*.test.mjs
```

The remote repository also has a scheduled workflow at `.github/workflows/sync-fifa-world-cup.yml`.
It runs every three hours with `17 */3 * * *` UTC, can be started manually with
`workflow_dispatch`, and commits generated changes only when the sync changes
`visualizations/source-data.json` or remaining generated SVG assets.

## FIFA World Cup Zone Contract

The FIFA payload also powers [the World Cup zone](../docs/world-cup-2026-zone.md) and [assistant toolkit](../docs/world-cup-2026-toolkit.md).

- `fifaWorldCup.knockoutFormat` defines the 32-team single-elimination stage order from Round of 32 through the Final.
- `fifaWorldCup.updateStream` defines cadence, source, current window, status, consumers, and exported fields for the knockout update stream.
- `fifaWorldCup.matchdayZones` maps the product surfaces: knockout scoreboard, bracket and Match Center, analyst workbench, and contributor backlog.
- `fifaWorldCup.toolkit` lists assistant lanes for knockout data, bracket scenarios, match intelligence, xG, video review, scouting, and localization.
- `fifaWorldCup.confirmedFixtures` remains the source-backed fixture list for downstream consumers.

## Sources

- NBA Finals hub: https://www.nba.com/playoffs/2026/nba-finals
- NBA Stats: https://www.nba.com/stats
- FIFA match schedule: https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/match-schedule-fixtures-results-teams-stadiums
- FIFA tournament hub: https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026
- ESPN scoreboard API: https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=YYYYMMDD
