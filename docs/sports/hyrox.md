# HYROX AI Scenario Guide

HYROX combines mass-participation race operations, station-by-station performance analysis, and movement-standard enforcement. This guide starts from those sport workflows and maps them to reusable sports AI resources.

## Guide Metadata

| Field | Value |
|-------|-------|
| Slug | hyrox |
| Sport scope | Functional fitness race with running segments and standardized workout stations |
| Primary readers | Race operators, functional-fitness coaches, venue builders, computer-vision prototype builders |
| Catalog tags to inspect | Multi-sport, Running/Track, operations, tracking, computer-vision, training-load |
| Sports AI Hub route hint | `/sports/hyrox` |

## First Tool Template: Nearby Certified Gym Finder

The first HYROX scene template is [HYROX Gym Finder](https://github.com/moose-lab/hyrox-gym-finder), with a live app at <https://hyrox-gym-finder.vercel.app/>. It helps athletes search HYROXCN certified gyms by browser location, coordinates, region keyword, or an imported HYROXCN JSON export.

Starter build:

- Input: latitude/longitude, browser geolocation, city or district keyword, or the `/appapi/fit/gym/query` JSON response.
- Output: ranked certified gym list, distance summary, booking/fitness-test flags, and a lightweight map visualization.
- Prototype direction: keep this as a single-page static tool with no required backend, so contributors can fork it and add one small workflow at a time.

## Tool Opportunity Map (7 Lanes, 24 Build Targets)

The sport decomposed along the athlete's year. Every target is one small tool, one owner, and one search phrase it can own. The machine-readable mirror lives in `data/catalog.json` under `scenes[].buildTargets`.

Legend: **live** = shipped and listed. **gap** = specced in the catalog — claim it with the [claim issue](https://github.com/moose-lab/awesome-sports-ai/issues/new?template=claim-hyrox-gap.yml). **idea** = named here, unclaimed.

### Train — between races

*Where athletes spend most of the year, and where search volume lives.*

- `hyrox-pacing-calculator` - Target finish time -> per-run and per-station split plan, adjusted by division and runner-vs-strength bias. *(athlete / weekend / idea / owns: "hyrox pacing calculator")*
- `hyrox-workout-generator` - Constraint-aware session builder: compromised-running blocks, station EMOMs, race-week tapers. *(athlete, coach / sprint / idea / owns: "hyrox workout generator")*
- `hyrox-sled-calculator` - Division sled loads normalized for floor surface and sled type, with community friction notes. *(athlete / weekend / idea / owns: "hyrox sled weight")*
- `hybrid-load-tracker` - Merges run volume and strength tonnage into one weekly readiness view; pairs with AthleteLoadMonitor and ACWR. *(coach / sprint / idea / owns: "hybrid athlete training load")*
- `erg-split-tables` - SkiErg and RowErg 1000 m pacing tables with damper and drag-factor presets, printable. *(athlete / weekend / idea / owns: "skierg 1000m pace")*

### Race — race weekend

*Short window, high emotion, outputs people screenshot and share.*

- `hyrox-race-checklist` - Gear, fueling, and warmup timeline generator that prints to one page. *(athlete / weekend / idea / owns: "hyrox race day checklist")*
- `hyrox-pace-band` - Printable wristband of target splits, generated from a pacing plan. *(athlete / weekend / idea / owns: "hyrox pace band")*
- `roxzone-transit-planner` - Venue map plus realistic roxzone transit budgets, so race plans survive contact with the floor. *(athlete, operator / sprint / idea / owns: "roxzone")*

### Analyze — after the gun

*The highest-traffic questions in the sport: "was my time good?"*

- `hyrox-split-parser` - Exported result table -> run/station deltas, rank movement, and coach-ready notes. Runs in [/prototypes/hyrox-split-parser](../../prototypes/hyrox-split-parser/). *(coach, athlete / sprint / **live** / owns: "hyrox results analysis")*
- `hyrox-benchmarks` - Percentile tables by division, age group, and station from public results. *(athlete / sprint / idea / owns: "hyrox average time")*
- `hyrox-whatif` - Station improvement scenarios -> projected finish time and rank shift; a thin layer on the split parser. *(athlete, coach / weekend / idea / owns: "hyrox race simulator")*
- `hyrox-season-dashboard` - Multi-race progress for one athlete: fitness trend, station deltas, PB tracker. *(athlete, coach / sprint / idea / owns: "hyrox progress tracker")*

### Judge — movement standards

*The sport's hardest, most defensible computer-vision problem.*

- `hyrox-movement-standard-checker` - Athlete-owned station video -> annotated review timeline with explicit uncertainty. *(coach, builder / deep / **gap** / owns: "wall ball rep checker")*
- `hyrox-rep-counter` - Pose keypoints -> rep segmentation for wall balls, burpee broad jumps, and lunges. *(builder / deep / idea / owns: "exercise rep counter")*
- `no-rep-library` - Annotated open clip set of common no-reps per station, for athlete education and judge onboarding. *(builder, coach / sprint / idea / owns: "hyrox movement standards")*

### Operate — race ops

*Fewer users, bigger wins: operators run events nearly every weekend of the season.*

- `hyrox-heat-station-load-planner` - Roster plus venue constraints -> heat plan and staffing risk report. *(operator / deep / **gap** / owns: "race heat scheduling")*
- `hyrox-venue-readiness-checklist` - Station inventory plus floor plan -> setup gaps and volunteer task list. *(operator / weekend / **gap** / owns: "event venue checklist")*
- `judge-shift-scheduler` - Volunteer and judge rota builder with station rotation and break rules. *(operator / sprint / idea / owns: "volunteer scheduling tool")*

### Find — discovery

*Where new athletes enter the sport, and where the zone already has a live tool.*

- `hyrox-gym-finder` - Finds HYROXCN certified gyms from coordinates, region keywords, browser location, or imported JSON exports. Live at <https://hyrox-gym-finder.vercel.app/>. *(athlete / weekend / **live** / owns: "hyrox gym near me")*
- `hyrox-race-calendar` - Season calendar aggregator with registration-window alerts. *(athlete / sprint / idea / owns: "hyrox 2026 schedule")*
- `hyrox-partner-matcher` - Doubles and relay partner matching by target time, division, and city. *(athlete / sprint / idea / owns: "hyrox doubles partner")*

### Data — the substrate

*Boring on purpose. Everything above sits on it, and builders search for it first.*

- `hyrox-results-schema` - Normalized JSON schema for results, stations, and divisions — the zone's data contract. *(builder / weekend / idea / owns: "hyrox api")*
- `hyrox-data-py` - Python client that parses public result pages into the schema; FastF1 is the role model. *(builder / sprint / idea / owns: "hyrox results api")*
- `station-video-benchmark` - Labeled station-clip dataset for pose and rep-counting models, with model cards. *(builder / deep / idea / owns: "fitness video dataset")*

## Event Operations (赛事运营)

The problem: a HYROX event needs heat management, athlete check-in, station flow, score updates, and venue communication without forcing volunteers to reconcile spreadsheets by hand.

Useful catalog resources:

- [HYROX Gym Finder](https://github.com/moose-lab/hyrox-gym-finder) for nearby certified training-gym discovery from the HYROXCN gym API or local JSON exports.
- [SportsEngine Tourney](https://www.sportsengine.com/tourney/) for tournament-style registration, schedule, standings, and communication patterns.
- [Ready2Race](https://github.com/lambda9-gmbh/ready2race) for competition execution workflows that can inspire wave, lane, and result operations.
- [Competition Factory](https://github.com/CourtHive/competition-factory) *(Cross-domain)* for event document and draw-structure manipulation that can transfer from court sports into heat and wave planning.
- [Sports AI Hub](https://sports-ai-hub.pages.dev/) for turning the guide into a discoverable web-app entry point.

Starter build:

- Input: event roster CSV, division rules, heat windows, station capacity, volunteer assignments.
- Output: heat schedule, station load forecast, conflict report, and operator checklist.
- Prototype direction: `hyrox-event-ops-planner` in `/prototypes`.

## Station Split Analysis (站点分拆分析)

The problem: coaches and athletes need to know whether time loss came from running segments, transition flow, or a specific workout station.

Useful catalog resources:

- [hyrox-split-parser](../../prototypes/hyrox-split-parser/) for parsing exported result tables into run/station deltas, rank movement, and coach-ready notes.
- [AthleteLoadMonitor](https://github.com/SaxionAMI/AthleteLoadMonitor) for training-load and readiness patterns.
- [Coroebus](https://github.com/prakashsellathurai/Coroebus) for athlete fitness, fatigue, and readiness tracking.
- [Acute_Chronic_Workload_Ratio](https://github.com/ale-uy/Acute_Chronic_Workload_Ratio) for simple load-ratio baselines.
- [FastF1](https://github.com/theOehrly/Fast-F1) *(Cross-domain)* for session, lap, split, telemetry, and event-timing patterns that transfer well to HYROX station splits.

Starter build:

- Input: athlete split table, station names, run-lap times, division baselines, optional heart-rate zones.
- Output: station-loss chart, run-vs-station profile, pacing consistency score, and coach notes.
- Prototype direction: [hyrox-split-parser](../../prototypes/hyrox-split-parser/) in `/prototypes` — shipped.

## Movement Standard Verification (动作标准验证)

The problem: standardized movements such as wall balls, sled pushes, burpee broad jumps, and lunges need consistent review without replacing human judges.

Useful catalog resources:

- [OpenPose](https://github.com/CMU-Perceptual-Computing-Lab/openpose) for body keypoint extraction.
- [MMPose](https://github.com/open-mmlab/mmpose) for pose-estimation pipelines and biomechanics experiments.
- [OpenCV](https://github.com/opencv/opencv) for video preprocessing, line overlays, and rep-region analysis.
- [Roboflow Sports](https://github.com/roboflow/sports) *(Cross-domain)* for sports detection and tracking workflow examples that can transfer into station-video annotation.
- [Model Card Toolkit](https://github.com/tensorflow/model-card-toolkit) for documenting model limitations when movement-standard decisions affect athletes.

Starter build:

- Input: athlete-owned station video, movement standard checklist, camera-angle notes.
- Output: annotated rep timeline, range-of-motion warnings, uncertainty notes, and judge-review export.
- Prototype direction: `hyrox-movement-standard-checker` in `/prototypes`.

## Cross-Domain Patterns to Study

- Motorsport telemetry: FastF1 shows how session timing, split deltas, and event metadata can be treated as first-class analysis objects.
- Tournament operations: Competition Factory and SportsEngine Tourney show how event structure can be separated from live scoring.
- Pose estimation: OpenPose and MMPose are not HYROX-specific, so every validation prototype needs sport-specific calibration and visible uncertainty.

## Gaps: Tools Yet to be Built

- HYROX heat and station load planner: roster plus venue constraints -> heat plan and staffing risk report.
- HYROX movement standard checker: athlete-owned station video -> annotated review timeline with explicit uncertainty.
- HYROX venue readiness checklist: station inventory plus floor plan -> setup gaps and volunteer task list.
