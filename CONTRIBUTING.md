# Contributing

Thanks for helping improve Awesome Sports AI. This repository is meant to be a practical, high-signal list, so every contribution should make the list easier to use.

## What Belongs Here

Add tools, platforms, datasets, APIs, libraries, or resources that are directly useful for sports builders, analysts, coaches, operators, creators, or researchers.

**🌟 2026 Focus Areas:** We are especially welcoming contributions related to the [2026 Strategic Roadmap](docs/roadmap-2026-strategy.md), including:
- Generative AI & Multimodal LLMs for sports video/audio
- Tools built for the FIFA World Cup 2026
- Women's Sports analytics (WNBA, NWSL, etc.)
- Emerging sports tech (Pickleball, Esports, Padel)

A good entry should:

- Be clearly related to sports or sports technology.
- Have a stable public URL.
- Be useful beyond a single private team or one-off campaign.
- Include a neutral one-sentence description.
- Fit an existing category, or justify a new category.

Do not add:

- Broken links.
- Affiliate, referral, or tracking links.
- Pure advertisements or press releases.
- Duplicate entries.
- Tools with unclear ownership, purpose, or availability.
- Personal contact details or private data.

## Entry Format

Use this format:

```markdown
- [Tool Name](https://example.com) - Clear one-sentence description of what it helps users do. _Sports: Basketball._
```

Keep descriptions short, factual, and free of hype. Start descriptions with a capital letter and end the description sentence before the sport tag suffix.

Good:

```markdown
- [Example Sports API](https://example.com) - Provides fixtures, scores, and team statistics for sports applications. _Sports: Multi-sport._
```

Needs work:

```markdown
- [Example Sports API](https://example.com) - The best and most amazing sports platform ever!!! _Sports: Multi-sport._
```

## Sport Tags

Every new entry must include one canonical category placement and one sport fit. In your pull request, include:

```markdown
Category: Analytics and Visualization
Sports: Soccer, Basketball
```

Use the current v1 sport tags: `Soccer`, `Basketball`, `American Football`, `Baseball/Softball`, `Tennis/Racquet`, `Running/Track`, `Cycling`, `Swimming`, `Ice Hockey`, `Rugby`, `Cricket`, `Volleyball`, `Golf`, `Combat Sports`, `Motorsport`, `Esports`, `Multi-sport`.

- Contributors choose the initial sport tag.
- Reviewers and auditors may normalize, add, or remove sport tags during review.
- Prefer the smallest accurate tag set: one sport when specific, 2-4 sports when genuinely proven, and `Multi-sport` when the tool is sport-agnostic.
- Use `Multi-sport` for tools designed to work across many sports, generic APIs, infrastructure, visualization libraries, video tooling, and datasets not tied to one sport.
- Add a new sport tag only when at least two accepted entries need it or when a major sport is clearly missing from the v1 vocabulary.

## Category Rules

- Put each entry in the most specific category that fits.
- Keep entries alphabetized within each category.
- Add a new category only when at least two entries clearly belong there.
- If a tool fits several categories, choose the category that describes its primary use.
- Do not duplicate the same entry across categories just because it supports several sports; use sport tags for cross-sport discovery.
- Keep category names short and easy to scan.

## Pull Request Checklist

Before opening a pull request, confirm that:

- The link works.
- The entry is not already listed.
- The description is neutral and concise.
- The entry is alphabetized inside its category.
- The category is appropriate.
- The entry includes a visible `_Sports: ..._` suffix.
- The pull request includes `Category:` and `Sports:` metadata for review.
- Markdown renders cleanly.

## Review Process

Maintainers may edit wording, move entries between categories, ask for more context, or decline entries that do not fit the scope. A declined entry is not a judgment on the tool; it usually means the list needs to stay focused and easy to trust.

## Code of Conduct

By contributing, you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).
