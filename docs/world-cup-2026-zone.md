# 2026 FIFA World Cup Zone

This document turns the FIFA World Cup refresh into a product contract for Sports AI Hub and this repository. The zone stays source-backed: live coverage uses fields available in `visualizations/source-data.json`, while advanced football analysis appears as assistant-tool lanes until richer event or tracking feeds are connected.

## Live Update Stream

The live update stream is the compact, repeatable contract for the homepage ticker, README visualization, and Match Center route.

- Cadence: every 3 hours during match windows.
- Source: ESPN FIFA World Cup scoreboard API, with FIFA schedule and tournament pages as official reference links.
- Current fields: `date`, `match`, `group`, `venue`, `status`, `score`, and `insight`.
- Consumers: Sports AI Hub, README visualization, and Match Center route.
- Last verification field: `fifaWorldCup.updateStream.lastVerifiedAt`.

The stream should not claim unavailable fields such as scorers, lineups, xG, substitutions, or win probability unless a future upstream source publishes them and tests are added for that contract.

## Matchday Zones

The zone is split into four reader-facing surfaces.

- `live-strip`: compact score, final-count, live-match, and next-fixture state for the top of a page.
- `match-center`: fixture cards, source provenance, and state-aware score display for live match windows.
- `analyst-workbench`: deeper builder paths using live-data, match-intelligence, xg-and-shot-quality, video-and-vision, scouting-and-reports, and media-and-localization lanes.
- `contributor-backlog`: small open-source project ideas tied to the World Cup moment.

## Data Contract

`visualizations/source-data.json` is the handoff payload. Sports AI Hub should treat these keys as the stable contract:

- `fifaWorldCup.stats`: four summary cards for final results, live match, scheduled next, and tournament field.
- `fifaWorldCup.fixtureSummary`: a readable window summary for the live zone.
- `fifaWorldCup.updateStream`: cadence, current window, source, verification date, status, consumers, and field list.
- `fifaWorldCup.matchdayZones`: product surfaces and expected outputs.
- `fifaWorldCup.toolkit`: assistant lanes and concrete tools for builder navigation.
- `fifaWorldCup.confirmedFixtures`: normalized fixture cards.

## Match Center Integration

The Match Center should render only source-backed fields by default. A practical page order is:

1. Live strip from `stats`, `fixtureSummary`, and `updateStream`.
2. Fixture cards from `confirmedFixtures`.
3. Tool lanes from `toolkit` for builders who want to create analysis or media workflows.
4. Source notes from `links` and `visualizations/README.md`.

Advanced match tools can link from the page, but they should be visually separated from live-score facts unless the feed supplies the required inputs.

## Operations Checklist

- Run `node scripts/sync-fifa-world-cup.mjs` to refresh the scoreboard window.
- Run `node scripts/generate-visualizations.mjs` to rebuild SVG assets.
- Run `node --test scripts/*.test.mjs` before publishing.
- Confirm `fifaWorldCup.updateStream.lastVerifiedAt` matches the sync date.
- Confirm the SVG and README point to `docs/world-cup-2026-toolkit.md` for assistant tooling.
