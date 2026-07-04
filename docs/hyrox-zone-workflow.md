# HYROX Zone: Contribution & Listing Workflow

How HYROX tools get built, contributed, and listed in this repository — the operating manual behind the [HYROX Zone](../README.md#hyrox-zone). Contributor paths first, maintainer duties after.

```
Contributors                          Maintainers
────────────                          ───────────
Have a tool  ──→ Path A (list it) ──┐
                                    ├──→ five-file listing PR ──→ review gates ──→ merge ──→ post-merge actions
Want to build ─→ Path B (claim)  ──┘
```

## Path A — List an Existing Tool (15 minutes and up)

Two routes, by contributor preference:

- **Form route** (no repo editing): file a [Submit a Tool](https://github.com/moose-lab/awesome-sports-ai/issues/new?template=submit-tool.yml) issue. The form fields already mirror the catalog taxonomy (category, sport tags, AI capabilities, openness), so a maintainer only normalizes and executes the five-file listing PR.
- **Direct-PR route** (developers): open the five-file listing PR yourself (checklist below). The "Simple Path for Early Scene Tools" rule in [CONTRIBUTING.md](../CONTRIBUTING.md) protects small tools: one public repo, one clear README, one sample input, one visible output is enough for review.

## Path B — Claim a Gap and Build (a weekend and up)

1. **Claim.** Open a [Claim a HYROX Gap](https://github.com/moose-lab/awesome-sports-ai/issues/new?template=claim-hyrox-gap.yml) issue and pick a gap by its canonical id. Claiming prevents collisions and lists you as the builder. Gaps quiet for 60+ days reopen for others.
2. **Build.** The zone does not host the tool — **you keep the repository under your own account**, named exact-match for its keyword (for example `hyrox-split-parser`). Copy the seed-tool shape of [hyrox-gym-finder](https://github.com/moose-lab/hyrox-gym-finder): one workflow, static-first, forkable. Input/output specs live in the [HYROX guide](sports/hyrox.md) scenario sections and the tool map.
3. **Deliver.** When it ships, open the five-file listing PR — and in the same PR move the entry out of `scenes[].gaps` into the matching section's `toolIds`, and flip its `buildTargets` status from `gap` to `live` (per CONTRIBUTING). The gap pool shrinks; the release-notes scoreboard updates.

## The Five-File Listing PR

Every listing lands the same way, whether a maintainer or the contributor drives it:

| # | File | Action |
|---|------|--------|
| 1 | `data/catalog.json` → `tools[]` | Add the record: kebab-case `id`, `title`, `url`, one neutral sentence, one `categoryId`, sport tags (HYROX tools currently use `Running/Track` + `Multi-sport`), AI capabilities, openness label |
| 2 | `data/catalog.json` → `scenes` (hyrox) | Append the id to the matching section's `toolIds` (`crossDomainToolIds` if it transfers in from another sport). If it was a gap: remove from `gaps[]` and set its `buildTargets` status to `live` |
| 3 | `README.md` | Two lines: a compact entry in the matching Catalog category (`**[Name](url)** - Description. *(Sports: …; AI: …)*` — tests require every catalog tool to appear there), plus a line on the HYROX Zone shelf |
| 4 | `docs/sports/hyrox.md` | Add to the matching scenario's resource list; if a gap shipped, remove it from "Gaps: Tools Yet to be Built". The guide is the narrative source, the scene is the structured contract — keep them in sync |
| 5 | Verification | `node --test scripts/*.test.mjs` passes locally; CI runs the same suite on the PR |

## Maintainer Review Gates

Before merging a listing PR, confirm:

1. **Relevance** — it connects a concrete HYROX workflow to AI, data, automation, or developer infrastructure (Sports & AI Relevance Rule). Generic fitness tools do not qualify by tag alone.
2. **Entry quality** — reachable public link, no duplicate, neutral description, exactly one category, full metadata.
3. **Runnable** — a developer can start it from its README within minutes; the zone's trust comes from live, runnable entries.
4. **Tests green** — the CI suite guards catalog/README consistency, id integrity, and section order.

## After the Merge (same day — concentrated launch window)

1. **Offer the badge.** Invite the tool's author to add the zone badge (snippet in CONTRIBUTING) — always optional, never a listing requirement. This is the flywheel's return path.
2. **Ledger it.** Record the listing in the next monthly zone release (`hyrox-zone-vX.Y`): "New in the zone", scoreboard numbers (live / gaps open / ideas unclaimed), and thanks by handle.
3. **Batch the noise.** If several things land in one week (new tool, cross-listing, release), announce them inside the same 24–48 h window rather than dripping.
4. **Refill the funnel.** Keep at least three open `good first issue` items so the [/contribute](https://github.com/moose-lab/awesome-sports-ai/contribute) page always offers a way in.

## Roles

First issue or PR → **listed builder** (tool on the shelf, named in the release) → **lane maintainer** (owns one lane — Train, Analyze, Judge, … — writes its gap specs, triages its claims, gets a standing line in every release).

## Cadence

- **Per listing:** five-file PR + review gates + same-day post-merge actions.
- **Monthly:** zone release with scoreboard; prune stale claims (60-day rule); check that `github.com/topics/hyrox` still shows the zone's repos on the first screen.
- **Quarterly:** re-audit the tool map — retire targets nobody wants, add lanes the community is actually asking for.
