# World Cup 2026 Assistant Toolkit

This toolkit collects practical football tools for developers and tool users building around the 2026 FIFA World Cup knockout phase. The tournament moves from 12 groups into a 32-team single-elimination bracket: Round of 32, Round of 16, Quarterfinals, Semifinals, Third-place match, and Final.

Each lane maps to `fifaWorldCup.toolkit` in [`visualizations/source-data.json`](../visualizations/source-data.json). The README should point builders here instead of embedding a group-stage SVG.

## Tool Categories

Use these categories to move from a World Cup idea to a runnable workflow:

- Score and status data: normalize fixtures, score states, teams, venues, and source provenance.
- Bracket and elimination logic: represent Round of 32 paths, future opponents, and knockout handoffs.
- Match intelligence: turn events and statuses into readable briefs, commentary, and match reports.
- Shot quality and tactics: add xG, shot maps, pitch maps, and action valuation when event data supports it.
- Video and vision: analyze user-owned clips, possessions, tracking, and broadcast-style review.
- Scouting and media: produce player reports, multilingual summaries, captions, and social-ready outputs.

### Knockout Data and Scoreboard Normalization

Use this lane to ingest knockout fixture windows, normalize team names, preserve round/status, and publish source-backed match states.

- [`sync-fifa-world-cup`](../scripts/sync-fifa-world-cup.mjs) - Refreshes the ESPN FIFA World Cup scoreboard window into `source-data.json`.
- [football.json](https://github.com/openfootball/football.json) - Public-domain football schedules and results for schema comparison.
- [Kloppy](https://github.com/PySport/kloppy) - Normalizes vendor football event data into reusable Python objects.

### Bracket and Elimination Scenarios

Use this lane to model the knockout bracket without inventing unavailable match facts.

- [Competition Factory](https://github.com/CourtHive/competition-factory) - Manipulates draws and competition structures that can model knockout brackets.
- [Challonge API](https://api.challonge.com/) - Reference API for creating tournaments, updating brackets, and reporting scores programmatically.
- [bracket](https://github.com/evroon/bracket) - Self-hosted tournament system for bracket-first workflows and admin surfaces.

### Knockout Match Intelligence Reports

Use this lane to turn fixture, event, round, and status data into readable match briefs for fans, analysts, editors, and product surfaces.

- [`llm-match-commentator`](../prototypes/llm-match-commentator/) - Repository prototype for localized commentary from match event streams.
- [football-match-intelligence](https://github.com/DataKnight1/football-match-intelligence) - Reference project for football match intelligence dashboards and reporting.

### xG and Shot Quality

Use this lane when an event feed includes shot locations, body part, situation, and game-state context.

- [soccer_xg](https://github.com/ML-KULeuven/soccer_xg) - Baseline expected-goals modeling from public football event data.
- [mplsoccer](https://github.com/andrewRowlinson/mplsoccer) - Football pitch, shot map, and analytics visualization utilities.

### Video and Vision Review

Use this lane for coaching review, broadcast-style clips, and user-owned match video annotation.

- [soccer-video-analytics](https://github.com/tryolabs/soccer-video-analytics) - Soccer possession and video analytics workflow examples.
- [Roboflow Sports](https://github.com/roboflow/sports) - Sports computer-vision examples for detection, tracking, and analysis.

### Scouting and Player Reports

Use this lane to connect players, teams, and match notes into repeatable scouting and post-match reports.

- [socceraction](https://github.com/ML-KULeuven/socceraction) - Converts football event streams to SPADL and supports action valuation.
- [football_scout_rag](https://github.com/yotambraun/football_scout_rag) - Retrieval-augmented reference workflow for scouting reports.

### Media and Localization

Use this lane to create multilingual commentary, captions, and social-ready summaries from source-backed match context.

- [OpenAI Whisper](https://github.com/openai/whisper) - Transcribes commentary, interviews, and review audio for media workflows.
- [`llm-match-commentator`](../prototypes/llm-match-commentator/) - Generates localized commentary text from structured match events.
