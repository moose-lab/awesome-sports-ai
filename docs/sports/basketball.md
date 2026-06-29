# Basketball AI Scenario Guide

Basketball AI work often starts from tracking, spacing, player context, and clip review. This guide maps those problems to catalog resources without assuming the reader already knows which tool category to inspect.

## Guide Metadata

| Field | Value |
|-------|-------|
| Slug | basketball |
| Sport scope | Basketball across NBA, WNBA, college, youth, and player-development contexts |
| Primary readers | Analysts, coaches, scouts, player-development staff, tracking prototype builders |
| Catalog tags to inspect | Basketball, tracking, analytics-modeling, data-ingestion, computer-vision, benchmarking |
| Sports AI Hub route hint | `/sports/basketball` |

## Spacing and Gravity Analysis

The problem: coaches and analysts need to understand where defensive attention is going, how spacing changes possession quality, and which players create value away from the ball.

Useful catalog resources:

- [wnba-gravity-mapper](../../prototypes/wnba-gravity-mapper/) for a runnable basketball spacing and gravity prototype.
- [Second Spectrum](https://www.geniussports.com/newsroom/genius-sports-second-spectrum-tracking-technology-approved-by-fifa-quality-programme-for-epts/) for a professional reference point around optical tracking, tactical analytics, and augmented broadcast workflows.
- [floodlight](https://github.com/floodlight-sports/floodlight) *(Cross-domain)* for spatiotemporal data structures that can transfer from team-sport tracking into basketball possession analysis.
- [Metrica Sports Sample Data](https://github.com/metrica-sports/sample-data) *(Cross-domain)* for studying public tracking-data tutorial patterns, even though the sample sport is soccer.
- [sportypy](https://github.com/sportsdataverse/sportypy) for court rendering and coordinate-system experiments.

Starter build:

- Input: player coordinates, ball coordinates when available, lineup context, possession windows.
- Output: gravity heatmap, spacing score, attention-risk notes, and coach-ready possession summary.
- Prototype direction: `basketball-gravity-reviewer` in `/prototypes`.

## Player and Game Data Workflows

The problem: builders need reliable player, team, game, and box-score data before they can produce rankings, scout cards, fantasy insights, or post-game summaries.

Useful catalog resources:

- [nba_api](https://github.com/swar/nba_api) for NBA.com stats endpoints and basketball data workflows.
- [balldontlie](https://www.balldontlie.io/) for developer-friendly basketball API access.
- [fantasy-football-wrapped](https://github.com/kt474/fantasy-football-wrapped) *(Cross-domain)* for a reference pattern around turning fantasy data into personalized charts and summaries.
- [Model Card Toolkit](https://github.com/tensorflow/model-card-toolkit) for documenting the limits of player-score, ranking, or projection models.

Starter build:

- Input: game logs, player profiles, box scores, team context, role labels.
- Output: player card, trend chart, availability caveat, and short narrative summary.
- Prototype direction: `basketball-player-card-builder` in `/prototypes`.

## Video Tracking and Possession Review

The problem: coaches and editors need to turn game or practice footage into searchable clips, possession notes, and player-action context.

Useful catalog resources:

- [SportsMOT](https://deeperaction.github.io/datasets/sportsmot.html) for multi-object tracking benchmark ideas across basketball, football, and volleyball.
- [OpenCV](https://github.com/opencv/opencv) for frame extraction, overlays, and video preprocessing.
- [Roboflow Sports](https://github.com/roboflow/sports) for sports detection and tracking workflow examples.
- [ffmpeg-python](https://github.com/kkroening/ffmpeg-python) for clip generation and filtering.
- [Video Tagging Events](https://github.com/napo/videotaggingevents) *(Cross-domain)* for general sports tagging workflow patterns.

Starter build:

- Input: practice or game video, manually tagged possessions, optional player IDs.
- Output: possession clip index, tracking confidence notes, event tags, and coach-review export.
- Prototype direction: `basketball-possession-video-indexer` in `/prototypes`.

## Shot Selection and Lineup Insight

The problem: teams and creators need explainable shot and lineup context, not only a box-score summary.

Useful catalog resources:

- [nba_api](https://github.com/swar/nba_api) for lineup, shot, and game-context data when available through NBA stats endpoints.
- [balldontlie](https://www.balldontlie.io/) for simpler team, player, and game data access.
- [soccer_xg](https://github.com/ML-KULeuven/soccer_xg) *(Cross-domain)* for studying explainable shot-quality modeling patterns from football.
- [mplsoccer](https://github.com/andrewRowlinson/mplsoccer) *(Cross-domain)* for plot-design ideas around spatial sports analytics.

Starter build:

- Input: shot chart rows, lineup stints, score state, player role, game phase.
- Output: shot-quality explainer, lineup context table, spatial chart, and model caveats.
- Prototype direction: `basketball-shot-lineup-explainer` in `/prototypes`.

## Cross-Domain Patterns to Study

- Football expected-goals projects show how to explain shot quality with transparent features, even though basketball needs different geometry, defender context, and possession rules.
- Soccer tracking tutorials can help structure public tracking examples when basketball tracking data is limited.
- Fantasy recap projects show how to turn dry game logs into user-facing narratives, which transfers well to player cards and post-game summaries.

## Gaps: Tools Yet to be Built

- Basketball gravity reviewer: tracking coordinates -> spacing heatmap, attention labels, and coach notes.
- Basketball player-card builder: player logs plus role labels -> scout-ready profile and trend summary.
- Basketball possession video indexer: game video plus manual tags -> searchable possession clips.
- Basketball shot-lineup explainer: shot rows plus lineup stints -> explainable shot and lineup context.
