# Awesome Sports AI

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![License: CC0-1.0](https://img.shields.io/badge/License-CC0%201.0-lightgrey.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/moose-lab/awesome-sports-ai?style=social)](https://github.com/moose-lab/awesome-sports-ai/stargazers)

A curated collection of sports tools, platforms, datasets, APIs, and resources for people building, analyzing, coaching, operating, and covering sports.

This repository follows the [Awesome List](https://github.com/sindresorhus/awesome) style: entries should be useful, specific, actively reachable, and grouped into clear categories.

## Contents

- [Featured Now](#featured-now)
- [Enterprise-to-Open-Source Decomposition](#enterprise-to-open-source-decomposition)
- [The Builder's Path](#the-builders-path)
- [Data, APIs, and Feeds](#data-apis-and-feeds)
- [Analytics and Visualization](#analytics-and-visualization)
- [Training and Performance](#training-and-performance)
- [Team and League Operations](#team-and-league-operations)
- [Fan Experience and Community](#fan-experience-and-community)
- [Media, Highlights, and Content](#media-highlights-and-content)
- [Developer Tools](#developer-tools)
- [Datasets and Research](#datasets-and-research)
- [Other Sports Collections](#other-sports-collections)
- [Contributing](#contributing)
- [License](#license)

## Featured Now

Generated event visuals live in [visualizations/](visualizations/). Regenerate them with `node scripts/generate-visualizations.mjs`.

[![NBA Finals 2026 schedule and stats visualization](visualizations/nba-finals-2026.svg)](visualizations/nba-finals-2026.svg)

[![FIFA World Cup 2026 visualization](visualizations/fifa-world-cup-2026.svg)](visualizations/fifa-world-cup-2026.svg)

## Enterprise-to-Open-Source Decomposition

Professional sports teams use expensive AI, video, tracking, scouting, and athlete-performance systems that are hard for individual builders to access. This repository decomposes those enterprise capabilities into small mono-tools the open-source community can build.

See the [Enterprise-to-Open-Source Decomposition roadmap](docs/enterprise-to-open-source-decomposition.md) for the stack map and development roadmap.

## The Builder's Path

The magic is in the framing: this is not only a list of sports tools. It is a map for building the smaller pieces behind the tools professional teams use.

### Build Your Own xG Model

Want to build your own expected-goals model? Here are the mono-tools you need.

- `public-data-loader` - Load public shot event data into local files.
- `match-event-schema` - Normalize shots, assists, body part, period, and game-state fields.
- `shot-map-renderer` - Visualize shot locations and outcomes.
- `xg-baseline` - Train a simple xG model from distance, angle, body part, and situation.
- `model-card-md` - Document training data, assumptions, limitations, and evaluation results.

### Build Your Own Coaching Video Tagger

Want to build your own Sportscode-style review workflow? Here are the mono-tools you need.

- `clip-cutter` - Cut timestamp ranges from user-owned game footage.
- `event-tagger` - Add keyboard-driven event labels to video timestamps.
- `possession-timeline` - Render tagged possessions and phases of play.
- `coach-notes-exporter` - Export clips, tags, and notes to Markdown or CSV.
- `highlight-captioner` - Draft short labels for review clips.

### Build Your Own Player Scouting Board

Want to build your own lightweight scouting platform? Here are the mono-tools you need.

- `player-profile-schema` - Store player bio, role, position, club, and competition context.
- `public-data-loader` - Load open player and match data into a shared format.
- `player-similarity-radar` - Compare players with normalized role metrics.
- `searchable-clip-index` - Connect player notes to tagged video moments.
- `scouting-report-template` - Generate repeatable player reports for review.

### Build Your Own Athlete Load Dashboard

Want to build your own training-load monitor? Here are the mono-tools you need.

- `wearable-csv-parser` - Read athlete-owned GPS, heart-rate, or session-load files.
- `team-id-resolver` - Normalize athlete, team, and session identifiers.
- `acute-chronic-workload` - Calculate short-window vs long-window load ratios.
- `load-risk-flags` - Highlight spikes, drops, and unusual workload patterns.
- `training-load-dashboard` - Render weekly load, recovery, and trend charts.

### Build Your Own Match Intelligence Report

Want to build your own automated match report? Here are the mono-tools you need.

- `fixture-normalizer` - Convert schedule data into a shared match schema.
- `match-event-schema` - Normalize goals, shots, cards, substitutions, and possessions.
- `win-probability-lite` - Estimate match-state pressure from score, time, and venue.
- `stat-card-generator` - Generate SVG cards for key moments and player stats.
- `match-report-md` - Generate a readable Markdown report from events and summary metrics.

## Data, APIs, and Feeds

Tools and services for sports schedules, scores, fixtures, rosters, odds, play-by-play data, stats, and live feeds.

No entries yet. See [CONTRIBUTING.md](CONTRIBUTING.md) to add the first tool.

## Analytics and Visualization

Tools for scouting, performance analysis, dashboards, data visualization, modeling, and sports intelligence workflows.

No entries yet. See [CONTRIBUTING.md](CONTRIBUTING.md) to add the first tool.

## Training and Performance

Tools for coaching, athlete development, strength and conditioning, recovery, wellness, biomechanics, and wearable data.

No entries yet. See [CONTRIBUTING.md](CONTRIBUTING.md) to add the first tool.

## Team and League Operations

Tools for scheduling, registration, payments, tournament management, club administration, facilities, ticketing, and operations.

No entries yet. See [CONTRIBUTING.md](CONTRIBUTING.md) to add the first tool.

## Fan Experience and Community

Tools for communities, fantasy sports, fan engagement, memberships, loyalty, live events, and interactive experiences.

No entries yet. See [CONTRIBUTING.md](CONTRIBUTING.md) to add the first tool.

## Media, Highlights, and Content

Tools for sports video, clips, highlights, live production, graphics, social publishing, newsletters, podcasts, and editorial workflows.

No entries yet. See [CONTRIBUTING.md](CONTRIBUTING.md) to add the first tool.

## Developer Tools

Libraries, SDKs, open-source projects, frameworks, and infrastructure useful for sports technology builders.

- [TWZRD Agent Intel](https://intel.twzrd.xyz) - Trust scoring for AI sports analytics agents. Verify agent wallet identity before x402 micropayment access to premium play-by-play, biometric, or sports data APIs. Free MCP: `{"mcpServers":{"twzrd-agent-intel":{"url":"https://intel.twzrd.xyz/mcp"}}}`

## Datasets and Research

Open datasets, research projects, papers, benchmarks, and public reference material for sports analysis and product development.

No entries yet. See [CONTRIBUTING.md](CONTRIBUTING.md) to add the first tool.

## Other Sports Collections

Related Awesome Lists, directories, indexes, and curated sports technology resources.

No entries yet. See [CONTRIBUTING.md](CONTRIBUTING.md) to add the first resource.

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

## License

This list is released under [CC0 1.0 Universal](LICENSE).
