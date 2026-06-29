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

The first HYROX scene template is [HYROX Gym Finder](https://github.com/moose-lab/hyrox-gym-finder), with a live app at <https://moose-lab.github.io/hyrox-gym-finder/>. It helps athletes search HYROXCN certified gyms by browser location, coordinates, region keyword, or an imported HYROXCN JSON export.

Starter build:

- Input: latitude/longitude, browser geolocation, city or district keyword, or the `/appapi/fit/gym/query` JSON response.
- Output: ranked certified gym list, distance summary, booking/fitness-test flags, and a lightweight map visualization.
- Prototype direction: keep this as a single-page static tool with no required backend, so contributors can fork it and add one small workflow at a time.

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

- [AthleteLoadMonitor](https://github.com/SaxionAMI/AthleteLoadMonitor) for training-load and readiness patterns.
- [Coroebus](https://github.com/prakashsellathurai/Coroebus) for athlete fitness, fatigue, and readiness tracking.
- [Acute_Chronic_Workload_Ratio](https://github.com/ale-uy/Acute_Chronic_Workload_Ratio) for simple load-ratio baselines.
- [FastF1](https://github.com/theOehrly/Fast-F1) *(Cross-domain)* for session, lap, split, telemetry, and event-timing patterns that transfer well to HYROX station splits.

Starter build:

- Input: athlete split table, station names, run-lap times, division baselines, optional heart-rate zones.
- Output: station-loss chart, run-vs-station profile, pacing consistency score, and coach notes.
- Prototype direction: `hyrox-station-split-analyzer` in `/prototypes`.

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
- HYROX split parser: exported result table -> run/station deltas, rank movement, and coach-ready notes.
- HYROX movement standard checker: athlete-owned station video -> annotated review timeline with explicit uncertainty.
- HYROX venue readiness checklist: station inventory plus floor plan -> setup gaps and volunteer task list.
