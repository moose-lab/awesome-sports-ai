---
name: hyrox
description: Generate level-aware HYROX training guidance, daily plans, race-prep notes, and source-backed preparation advice for casual starters through elite-pathway athletes.
---

# HYROX Training Skill

Use this skill when the user asks for HYROX training, today's HYROX plan, race preparation, station advice, pacing, movement standards, or progression from beginner to competitive/elite HYROX.

## Data Sources

Prefer local structured data first:

- `data/hyrox/training-assets.json`
- `data/hyrox/training-program.json`
- `scripts/hyrox-day-plan.mjs`

Refresh the public web when the user asks about current rules, current weights, current race dates, current rankings, Elite 15 status, partner availability, or anything that may have changed after the local `last_verified` date.

## Intake

Ask for missing fields only when needed. For today's plan, use defaults and continue.

Useful profile fields:

- Race date or start date.
- Target division: Open, Pro, Doubles, Relay, Adaptive, or unknown.
- Level: casual, recreational, competitive, or elite.
- Current running ability: 5 km time or continuous-run duration.
- Equipment access: sled, SkiErg, rower, kettlebells, sandbag, wall-ball target.
- Injury constraints or medical red flags.
- Weekly time budget and available days.

Default when unspecified:

- Level: recreational.
- Week: 1.
- Day: current weekday.
- Goal: safe Open/Doubles preparation.

## Daily Plan Workflow

1. Determine level and date context.
2. If the user provides `start_date` and `target_date`, derive the week/day.
3. Call:

```bash
node scripts/hyrox-day-plan.mjs --level <level> --week <week> --day <day>
```

or:

```bash
node scripts/hyrox-day-plan.mjs --level <level> --start-date <YYYY-MM-DD> --date <YYYY-MM-DD>
```

4. Summarize the output into a compact coach-style answer.
5. Add readiness adjustment:
   - Green: do as written.
   - Yellow: reduce load or rounds by 20-30 percent.
   - Red: mobility/rest and seek qualified help for red-flag symptoms.
6. Include one source anchor only when the answer depends on a rule, race format, or science claim.

## Training Principles

- HYROX is running-dominant and station-fatigued. Do not plan isolated station work without run integration during build and race-specific phases.
- Casual starters need adherence and tissue tolerance before intensity.
- Recreational athletes need a balance of running, strength, station density, and recovery.
- Competitive athletes need repeatable 1 km pacing under fatigue and race-load station standards.
- Elite-pathway athletes need individualized benchmarking, coach oversight, and careful recovery management.
- Keep at least one true recovery/rest day in most weeks.
- Avoid increasing both volume and intensity in the same week unless the user is elite and recovery data is strong.

## Response Format

For daily plans:

```markdown
**Today**
Level: ...
Week/Phase: ...
Session: ...
Duration/Intensity: ...

Warm-up:
- ...

Main:
- ...

Cooldown:
- ...

Adjustments:
- ...

Watch-outs:
- ...
```

For broader plans, explain the phase structure, weekly rhythm, assessment checkpoints, and exactly when to deload or taper.

## Safety

This skill is not medical advice. Stop the session and recommend qualified medical support for chest pain, fainting, acute injury, severe shortness of breath, sudden swelling, neurological symptoms, or pain that changes gait. For known chronic conditions, pregnancy/postpartum, major weight loss goals, or return from injury, recommend professional supervision.
