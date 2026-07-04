# hyrox-split-parser

> **HYROX Zone prototype** — first shipped gap of the [HYROX Zone](../../README.md#hyrox-zone). Guide: [docs/sports/hyrox.md](../../docs/sports/hyrox.md).

A stdlib-only mono-tool that parses an exported HYROX result table into run/station deltas, rank movement, and a coach-ready report. HYROX's fixed format — 8 × 1 km runs, 8 standardized stations, timed roxzone — means every athlete produces the same structured splits; this tool turns that structure into answers: *where did the time go, and what should training fix first?*

## Enterprise Capability Decomposed

| Enterprise System | What it does | What this tool replaces |
|---|---|---|
| Race-results portals and paid coaching platforms | Show placings and sell split-analysis dashboards | Coach-ready split analysis from any exported result table, offline, zero dependencies |

## How It Works

1. Load a result CSV (one row per athlete — see `sample_results.csv`, a synthetic demo field).
2. Compute totals, division ranks, and per-segment medians for each division.
3. `--athlete` builds a coach report: race-in-order table with deltas vs the division median, run-vs-station-vs-roxzone breakdown, run fade, top-3 losses, a what-if rank projection, and auto-composed coach notes.
4. Without `--athlete`, it prints a field summary per division, including the widest-spread station — where training time buys the most places.

## Usage

```bash
# No dependencies, Python 3.10+
python3 split_parser.py                                  # field summary of the sample data
python3 split_parser.py --athlete "Riley Chen"           # coach report for one athlete
python3 split_parser.py my_race.csv --athlete "Me" --out my_report.md
```

## Input Format (`sample_results.csv`)

One row per athlete. Times accept `m:ss`, `h:mm:ss`, or plain seconds.

```csv
name,division,run_1,...,run_8,skierg,sled_push,sled_pull,burpee_broad_jump,row,farmers_carry,sandbag_lunges,wall_balls,roxzone
Riley Chen,open_women,4:32,...,5:17,4:26,3:20,3:55,5:35,4:34,2:00,4:05,6:45,6:35
```

The sample field is **synthetic** — realistic pacing shapes, fictional athletes.

## Output Format (`coach_report.md`)

```
| Segment | Time | vs division median |
|---|---|---|
| Run 1 (1 km) | 4:32 | -0:20 |
| SkiErg 1000 m | 4:26 | -0:16 |
...
**What-if:** Wall Balls at the division median -> projected total 1:20:00, rank 2 of 6.

## Coach notes
- Priority: Wall Balls — the single biggest gap to the field (+0:12).
```

## Extending This Tool

- Feed it a real export: map your result columns to the expected header and it runs unchanged.
- Add a percentile mode across multiple race files — the `hyrox-benchmarks` build target in the zone tool map.
- Wrap the report in a single-page UI following the seed-tool shape of [hyrox-gym-finder](https://github.com/moose-lab/hyrox-gym-finder).

## Sports Tag

_Sports: Running/Track, Multi-sport._
