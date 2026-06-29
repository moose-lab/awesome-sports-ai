# Awesome Sports AI

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![License: CC0-1.0](https://img.shields.io/badge/License-CC0%201.0-lightgrey.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/moose-lab/awesome-sports-ai?style=social)](https://github.com/moose-lab/awesome-sports-ai/stargazers)
[![Sports AI Hub](https://img.shields.io/badge/Sports%20AI%20Hub-Official%20Web%20App-00FF87?style=flat&labelColor=0D0F14)](https://sports-ai-hub.pages.dev/)

Awesome Sports AI is a catalog of sports AI tools, datasets, libraries, models, benchmarks, and runnable prototypes. It keeps discovery in the main README and keeps the higher-level incubator work in linked prototype and roadmap documents.

[`data/catalog.json`](data/catalog.json) is the canonical source for categories, sport tags, AI capabilities, openness labels, tool records, and builder recipes. Entries should be useful, specific, reachable, neutral, and grouped into one canonical category.

Awesome Sports AI is a resource-type-first awesome list for Sports & AI builders who need high-signal tools, datasets, libraries, models, benchmarks, and runnable prototypes.

## Who This Is For

- Developers building sports AI apps, prototypes, datasets, and automation workflows.
- Analysts, coaches, editors, and operators looking for usable tools they can run or adapt.
- Tool users who want to find a working project, understand the inputs and outputs, and decide whether it fits their sport workflow.
- Contributors who want small, concrete issues that improve the catalog, prototypes, or docs.

## Quick Start for Builders

- Need runnable code? Start with [Open-Source Projects](#open-source-projects), especially [`llm-match-commentator`](prototypes/llm-match-commentator/), [`wnba-gravity-mapper`](prototypes/wnba-gravity-mapper/), and [`pickleball-court-mapper`](prototypes/pickleball-court-mapper/).
- Need a tool you can use or adapt today? Start with [Apps & Products](#apps--products), then check the matching open-source project or SDK category.
- Need raw material? Start with [Datasets/APIs/Feeds](#datasetsapisfeeds).
- Need implementation building blocks? Start with [Developer Libraries/SDKs](#developer-librariessdks) and [AI Models/Components](#ai-modelscomponents).
- Need evaluation references? Start with [Research Benchmarks](#research-benchmarks).
- Need event or demo context? Start with [Event Toolkits](#event-toolkits) and [Builder Paths & Resources](#builder-paths--resources).
- **Contribute:** [CONTRIBUTING.md](CONTRIBUTING.md) or pick a [`good first issue`](https://github.com/moose-lab/awesome-sports-ai/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22).

## Vibe-Coding Lookup Paths

Use these paths when you want to move from idea to working prototype quickly:

- Match commentary app: [`llm-match-commentator`](prototypes/llm-match-commentator/) + [OpenAI Whisper](#ai-modelscomponents) + [StatsBomb Open Data](#datasetsapisfeeds).
- Basketball spacing tool: [`wnba-gravity-mapper`](prototypes/wnba-gravity-mapper/) + [Metrica Sports Sample Data](#datasetsapisfeeds) + [sportypy](#developer-librariessdks).
- Court vision prototype: [`pickleball-court-mapper`](prototypes/pickleball-court-mapper/) + [OpenCV](#developer-librariessdks) + [Roboflow Sports](#ai-modelscomponents).
- Soccer analytics report: [StatsBomb Open Data](#datasetsapisfeeds) + [socceraction](#developer-librariessdks) + [mplsoccer](#developer-librariessdks).
- World Cup knockout tracker: [Competition Factory](#open-source-projects) + [Challonge API](#datasetsapisfeeds) + [World Cup 2026 assistant toolkit](docs/world-cup-2026-toolkit.md).

## Sports & AI Relevance Rule

Every entry should connect a sport-specific workflow to AI, data, automation, video, modeling, benchmarking, or developer infrastructure. Generic tools belong here only when they unlock a clear sports AI use case.

Open-source projects, open datasets, open APIs, reproducible research, and free developer paths should lead each category. Commercial systems can stay when they help builders understand the professional reference point, but they should be labeled `commercial-reference`.

## Table of Contents

- [The Catalog](#the-catalog)
  - [Apps & Products](#apps--products)
  - [Open-Source Projects](#open-source-projects)
  - [Datasets/APIs/Feeds](#datasetsapisfeeds)
  - [Developer Libraries/SDKs](#developer-librariessdks)
  - [AI Models/Components](#ai-modelscomponents)
  - [Research Benchmarks](#research-benchmarks)
  - [Event Toolkits](#event-toolkits)
  - [Learning Collections](#learning-collections)
- [The Prototype Factory](#the-prototype-factory)
- [Builder Paths & Resources](#builder-paths--resources)
- [Community & Related Lists](#community--related-lists)
- [Contributing](#contributing)
- [License](#license)

## The Catalog

Use resource type first, then narrow by sport, AI capability, and access label. Entry format: `[Tool Name](URL) - Description. (Tags: Sports: ... AI: ... Access: ...)`.

### Apps & Products

- <!-- catalog:sports-ai-hub --> [Sports AI Hub](https://sports-ai-hub.pages.dev/) - Provides the public web app companion for this directory, including builder navigation, prototypes, and project paths. (Tags: Sports: Multi-sport. AI: Operations, Data ingestion. Access: open-source.)
- <!-- catalog:stonk-striker --> [Stonk Striker](https://stonk-striker.vercel.app/) - Turns stock and crypto price charts into a browser football striking game with market-shaped terrain. (Tags: Sports: Soccer. AI: Media generation, Analytics/modeling. Access: free-dev-tier.)
- <!-- catalog:fantasy-manager --> [fantasy-manager](https://github.com/lukasdotcom/fantasy-manager) - Provides an open-source self-hosted fantasy manager. (Tags: Sports: Multi-sport. AI: Operations, Analytics/modeling. Access: open-source.)
- <!-- catalog:sportsengine-tourney --> [SportsEngine Tourney](https://www.sportsengine.com/tourney/) - Manages tournament scheduling, brackets, standings, score updates, registration, and team communication. (Tags: Sports: Multi-sport. AI: Operations. Access: commercial-reference.)
- <!-- catalog:second-spectrum --> [Second Spectrum](https://www.geniussports.com/newsroom/genius-sports-second-spectrum-tracking-technology-approved-by-fifa-quality-programme-for-epts/) - Provides optical tracking, tactical analytics, and augmented broadcast tools for professional leagues and teams. (Tags: Sports: Basketball, Soccer. AI: Tracking, Analytics/modeling, Media generation. Access: commercial-reference.)

### Open-Source Projects

- <!-- catalog:llm-match-commentator --> [llm-match-commentator](prototypes/llm-match-commentator/) - Generates localized match commentary from structured event streams. (Tags: Sports: Soccer, Multi-sport. AI: LLM/NLP, Media generation. Access: open-source.)
- <!-- catalog:wnba-gravity-mapper --> [wnba-gravity-mapper](prototypes/wnba-gravity-mapper/) - Calculates player gravity from basketball tracking coordinates and renders a heatmap. (Tags: Sports: Basketball. AI: Tracking, Analytics/modeling. Access: open-source.)
- <!-- catalog:pickleball-court-mapper --> [pickleball-court-mapper](prototypes/pickleball-court-mapper/) - Detects pickleball court lines and generates annotated court diagrams. (Tags: Sports: Tennis/Racquet. AI: Computer vision, Tracking. Access: open-source.)
- <!-- catalog:football-match-intelligence --> [football-match-intelligence](https://github.com/DataKnight1/football-match-intelligence) - Builds football match intelligence dashboards with pitch control, sprint efficiency, and tactical sequencing. (Tags: Sports: Soccer. AI: Analytics/modeling, Tracking. Access: open-source.)
- <!-- catalog:soccer-video-analytics --> [soccer-video-analytics](https://github.com/tryolabs/soccer-video-analytics) - Demonstrates automatic soccer ball possession analysis from video. (Tags: Sports: Soccer. AI: Computer vision, Tracking. Access: open-source.)
- <!-- catalog:video-tagging-events --> [Video Tagging Events](https://github.com/napo/videotaggingevents) - Tags specific segments of a video for sports review and analysis. (Tags: Sports: Multi-sport. AI: Operations, Media generation. Access: open-source.)
- <!-- catalog:athlete-load-monitor --> [AthleteLoadMonitor](https://github.com/SaxionAMI/AthleteLoadMonitor) - Monitors and predicts athlete load for team-sport coaches. (Tags: Sports: Multi-sport. AI: Training load, Analytics/modeling. Access: open-source.)
- <!-- catalog:coroebus --> [Coroebus](https://github.com/prakashsellathurai/Coroebus) - Tracks training load, fitness, fatigue, and readiness for athletes. (Tags: Sports: Multi-sport. AI: Training load, Analytics/modeling. Access: open-source.)
- <!-- catalog:bracket --> [bracket](https://github.com/evroon/bracket) - Provides a self-hosted tournament system for creating and managing brackets. (Tags: Sports: Multi-sport. AI: Operations. Access: open-source.)
- <!-- catalog:competition-factory --> [Competition Factory](https://github.com/CourtHive/competition-factory) - Manipulates tournament and league documents, including draws and competition structures. (Tags: Sports: Tennis/Racquet, Multi-sport. AI: Operations, Data ingestion. Access: open-source.)
- <!-- catalog:ready2race --> [Ready2Race](https://github.com/lambda9-gmbh/ready2race) - Plans and executes competition events such as coastal rowing races. (Tags: Sports: Multi-sport. AI: Operations. Access: open-source.)
- <!-- catalog:fantasy-football-wrapped --> [fantasy-football-wrapped](https://github.com/kt474/fantasy-football-wrapped) - Generates fantasy league insights and charts for Sleeper and ESPN leagues. (Tags: Sports: American Football. AI: Analytics/modeling, Media generation. Access: open-source.)
- <!-- catalog:football-scout-rag --> [football_scout_rag](https://github.com/yotambraun/football_scout_rag) - Generates repeatable football player scouting reports with retrieval-augmented workflows. (Tags: Sports: Soccer. AI: LLM/NLP, Analytics/modeling. Access: open-source.)

### Datasets/APIs/Feeds

- <!-- catalog:balldontlie --> [balldontlie](https://www.balldontlie.io/) - Provides API access to basketball teams, players, games, and box-score data. (Tags: Sports: Basketball. AI: Data ingestion. Access: open-api.)
- <!-- catalog:collegefootballdata --> [CollegeFootballData](https://collegefootballdata.com/) - Provides college football API endpoints for games, drives, plays, rankings, ratings, and recruiting data. (Tags: Sports: American Football. AI: Data ingestion, Analytics/modeling. Access: open-api.)
- <!-- catalog:football-json --> [football.json](https://github.com/openfootball/football.json) - Provides public-domain football match data in JSON for schedules, leagues, clubs, and results. (Tags: Sports: Soccer. AI: Data ingestion. Access: open-data.)
- <!-- catalog:statsbomb-open-data --> [StatsBomb Open Data](https://github.com/statsbomb/open-data) - Provides free soccer event data for public analysis and modeling. (Tags: Sports: Soccer. AI: Data ingestion, Benchmarking. Access: open-data.)
- <!-- catalog:metrica-sports-sample-data --> [Metrica Sports Sample Data](https://github.com/metrica-sports/sample-data) - Provides sample soccer tracking and event data for analytics tutorials and reproducible analysis. (Tags: Sports: Soccer. AI: Data ingestion, Tracking. Access: open-data.)
- <!-- catalog:dynastyprocess-data --> [dynastyprocess/data](https://github.com/dynastyprocess/data) - Provides open fantasy football data maintained by DynastyProcess. (Tags: Sports: American Football. AI: Data ingestion, Analytics/modeling. Access: open-data.)
- <!-- catalog:challonge-api --> [Challonge API](https://api.challonge.com/) - Lets developers create tournaments, update brackets, and report scores programmatically. (Tags: Sports: Multi-sport. AI: Operations, Data ingestion. Access: open-api.)
- <!-- catalog:toornament-api --> [Toornament API](https://developer.toornament.com/) - Provides APIs for building tournament, match, calendar, ranking, and registration workflows. (Tags: Sports: Esports, Multi-sport. AI: Operations, Data ingestion. Access: open-api.)
- <!-- catalog:nba-api --> [nba_api](https://github.com/swar/nba_api) - Provides a Python client for NBA.com stats endpoints and basketball data workflows. (Tags: Sports: Basketball. AI: Data ingestion. Access: open-source.)

### Developer Libraries/SDKs

- <!-- catalog:fastf1 --> [FastF1](https://github.com/theOehrly/Fast-F1) - Loads Formula 1 timing, telemetry, session, schedule, and weather data in Python. (Tags: Sports: Motorsport. AI: Data ingestion, Analytics/modeling. Access: open-source.)
- <!-- catalog:kloppy --> [Kloppy](https://github.com/PySport/kloppy) - Standardizes soccer tracking and event data into vendor-independent Python objects. (Tags: Sports: Soccer. AI: Data ingestion, Tracking. Access: open-source.)
- <!-- catalog:statsbombpy --> [statsbombpy](https://github.com/statsbomb/statsbombpy) - Streams StatsBomb soccer data into Python for analysis and modeling. (Tags: Sports: Soccer. AI: Data ingestion, Analytics/modeling. Access: open-source.)
- <!-- catalog:mplsoccer --> [mplsoccer](https://github.com/andrewRowlinson/mplsoccer) - Draws soccer pitches and common football analytics plots with Matplotlib. (Tags: Sports: Soccer. AI: Analytics/modeling, Media generation. Access: open-source.)
- <!-- catalog:socceraction --> [socceraction](https://github.com/ML-KULeuven/socceraction) - Converts soccer event streams to SPADL and values actions with VAEP or xT. (Tags: Sports: Soccer. AI: Data ingestion, Analytics/modeling. Access: open-source.)
- <!-- catalog:soccerplots --> [soccerplots](https://github.com/slothfulwave/soccerplots) - Creates radar and pizza charts for football player analysis. (Tags: Sports: Soccer. AI: Analytics/modeling, Media generation. Access: open-source.)
- <!-- catalog:sportypy --> [sportypy](https://github.com/sportsdataverse/sportypy) - Draws regulation playing surfaces for several sports in Python. (Tags: Sports: Multi-sport. AI: Analytics/modeling, Media generation. Access: open-source.)
- <!-- catalog:ffmpeg-python --> [ffmpeg-python](https://github.com/kkroening/ffmpeg-python) - Provides Python bindings for FFmpeg video processing and filtering. (Tags: Sports: Multi-sport. AI: Media generation. Access: open-source.)
- <!-- catalog:floodlight --> [floodlight](https://github.com/floodlight-sports/floodlight) - Provides Python data structures, parsers, and analysis models for team-sport event and tracking data. (Tags: Sports: Multi-sport. AI: Data ingestion, Tracking, Analytics/modeling. Access: open-source.)
- <!-- catalog:opencv --> [OpenCV](https://github.com/opencv/opencv) - Provides open-source computer vision infrastructure for tracking, detection, and video analysis. (Tags: Sports: Multi-sport. AI: Computer vision, Tracking. Access: open-source.)
- <!-- catalog:sportsdataverse-py --> [sportsdataverse-py](https://github.com/sportsdataverse/sportsdataverse-py) - Provides a Python package for loading and tidying data from several SportsDataverse ecosystems. (Tags: Sports: Multi-sport. AI: Data ingestion, Analytics/modeling. Access: open-source.)
- <!-- catalog:databallpy --> [databallpy](https://github.com/Alek050/databallpy) - Reads, preprocesses, visualizes, and synchronizes soccer event and tracking data. (Tags: Sports: Soccer. AI: Data ingestion, Tracking, Training load. Access: open-source.)
- <!-- catalog:yahoo-fantasy-sports-api-go --> [yahoo-fantasy-sports-api-go](https://github.com/n-ae/yahoo-fantasy-sports-api-go) - Provides Go bindings for Yahoo Fantasy Sports APIs. (Tags: Sports: Multi-sport. AI: Data ingestion. Access: open-source.)

### AI Models/Components

- <!-- catalog:roboflow-sports --> [Roboflow Sports](https://github.com/roboflow/sports) - Provides computer-vision examples, models, and workflows for sports detection, tracking, and analytics. (Tags: Sports: Multi-sport. AI: Computer vision, Tracking. Access: open-source.)
- <!-- catalog:soccer-xg --> [soccer_xg](https://github.com/ML-KULeuven/soccer_xg) - Trains and analyzes expected-goals models for soccer. (Tags: Sports: Soccer. AI: Analytics/modeling. Access: open-source.)
- <!-- catalog:mmpose --> [MMPose](https://github.com/open-mmlab/mmpose) - Provides an open-source pose estimation toolbox for biomechanics and movement analysis. (Tags: Sports: Multi-sport. AI: Computer vision, Tracking, Training load. Access: open-source.)
- <!-- catalog:openpose --> [OpenPose](https://github.com/CMU-Perceptual-Computing-Lab/openpose) - Detects real-time multi-person body, hand, face, and foot keypoints. (Tags: Sports: Multi-sport. AI: Computer vision, Tracking. Access: open-source.)
- <!-- catalog:openai-whisper --> [OpenAI Whisper](https://github.com/openai/whisper) - Transcribes commentary, interviews, and review audio for sports media workflows. (Tags: Sports: Multi-sport. AI: LLM/NLP, Media generation. Access: open-source.)
- <!-- catalog:acute-chronic-workload-ratio --> [Acute_Chronic_Workload_Ratio](https://github.com/ale-uy/Acute_Chronic_Workload_Ratio) - Calculates acute-to-chronic workload ratios in Python. (Tags: Sports: Multi-sport. AI: Training load, Analytics/modeling. Access: open-source.)
- <!-- catalog:sports-betting --> [sports-betting](https://github.com/georgedouzas/sports-betting) - Collects sports betting AI tools and prediction experiments. (Tags: Sports: Multi-sport. AI: Analytics/modeling. Access: open-source.)
- <!-- catalog:model-card-toolkit --> [Model Card Toolkit](https://github.com/tensorflow/model-card-toolkit) - Documents training data, assumptions, limitations, and evaluation results for machine learning models. (Tags: Sports: Multi-sport. AI: Benchmarking, Analytics/modeling. Access: open-source.)

### Research Benchmarks

- <!-- catalog:google-research-football --> [Google Research Football](https://github.com/google-research/football) - Provides a reinforcement-learning football environment for AI research. (Tags: Sports: Soccer. AI: Simulation/RL, Benchmarking. Access: open-source.)
- <!-- catalog:soccernet --> [SoccerNet](https://www.soccer-net.org/data) - Provides datasets and benchmarks for soccer video understanding, action spotting, tracking, and game-state reconstruction. (Tags: Sports: Soccer. AI: Computer vision, Tracking, Benchmarking. Access: paper-benchmark.)
- <!-- catalog:sportsmot --> [SportsMOT](https://deeperaction.github.io/datasets/sportsmot.html) - Provides a multi-object tracking dataset across basketball, football, and volleyball scenes. (Tags: Sports: Basketball, Soccer, Volleyball. AI: Tracking, Computer vision, Benchmarking. Access: paper-benchmark.)
- <!-- catalog:tacticai --> [TacticAI](https://www.nature.com/articles/s41467-024-45965-x) - Describes a football tactics assistant for predicting and generating corner-kick tactical recommendations. (Tags: Sports: Soccer. AI: Analytics/modeling, Benchmarking. Access: paper-benchmark.)

### Event Toolkits

- <!-- catalog:world-cup-2026-zone --> [World Cup 2026 zone plan](docs/world-cup-2026-zone.md) - Defines the knockout-stage data contract, Match Center handoff, toolkit lanes, and operations checklist. (Tags: Sports: Soccer. AI: Operations, Data ingestion. Access: open-source.)
- <!-- catalog:world-cup-2026-toolkit --> [World Cup 2026 assistant toolkit](docs/world-cup-2026-toolkit.md) - Classifies tools for Round of 32-to-Final workflows: data normalization, bracket scenarios, reports, xG, video, scouting, and localization. (Tags: Sports: Soccer. AI: Data ingestion, Analytics/modeling, LLM/NLP. Access: open-source.)
- <!-- catalog:world-cup-2026-knockout-tool-map --> [World Cup 2026 knockout-stage tool map](docs/world-cup-2026-toolkit.md) - Maps single tools to practical knockout use cases, including bracket state, match briefs, shot-quality context, video review, and multilingual media. (Tags: Sports: Soccer. AI: Operations, Data ingestion, Analytics/modeling, LLM/NLP. Access: open-source.)

### Learning Collections

- <!-- catalog:analytics-handbook --> [analytics-handbook](https://github.com/devinpleuler/analytics-handbook) - Introduces practical soccer analytics concepts and workflows. (Tags: Sports: Soccer. AI: Analytics/modeling. Access: open-source.)
- <!-- catalog:awesome-football-analytics --> [awesome-football-analytics](https://github.com/diegopastor/awesome-football-analytics) - Curates football analytics resources, datasets, software, and learning material. (Tags: Sports: Soccer. AI: Analytics/modeling, Data ingestion. Access: open-source.)
- <!-- catalog:awesome-soccer-analytics --> [awesome-soccer-analytics](https://github.com/matiasmascioto/awesome-soccer-analytics) - Collects soccer analytics resources in English and Spanish. (Tags: Sports: Soccer. AI: Analytics/modeling, Data ingestion. Access: open-source.)
- <!-- catalog:awesome-sports-analytics --> [awesome-sports-analytics](https://github.com/AtomScott/awesome-sports-analytics) - Collects sports analytics datasets, tools, papers, and learning resources. (Tags: Sports: Multi-sport. AI: Analytics/modeling, Data ingestion. Access: open-source.)
- <!-- catalog:football-analytics --> [football_analytics](https://github.com/eddwebster/football_analytics) - Curates football analytics projects, data, and public resources. (Tags: Sports: Soccer. AI: Analytics/modeling, Data ingestion. Access: open-source.)

## The Prototype Factory

Runnable prototypes live in [`prototypes/`](prototypes/) and show how catalog resources can become small, inspectable tools.

| Prototype | What it demonstrates | Path |
| --- | --- | --- |
| `llm-match-commentator` | Localized commentary from structured match events | [`prototypes/llm-match-commentator/`](prototypes/llm-match-commentator/) |
| `wnba-gravity-mapper` | Basketball player-gravity scoring from tracking coordinates | [`prototypes/wnba-gravity-mapper/`](prototypes/wnba-gravity-mapper/) |
| `pickleball-court-mapper` | Court-line detection and annotated court diagrams | [`prototypes/pickleball-court-mapper/`](prototypes/pickleball-court-mapper/) |

## Builder Paths & Resources

Builder recipes reference catalog tools instead of duplicating records. The machine-readable version lives in [`data/catalog.json`](data/catalog.json).

| Path | Goal | Starting tools |
| --- | --- | --- |
| Build Your Own xG Model | Train and document a basic expected-goals model from public soccer event data. | StatsBomb Open Data, Kloppy, mplsoccer, soccer_xg, Model Card Toolkit |
| Build Your Own Coaching Video Tagger | Create a simple sports video tagging and coach-note workflow from user-owned footage. | ffmpeg-python, Video Tagging Events, soccer-video-analytics, analytics-handbook, OpenAI Whisper |
| Build Your Own Player Scouting Board | Combine player profiles, public data, similarity charts, clips, and reports into a lightweight scouting board. | socceraction, nba_api, soccerplots, Roboflow Sports, football_scout_rag |
| Build Your Own Athlete Load Dashboard | Parse athlete-owned workload files, calculate load ratios, flag risk, and render a training dashboard. | databallpy, Kloppy, Acute_Chronic_Workload_Ratio, AthleteLoadMonitor, Coroebus |
| Build Your Own Match Intelligence Report | Normalize fixture and event data into an automated match report with model outputs and stat cards. | football_analytics, socceraction, sports-betting, mplsoccer, football-match-intelligence |
| Build Your Own Sports AI Prototype Launch Pack | Start from runnable prototypes and event kits when you want a compact demo that can be forked, explained, and shared. | llm-match-commentator, wnba-gravity-mapper, pickleball-court-mapper, World Cup 2026 assistant toolkit |

### World Cup 2026 Knockout Toolkit

The World Cup lane is an event toolkit, not the identity of the directory. Use it as a concrete build surface for the knockout phase: Round of 32, Round of 16, Quarterfinals, Semifinals, Third-place match, and Final.

- [World Cup 2026 zone plan](docs/world-cup-2026-zone.md) - Source-backed contract for knockout data, Match Center handoff, and operations.
- [World Cup 2026 assistant toolkit](docs/world-cup-2026-toolkit.md) - Tool categories and single-tool notes for developers and tool users.
- [generated event visuals](visualizations/README.md) - Asset index for generated SVGs and the source data contract.
- [Source data contract](visualizations/source-data.json) - Stores knockout format metadata, update-stream metadata, toolkit lanes, and source-backed fixture fields.

Tool categories for World Cup builders:

- **Knockout Data and Scoreboard Normalization** - Ingest knockout fixture windows, normalize teams, preserve round/status, and publish source-backed match states.
- **Bracket and Elimination Scenarios** - Represent Round of 32 paths, elimination states, future opponents, and bracket handoffs without inventing unavailable match facts.
- **Knockout Match Intelligence Reports** - Turn fixture, event, round, and status data into readable match briefs for fans, analysts, and editors.
- **xG and Shot Quality** - Add shot-quality context once an event feed with locations, body part, and situation is available.
- **Video and Vision Review** - Support coaching review, broadcast-style clips, and user-owned match video annotation.
- **Scouting and Player Reports** - Connect players, teams, and match notes into repeatable scouting and post-match reports.
- **Media and Localization** - Create multilingual commentary, captions, and social-ready summaries from source-backed match context.

More project context:

- [Enterprise-to-Open-Source Decomposition](docs/enterprise-to-open-source-decomposition.md) - Stack map and mono-tool roadmap.
- [2026 Strategic Roadmap](docs/roadmap-2026-strategy.md) - Project opportunities around major events, women's sports, multimodal LLMs, and emerging sports.
- [Sports AI Hub PRD](docs/PRD-awesome-sports-ai-2026.md) - Product brief for the public Sports AI Hub direction.

Contribution rules are in [CONTRIBUTING.md](CONTRIBUTING.md). In short: add each tool to one canonical category, prefer open-source or open-data resources, include visible tags, update [`data/catalog.json`](data/catalog.json) and README together, and run `node --test scripts/*.test.mjs`.

## Community & Related Lists

[![Star History Chart](https://api.star-history.com/svg?repos=moose-lab/awesome-sports-ai&type=Date)](https://www.star-history.com/#moose-lab/awesome-sports-ai&Date)

Related lists:

- [awesome-sports-analytics](https://github.com/AtomScott/awesome-sports-analytics)
- [awesome-football-analytics](https://github.com/diegopastor/awesome-football-analytics)
- [awesome-soccer-analytics](https://github.com/matiasmascioto/awesome-soccer-analytics)

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

## License

This list is released under [CC0 1.0 Universal](LICENSE).
