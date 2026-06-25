# World Cup 2026 Assistant Toolkit

This toolkit collects practical football tools for builders supporting the 2026 FIFA World Cup zone. Each lane maps to `fifaWorldCup.toolkit` in `visualizations/source-data.json`.

### Live Data and Scoreboard Normalization

Use this lane to ingest fixture windows, normalize team names, preserve match status, and publish a source-backed live snapshot.

- [`sync-fifa-world-cup`](../scripts/sync-fifa-world-cup.mjs) - Refreshes the ESPN FIFA World Cup scoreboard window into `source-data.json`.
- [football.json](https://github.com/openfootball/football.json) - Public-domain football schedules and results for schema comparison.
- [Kloppy](https://github.com/PySport/kloppy) - Normalizes vendor football event data into reusable Python objects.

### Match Intelligence Reports

Use this lane to turn fixture, event, and status data into readable match briefs for fans, analysts, and editors.

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
