# Running and Endurance AI Scenario Guide

Running and endurance workflows sit between athlete-owned data, coaching interpretation, route context, and biomechanics. This guide keeps those scenarios visible before choosing tools.

## Guide Metadata

| Field | Value |
|-------|-------|
| Slug | running |
| Sport scope | Running, road racing, trail running, and adjacent endurance training |
| Primary readers | Coaches, runners, route analysts, biomechanics builders, endurance-product builders |
| Catalog tags to inspect | Running/Track, Multi-sport, training-load, analytics-modeling, tracking, computer-vision |
| Sports AI Hub route hint | `/sports/running` |

## Training Load Monitoring (训练负荷监控)

The problem: coaches and athletes need a simple way to identify load spikes, readiness changes, and recovery risk across weeks.

Useful catalog resources:

- [AthleteLoadMonitor](https://github.com/SaxionAMI/AthleteLoadMonitor) for coach-facing load monitoring.
- [Coroebus](https://github.com/prakashsellathurai/Coroebus) for fitness, fatigue, and readiness patterns.
- [Acute_Chronic_Workload_Ratio](https://github.com/ale-uy/Acute_Chronic_Workload_Ratio) for a lightweight acute-to-chronic workload baseline.
- [Model Card Toolkit](https://github.com/tensorflow/model-card-toolkit) for documenting risk flags and model limitations.

Starter build:

- Input: athlete-owned training CSV, session duration, distance, perceived exertion, optional heart-rate zones.
- Output: weekly load chart, acute/chronic ratio, risk flag, and coach note.
- Prototype direction: `running-load-monitor` in `/prototypes`.

## Pace and Route Analysis (配速与路线分析)

The problem: runners need to understand where pace changes came from: terrain, route profile, weather context, race segment, or execution.

Useful catalog resources:

- [FastF1](https://github.com/theOehrly/Fast-F1) *(Cross-domain)* for session telemetry, lap timing, and delta-analysis patterns that transfer from motorsport to endurance pacing.
- [floodlight](https://github.com/floodlight-sports/floodlight) *(Cross-domain)* for spatiotemporal data structures originally shaped for team-sport tracking.
- [sportypy](https://github.com/sportsdataverse/sportypy) *(Cross-domain)* for thinking about regulation surface rendering and coordinate systems, even though route maps need a different geometry layer.
- [Sports AI Hub](https://sports-ai-hub.pages.dev/) for exposing route-analysis prototypes as a guided builder path.

Starter build:

- Input: GPS track, splits, elevation, route checkpoints, optional weather annotations.
- Output: pace delta chart, route segment table, uphill/downhill split notes, and pacing recommendation.
- Prototype direction: `running-route-pace-analyzer` in `/prototypes`.

## Posture and Biomechanics (姿态与生物力学)

The problem: coaches and athletes need low-friction form review that highlights cadence, posture, asymmetry, and foot-strike cues without overstating model certainty.

Useful catalog resources:

- [OpenPose](https://github.com/CMU-Perceptual-Computing-Lab/openpose) for body keypoint detection.
- [MMPose](https://github.com/open-mmlab/mmpose) for pose-estimation experiments and movement-analysis pipelines.
- [OpenCV](https://github.com/opencv/opencv) for video preprocessing, calibration, and overlays.
- [Roboflow Sports](https://github.com/roboflow/sports) *(Cross-domain)* for sports computer-vision workflow examples.
- [Model Card Toolkit](https://github.com/tensorflow/model-card-toolkit) for documenting limitations by camera angle, speed, lighting, and athlete population.

Starter build:

- Input: side-view running video, frame-rate metadata, athlete consent, form checklist.
- Output: annotated stride timeline, cadence estimate, posture cues, and uncertainty notes.
- Prototype direction: `running-form-reviewer` in `/prototypes`.

## Cross-Domain Patterns to Study

- Motorsport telemetry transfers well to split, lap, and delta thinking, but running needs route and physiology context.
- Team-sport tracking libraries can inspire coordinate schemas, but road and trail routes need map, grade, and surface metadata.
- Pose estimation can help form review, but any advice-facing output should show camera assumptions and uncertainty.

## Gaps: Tools Yet to be Built

- Running load monitor: training log CSV -> readiness trend, load spike flag, and coach notes.
- Route pace analyzer: GPS activity plus elevation -> segment-level pace explanation.
- Running form reviewer: athlete-owned video -> annotated stride and posture report.
- Endurance race plan generator: target time plus course profile -> split plan and risk notes.
