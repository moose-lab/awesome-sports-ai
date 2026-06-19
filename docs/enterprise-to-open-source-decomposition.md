# Enterprise-to-Open-Source Decomposition

Professional sports organizations buy integrated AI and performance stacks that combine data rights, video workflows, tracking hardware, annotation teams, modeling, dashboards, and support. Individual builders usually cannot access those stacks directly because the cost, data access, and operational setup are too high.

This roadmap decomposes those enterprise systems into small mono-tools that an open-source community can build, test, and improve one piece at a time.

## Why This Exists

The goal is not to clone enterprise vendors. The goal is to identify the capabilities that make those products valuable, then create focused, accessible building blocks that help individual developers learn and build sports AI tools.

## Enterprise Stack Map

| Enterprise capability | Professional examples | Why individuals cannot easily use it | Open-source decomposition |
| --- | --- | --- | --- |
| Video tagging and coaching review | Hudl Sportscode, Hudl Focus | Requires team workflows, paid subscriptions, and full video operations | Clip importer, event tagger, possession timeline, coach notes export |
| Athlete load and wearable monitoring | Catapult Vector, Catapult OpenField | Requires hardware, sensors, team deployments, and longitudinal athlete data | CSV load parser, training load dashboard, acute/chronic workload calculator |
| Optical tracking and spatial analytics | Second Spectrum, Hawk-Eye | Requires stadium camera infrastructure, tracking feeds, and league data rights | Homography tool, player detector, pitch/court coordinate mapper, tracking visualizer |
| Sports data feeds and predictive models | Stats Perform Opta, Sportradar | Requires licensed feeds and commercial API access | Public data normalizer, fixture parser, xG starter model, win-probability notebook |
| Scouting and recruitment platforms | Wyscout, Hudl Instat, SkillCorner | Requires proprietary video libraries, tagged event data, and scouting networks | Player profile schema, comparison radar, searchable clip index, scouting report generator |
| Fan-facing automated content | Genius Sports, Stats Perform, league content tools | Requires live data, production tooling, and rights-cleared media | Match recap generator, highlight captioner, stat-card renderer, social image exporter |

## Development Roadmap

Start with small tools that can work with public or user-owned data. Each tool should have a clear input, output, and demo dataset before it is listed as ready.

*Note: This roadmap has been updated to reflect the hottest trends in 2026, including the FIFA World Cup, the explosion of Women's Sports, and the rise of Multimodal LLMs and Emerging Sports.*

### Phase 1: Data Foundations

- [ ] `fixture-normalizer` - Convert public fixture CSV or JSON files into a shared schedule schema.
- [ ] `team-id-resolver` - Normalize team names, abbreviations, logos, colors, and aliases.
- [ ] `match-event-schema` - Define a simple event format for shots, passes, fouls, substitutions, possessions, and periods.
- [ ] `public-data-loader` - Load sample datasets from public sports data sources into local files.

### Phase 2: Video and Annotation Mono-Tools

- [ ] `clip-cutter` - Cut timestamp ranges from user-owned game footage.
- [ ] `event-tagger` - Add keyboard-driven event labels to video timestamps.
- [ ] `possession-timeline` - Render a timeline from event tags.
- [ ] `coach-notes-exporter` - Export tagged clips and notes to Markdown or CSV.

### Phase 3: Tracking and Spatial Tools

- [ ] `court-calibrator` - Map video pixels onto court or pitch coordinates using manual control points.
- [ ] `player-dot-tracker` - Start with manual or semi-automatic player position traces.
- [ ] `spacing-map` - Visualize player spacing, occupation zones, and movement paths.
- [ ] `shot-map-renderer` - Render shot locations, xG values, and make/miss outcomes.

### Phase 4: Starter Models

- [ ] `xg-baseline` - Train a simple expected-goals model from shot distance, angle, body part, and situation.
- [ ] `win-probability-lite` - Estimate win probability from score, time, venue, and possession state.
- [ ] `player-similarity-radar` - Compare players using normalized profile metrics.
- [ ] `load-risk-flags` - Detect basic spikes in training load from wearable-style CSV files.

### Phase 5: Builder-Facing Outputs

- [ ] `stat-card-generator` - Generate shareable SVG stat cards from structured data.
- [ ] `match-report-md` - Generate a Markdown match report from events and summary metrics.
- [ ] `highlight-captioner` - Draft captions from tagged highlight metadata.
- [ ] `scouting-report-template` - Create a repeatable player scouting report from profile data and clips.

### Phase 6: 2026 High-Profile Trending Projects

- [ ] `llm-match-commentator` - A RAG system that ingests live match event streams and generates localized, multi-language commentary. _Trend: GenAI & World Cup 2026._
- [ ] `var-vision-lite` - A lightweight CV tool to calibrate camera angles and detect offside lines from broadcast footage. _Trend: World Cup 2026._
- [ ] `wnba-gravity-mapper` - Calculate player "gravity" using public WNBA play-by-play and tracking data. _Trend: Women's Sports Analytics._
- [ ] `pickleball-court-mapper` - Map pickleball court lines and track ball bounces for amateur match analysis. _Trend: Emerging Sports._
- [ ] `esports-action-spotter` - Analyze streams to tag key events and generate coaching feedback. _Trend: Esports AI._

## Contribution Rules For Roadmap Items

Add a roadmap item only when it is small enough for one developer to prototype. Each item should include:

- A clear user: analyst, coach, athlete, scout, creator, or developer.
- A clear input format.
- A clear output format.
- One public or synthetic demo dataset.
- A reason it maps to an enterprise capability.

## Reference Links

- Hudl Sportscode: https://www.hudl.com/products/sportscode
- Catapult Vector: https://www.catapult.com/solutions/vector
- Second Spectrum: https://www.secondspectrum.com/
- Stats Perform Opta: https://www.statsperform.com/opta/
- Hawk-Eye: https://www.hawkeyeinnovations.com/
- Wyscout: https://wyscout.com/
- SkillCorner: https://skillcorner.com/
