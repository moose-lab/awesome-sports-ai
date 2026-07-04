#!/usr/bin/env python3
"""hyrox-split-parser: exported HYROX result tables -> run/station deltas,
rank movement, and coach-ready notes.

Stdlib only. Input is a CSV with one row per athlete (see sample_results.csv);
times accept "m:ss", "h:mm:ss", or plain seconds.
"""

from __future__ import annotations

import argparse
import csv
import statistics
import sys
from pathlib import Path

RUNS = [f"run_{i}" for i in range(1, 9)]

STATIONS = [
    ("skierg", "SkiErg 1000 m"),
    ("sled_push", "Sled Push 50 m"),
    ("sled_pull", "Sled Pull 50 m"),
    ("burpee_broad_jump", "Burpee Broad Jump 80 m"),
    ("row", "Row 1000 m"),
    ("farmers_carry", "Farmers Carry 200 m"),
    ("sandbag_lunges", "Sandbag Lunges 100 m"),
    ("wall_balls", "Wall Balls"),
]

REQUIRED_COLUMNS = ["name", "division", *RUNS, *[key for key, _ in STATIONS], "roxzone"]

FADE_FLAG_SECONDS = 8  # avg back-half run leg slower than front half by more than this


def parse_time(value: str) -> float:
    value = value.strip()
    if not value:
        raise ValueError("empty time value")
    parts = value.split(":")
    if len(parts) == 1:
        return float(parts[0])
    if len(parts) == 2:
        return int(parts[0]) * 60 + float(parts[1])
    if len(parts) == 3:
        return int(parts[0]) * 3600 + int(parts[1]) * 60 + float(parts[2])
    raise ValueError(f"unrecognized time format: {value!r}")


def fmt(seconds: float) -> str:
    seconds = round(seconds)
    sign = "-" if seconds < 0 else ""
    seconds = abs(seconds)
    if seconds >= 3600:
        return f"{sign}{seconds // 3600}:{(seconds % 3600) // 60:02d}:{seconds % 60:02d}"
    return f"{sign}{seconds // 60}:{seconds % 60:02d}"


def fmt_delta(seconds: float) -> str:
    return ("+" if seconds >= 0 else "") + fmt(seconds)


def load_athletes(path: Path) -> list[dict]:
    with path.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        missing = [column for column in REQUIRED_COLUMNS if column not in (reader.fieldnames or [])]
        if missing:
            sys.exit(f"error: {path} is missing columns: {', '.join(missing)}")
        athletes = []
        for row in reader:
            athlete = {"name": row["name"].strip(), "division": row["division"].strip()}
            try:
                for column in [*RUNS, *[key for key, _ in STATIONS], "roxzone"]:
                    athlete[column] = parse_time(row[column])
            except ValueError as error:
                sys.exit(f"error: bad time for {athlete['name']}: {error}")
            athlete["run_total"] = sum(athlete[run] for run in RUNS)
            athlete["station_total"] = sum(athlete[key] for key, _ in STATIONS)
            athlete["total"] = athlete["run_total"] + athlete["station_total"] + athlete["roxzone"]
            athletes.append(athlete)
    if not athletes:
        sys.exit(f"error: no rows in {path}")
    return athletes


def division_of(athletes: list[dict], division: str) -> list[dict]:
    field = [athlete for athlete in athletes if athlete["division"] == division]
    return sorted(field, key=lambda athlete: athlete["total"])


def median_for(field: list[dict], column: str) -> float:
    return statistics.median(athlete[column] for athlete in field)


def field_summary(athletes: list[dict]) -> str:
    lines = ["## Field summary", ""]
    lines.append("| Division | Athletes | Median total | Median runs | Median stations | Median roxzone | Widest-spread station |")
    lines.append("|---|---|---|---|---|---|---|")
    for division in sorted({athlete["division"] for athlete in athletes}):
        field = division_of(athletes, division)
        spreads = []
        for key, label in STATIONS:
            times = sorted(athlete[key] for athlete in field)
            lo = times[len(times) // 4]
            hi = times[(3 * len(times)) // 4]
            spreads.append((hi - lo, label))
        spread, spread_label = max(spreads)
        lines.append(
            f"| {division} | {len(field)} | {fmt(median_for(field, 'total'))} "
            f"| {fmt(median_for(field, 'run_total'))} | {fmt(median_for(field, 'station_total'))} "
            f"| {fmt(median_for(field, 'roxzone'))} | {spread_label} ({fmt(spread)} IQR) |"
        )
    lines.append("")
    lines.append("The widest-spread station is where the division separates — and where training time buys the most places.")
    return "\n".join(lines)


def athlete_report(athletes: list[dict], name: str) -> str:
    matches = [athlete for athlete in athletes if athlete["name"].lower() == name.lower()]
    if not matches:
        known = ", ".join(sorted(athlete["name"] for athlete in athletes))
        sys.exit(f"error: athlete {name!r} not found. Athletes in file: {known}")
    athlete = matches[0]
    field = division_of(athletes, athlete["division"])
    rank = field.index(athlete) + 1

    lines = [f"# Split report — {athlete['name']}", ""]
    lines.append(
        f"**Division:** {athlete['division']} · **Total:** {fmt(athlete['total'])} · "
        f"**Rank:** {rank} of {len(field)}"
    )
    lines.append("")

    lines.append("## Race in order")
    lines.append("")
    lines.append("| Segment | Time | vs division median |")
    lines.append("|---|---|---|")
    for index, run in enumerate(RUNS):
        lines.append(f"| Run {index + 1} (1 km) | {fmt(athlete[run])} | {fmt_delta(athlete[run] - median_for(field, run))} |")
        if index < len(STATIONS):
            key, label = STATIONS[index]
            lines.append(f"| {label} | {fmt(athlete[key])} | {fmt_delta(athlete[key] - median_for(field, key))} |")
    lines.append(f"| Roxzone (all transitions) | {fmt(athlete['roxzone'])} | {fmt_delta(athlete['roxzone'] - median_for(field, 'roxzone'))} |")
    lines.append("")

    run_share = 100 * athlete["run_total"] / athlete["total"]
    station_share = 100 * athlete["station_total"] / athlete["total"]
    rox_share = 100 * athlete["roxzone"] / athlete["total"]
    lines.append("## Where the time went")
    lines.append("")
    lines.append(f"- Runs: {fmt(athlete['run_total'])} ({run_share:.0f}%)")
    lines.append(f"- Stations: {fmt(athlete['station_total'])} ({station_share:.0f}%)")
    lines.append(f"- Roxzone: {fmt(athlete['roxzone'])} ({rox_share:.0f}%)")
    lines.append("")

    front = statistics.mean(athlete[run] for run in RUNS[:4])
    back = statistics.mean(athlete[run] for run in RUNS[4:])
    fade = back - front
    lines.append(f"**Run fade:** back-half run legs average {fmt_delta(fade)} vs front half.")
    lines.append("")

    losses = []
    for key, label in [*STATIONS, ("roxzone", "Roxzone")]:
        losses.append((athlete[key] - median_for(field, key), key, label))
    losses.sort(reverse=True)
    top = [loss for loss in losses if loss[0] > 0][:3]

    lines.append("## Biggest losses vs the field")
    lines.append("")
    if top:
        for delta, _, label in top:
            lines.append(f"- {label}: {fmt_delta(delta)} vs division median")
    else:
        lines.append("- None — every station at or under the division median.")
    lines.append("")

    if top:
        delta, key, label = top[0]
        projected = athlete["total"] - delta
        better = sum(1 for other in field if other["total"] < projected)
        lines.append(
            f"**What-if:** {label} at the division median -> projected total {fmt(projected)}, "
            f"rank {better + 1} of {len(field)}."
        )
        lines.append("")

    lines.append("## Coach notes")
    lines.append("")
    if top:
        delta, _, label = top[0]
        lines.append(f"- Priority: {label} — the single biggest gap to the field ({fmt_delta(delta)}).")
    if fade > FADE_FLAG_SECONDS:
        lines.append(f"- Pacing: {fmt(fade)} run fade suggests the front half is over-paced; rehearse compromised running.")
    else:
        lines.append("- Pacing: run splits are even — race plan held together.")
    if athlete["roxzone"] - median_for(field, "roxzone") > 15:
        lines.append("- Transitions: roxzone is leaking time; walk the floor plan and rehearse entries/exits.")
    lines.append("")
    return "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser(description="Parse HYROX result tables into coach-ready split analysis.")
    parser.add_argument("csv", nargs="?", default="sample_results.csv", help="result table CSV (default: sample_results.csv)")
    parser.add_argument("--athlete", help="generate a coach report for one athlete (default: field summary)")
    parser.add_argument("--out", help="write markdown to this file instead of stdout")
    args = parser.parse_args()

    athletes = load_athletes(Path(args.csv))
    report = athlete_report(athletes, args.athlete) if args.athlete else field_summary(athletes)
    if args.athlete:
        report += "\n" + field_summary(athletes)

    if args.out:
        Path(args.out).write_text(report + "\n", encoding="utf-8")
        print(f"wrote {args.out}")
    else:
        print(report)


if __name__ == "__main__":
    main()
