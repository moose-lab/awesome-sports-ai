# Visualizations

Generated event visuals used by the main README.

## Assets

- Direct tags: [NBA Finals 2026: Knicks Champions](nba-finals-2026.svg) · [FIFA World Cup 2026](fifa-world-cup-2026.svg)
- [nba-finals-2026.svg](nba-finals-2026.svg) - NBA Finals championship snapshot with team stamps, win seals, margin labels, and game-by-game context.
- [fifa-world-cup-2026.svg](fifa-world-cup-2026.svg) - FIFA World Cup 2026 live group-stage snapshot with final scores, in-progress status, upcoming fixtures, update-stream status, and assistant toolkit lanes.
- [source-data.json](source-data.json) - Structured data used to generate the SVG assets and feed the World Cup zone contract.

## Regenerate

```bash
node scripts/generate-visualizations.mjs
```

## FIFA World Cup Sync

The FIFA World Cup snapshot can be refreshed locally:

```bash
node scripts/sync-fifa-world-cup.mjs
node scripts/generate-visualizations.mjs
node --test scripts/*.test.mjs
```

The remote repository also has a scheduled workflow at `.github/workflows/sync-fifa-world-cup.yml`.
It runs every three hours with `17 */3 * * *` UTC, can be started manually with
`workflow_dispatch`, and commits generated visualization changes only when the sync changes
`visualizations/source-data.json` or generated SVG assets.

## FIFA World Cup Zone Contract

The FIFA payload also powers [the World Cup zone](../docs/world-cup-2026-zone.md) and [assistant toolkit](../docs/world-cup-2026-toolkit.md).

- `fifaWorldCup.updateStream` defines cadence, source, current window, status, consumers, and exported fields for the live update stream.
- `fifaWorldCup.matchdayZones` maps the product surfaces: live strip, Match Center, analyst workbench, and contributor backlog.
- `fifaWorldCup.toolkit` lists matchday assistant lanes for live data, match intelligence, xG, video review, scouting, and localization.
- `fifaWorldCup.confirmedFixtures` remains the source-backed fixture list rendered into the SVG.

## Sources

- NBA Finals hub: https://www.nba.com/playoffs/2026/nba-finals
- NBA Stats: https://www.nba.com/stats
- FIFA match schedule: https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/match-schedule-fixtures-results-teams-stadiums
- FIFA tournament hub: https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026
- ESPN scoreboard API: https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=YYYYMMDD
