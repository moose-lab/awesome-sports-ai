# 2026 FIFA World Cup Zone

This document turns the FIFA World Cup refresh into a source-backed contract for Sports AI Hub and this repository. The README should frame World Cup 2026 as a knockout-stage toolkit for developers and tool users, not as a group-stage SVG showcase.

## Knockout Format

The 2026 tournament uses a 48-team group phase followed by a 32-team single-elimination bracket. The knockout workflow should support:

- Round of 32
- Round of 16
- Quarterfinals
- Semifinals
- Third-place match
- Final

Treat the bracket as an operating surface for tools: source-backed score state first, then assistant-tool lanes for commentary, xG, video review, scouting, and media.

## Knockout Update Stream

The knockout update stream is the compact, repeatable contract for Sports AI Hub and Match Center surfaces.

- Cadence: every 5 minutes during tournament windows.
- Source: ESPN FIFA World Cup scoreboard API, with FIFA schedule and tournament pages as official reference links.
- Current fields: `date`, `match`, `round`, `venue`, `status`, `score`, and `insight`.
- Consumers: Sports AI Hub, Knockout tool map, and Match Center route.
- Last verification field: `fifaWorldCup.updateStream.lastVerifiedAt`.

The stream should not claim unavailable fields such as scorers, lineups, xG, substitutions, or win probability unless a future upstream source publishes them and tests are added for that contract.

## Matchday Zones

The zone is split into four reader-facing surfaces.

- `knockout-scoreboard`: source-backed score state, round labels, venue context, and provenance.
- `bracket-and-match-center`: bracket-ready fixture cards, elimination context, score states, and source provenance.
- `analyst-workbench`: deeper builder paths using knockout-data, bracket-and-scenarios, match-intelligence, xg-and-shot-quality, video-and-vision, scouting-and-reports, and media-and-localization lanes.
- `contributor-backlog`: small open-source project ideas tied to the World Cup moment.

## Data Contract

[`visualizations/source-data.json`](../visualizations/source-data.json) is the handoff payload. Sports AI Hub should treat these keys as the stable contract:

- `fifaWorldCup.knockoutFormat`: stage order and single-elimination tournament model.
- `fifaWorldCup.stats`: summary cards for knockout field, format, next stage, and tournament field.
- `fifaWorldCup.fixtureSummary`: a readable window summary for the knockout tool contract.
- `fifaWorldCup.updateStream`: cadence, current window, source, verification date, status, consumers, and field list.
- `fifaWorldCup.matchdayZones`: product surfaces and expected outputs.
- `fifaWorldCup.toolkit`: assistant lanes and concrete tools for builder navigation.
- `fifaWorldCup.confirmedFixtures`: normalized source-backed fixture cards.

## Match Center Integration

The Match Center should render only source-backed fields by default. A practical page order is:

1. Knockout scoreboard from `stats`, `fixtureSummary`, and `updateStream`.
2. Bracket-ready fixture cards from `confirmedFixtures`.
3. Tool lanes from `toolkit` for builders who want to create analysis or media workflows.
4. Source notes from `links` and `visualizations/README.md`.

Advanced match tools can link from the page, but they should be visually separated from live-score facts unless the feed supplies the required inputs.

## Operations Checklist

- Run `node scripts/sync-fifa-world-cup.mjs` to refresh the scoreboard window.
- Run `node scripts/generate-visualizations.mjs` to remove stale World Cup SVG output and rebuild remaining visualization assets.
- Run `node --test scripts/*.test.mjs` before publishing.
- Confirm `fifaWorldCup.updateStream.lastVerifiedAt` matches the sync date.
- Confirm README points to `docs/world-cup-2026-toolkit.md` for knockout-stage assistant tooling.
