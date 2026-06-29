# Sports Scenario Guides

Sports Scenario Guides are the sport-facing layer of Awesome Sports AI. They help coaches, analysts, operators, and builders start from a sport problem, then discover the catalog tools and prototype gaps that fit that problem.

This directory is intentionally separate from the main README. New sports should be added here and linked from this index; contributors do not need to modify the root `README.md` for every new sport.

## Two-Axis Architecture

Awesome Sports AI uses two navigation axes:

| Axis | Reader question | Source of truth |
|------|-----------------|-----------------|
| Sport scenario axis | "What problem am I solving in this sport?" | `docs/sports/*.md` |
| Resource-type axis | "What kind of tool, dataset, model, benchmark, or prototype do I need?" | [`data/catalog.json`](../../data/catalog.json) and the root README catalog |

The sport guides sit on top of the catalog. They do not duplicate the full catalog record; they map catalog resources into sport-specific scenarios and identify prototype opportunities.

## Design Principles

1. Scene first, not tool first. Each main section title names the problem to solve, such as "Pace and Route Analysis", instead of naming a tool. This lets coaches and analysts find their workflow before they need to understand the technology stack.
2. Cross-domain tools are explicit. When a resource was built for another sport but its pattern is useful here, mark it with `*(Cross-domain)*`. This is high-signal curation because it tells readers which ideas are worth studying beyond their original sport.
3. Gaps become the prototype roadmap. Every sport guide ends with `Gaps: Tools Yet to be Built`, turning missing resources into `/prototypes` candidates and issue ideas.

## Guide Index

| Sport guide | Primary readers | Scenario coverage | Sports AI Hub route hint | Path |
|-------------|-----------------|-------------------|--------------------------|------|
| Football | Analysts, scouts, coaches, match-report builders | Match intelligence; scouting boards; video and event review; shot quality | `/sports/football` | [football.md](football.md) |
| Basketball | NBA/WNBA analysts, coaches, scouts, player-development builders | Spacing and gravity; player and game data; video tracking; shot and lineup insight | `/sports/basketball` | [basketball.md](basketball.md) |
| HYROX | Race operators, functional-fitness coaches, venue builders | Event operations; station split analysis; movement standard validation | `/sports/hyrox` | [hyrox.md](hyrox.md) |
| Running and Endurance | Coaches, runners, route analysts, biomechanics builders | Training load monitoring; pace and route analysis; posture and biomechanics | `/sports/running` | [running.md](running.md) |

## Standard Guide Template

Use this structure for every new sport:

```markdown
# <Sport> AI Scenario Guide

## Guide Metadata

| Field | Value |
|-------|-------|
| Slug | <lowercase-kebab-case> |
| Sport scope | <sport, discipline, or endurance category> |
| Primary readers | <coach, analyst, operator, builder, athlete, editor> |
| Catalog tags to inspect | <sport tags and AI capabilities from data/catalog.json> |
| Sports AI Hub route hint | /sports/<slug> |

## <Problem to Solve>

Explain the sport workflow, useful catalog resources, cross-domain patterns, and a starter build.

## <Problem to Solve>

Repeat for the next scenario.

## Cross-Domain Patterns to Study

List resources that are not native to the sport but have transferable product, data, or modeling patterns.

## Gaps: Tools Yet to be Built

List prototype candidates with input, output, and why they matter.
```

## How to Add a Sport

1. Choose a stable slug, such as `triathlon`, `basketball`, or `rowing`. Use lowercase kebab-case and create `docs/sports/<slug>.md`.
2. Start from the Standard Guide Template above. Keep section headings scenario-first, not tool-first.
3. Search [`data/catalog.json`](../../data/catalog.json) for relevant sport tags, AI capabilities, and tools. Link to catalog resources by their public URL or repository path.
4. Add cross-domain resources when their workflow transfers to the sport, and mark each one with `*(Cross-domain)*`.
5. End with `Gaps: Tools Yet to be Built`. Each gap should be specific enough to become a `/prototypes` issue.
6. Add the new guide to the Guide Index table in this file. Do not edit the root `README.md`.
7. Run `node --test scripts/*.test.mjs` before opening a pull request.

### Running and Endurance Example

To add a new endurance sport, copy `running.md`, rename the slug, and keep the same problem-first structure:

- Training load or readiness monitoring.
- Route, pace, lap, split, or terrain analysis.
- Biomechanics, technique, or form validation.
- Prototype gaps that convert missing workflows into small runnable tools.

## Sports AI Hub Sync Contract

Sports AI Hub should treat this directory as the source for sport learning pages:

1. Read this index to discover available sport guides.
2. Use each guide's `Guide Metadata` table for route labels and frontend route hints.
3. Render each level-two scenario heading as a user-facing learning/build card.
4. Preserve `*(Cross-domain)*` labels in the UI so readers can distinguish native tools from transferable patterns.
5. Render `Gaps: Tools Yet to be Built` as prototype roadmap candidates that can link to `/prototypes` or GitHub issue templates.
6. Do not require root `README.md` changes for a new sport to appear in the web app; the index table is the sync surface.
