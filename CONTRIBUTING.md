# Contributing

Thanks for helping improve Awesome Sports AI. This repository is meant to be a practical, high-signal directory for people building sports AI tools, so every contribution should make the list easier to search, understand, and reuse.

## What Belongs Here

Add tools, apps, open-source projects, datasets, APIs, developer libraries, AI models, research benchmarks, event toolkits, or learning collections that are directly useful for sports builders, analysts, coaches, operators, creators, or researchers.

This directory is open-source first. Strong fits include:

- Open-source sports AI projects with runnable code.
- Open datasets, public APIs, or feeds that can power sports products.
- Developer libraries and SDKs for parsing, modeling, visualization, video, tracking, or operations.
- AI models or components that can be reused in sports workflows.
- Research benchmarks, reproducible papers, and simulation environments.
- Event toolkits that help builders ship around major sports moments.
- Learning collections that help builders get started quickly.

Commercial or closed products can be included only when they are useful builder references and are clearly marked `commercial-reference`.

Do not add:

- Broken links.
- Affiliate, referral, or tracking links.
- Pure advertisements or press releases.
- Duplicate entries.
- Tools with unclear ownership, purpose, or availability.
- Personal contact details or private data.

## Catalog Source of Truth

[`data/catalog.json`](data/catalog.json) is the canonical catalog. Every README entry should have a matching catalog tool record and exactly one hidden marker in README:

```markdown
- <!-- catalog:tool-id --> [Tool Name](https://example.com) - Clear one-sentence description. _Sports: Basketball. AI: Data ingestion. Access: open-api._
```

Use lowercase kebab-case IDs, for example `statsbomb-open-data` or `llm-match-commentator`.

## Resource-Type Categories

Choose one canonical category from `data/catalog.json`:

- Apps & Products
- Open-Source Projects
- Datasets/APIs/Feeds
- Developer Libraries/SDKs
- AI Models/Components
- Research Benchmarks
- Event Toolkits
- Learning Collections

If a tool fits several categories, choose the category that describes what a developer primarily gets from the link. Use AI capability tags for secondary discovery instead of duplicating entries.

## Sport Tags

Every new entry must include the smallest accurate set of sport tags.

Current sport tags: `Soccer`, `Basketball`, `American Football`, `Baseball/Softball`, `Tennis/Racquet`, `Running/Track`, `Cycling`, `Swimming`, `Ice Hockey`, `Rugby`, `Cricket`, `Volleyball`, `Golf`, `Combat Sports`, `Motorsport`, `Esports`, `Multi-sport`.

Use `Multi-sport` for tools designed to work across many sports, generic APIs, infrastructure, visualization libraries, video tooling, and datasets not tied to one sport.

## AI Capability Tags

Choose one or more capability IDs from `data/catalog.json`:

- `data-ingestion`
- `computer-vision`
- `tracking`
- `analytics-modeling`
- `llm-nlp`
- `media-generation`
- `training-load`
- `operations`
- `simulation-rl`
- `benchmarking`

## Openness Labels

Choose one access label:

- `open-source`
- `open-data`
- `open-api`
- `free-dev-tier`
- `paper-benchmark`
- `commercial-reference`

## Entry Quality

A good entry should:

- Be clearly related to sports or sports technology.
- Have a stable public URL.
- Be useful beyond a single private team or one-off campaign.
- Include a neutral one-sentence description.
- Fit one existing resource-type category.
- Include visible sport, AI capability, and access metadata.

Good:

```markdown
- <!-- catalog:example-sports-api --> [Example Sports API](https://example.com) - Provides fixtures, scores, and team statistics for sports applications. _Sports: Multi-sport. AI: Data ingestion. Access: open-api._
```

Needs work:

```markdown
- [Example Sports API](https://example.com) - The best and most amazing sports platform ever!!!
```

## Pull Request Checklist

Before opening a pull request, confirm that:

- The link works.
- The entry is not already listed.
- The description is neutral and concise.
- The entry has one canonical resource-type category.
- The entry includes sport tags, AI capability tags, and an openness label.
- The README entry includes exactly one `<!-- catalog:... -->` marker.
- `data/catalog.json` includes the matching tool record.
- Builder recipes reference existing catalog `toolIds` if changed.
- Markdown renders cleanly.
- `node --test scripts/*.test.mjs` passes.

## Review Process

Maintainers may edit wording, move entries between categories, ask for more context, or decline entries that do not fit the scope. A declined entry is not a judgment on the tool; it usually means the list needs to stay focused and easy to trust.

## Code of Conduct

By contributing, you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).
