<!-- Thanks for contributing. Short PRs land fast — one tool or one fix per PR is perfect. -->

## What kind of change is this?

- [ ] New catalog entry (tool, dataset, API, library, model, benchmark, or learning resource)
- [ ] HYROX Zone listing or gap graduation
- [ ] Prototype improvement
- [ ] Docs, tests, or infrastructure

## Catalog entry checklist

<!-- Delete this section if your PR does not add or change a catalog entry. -->

- [ ] The link works and the entry is not already listed.
- [ ] The description is one neutral sentence ending with a period.
- [ ] The README entry uses the compact format: `- **[Name](url)** - Description. *(Sports: …; AI: …)*`
- [ ] `data/catalog.json` has the matching `tools[]` record (category, sport tags, AI capabilities, openness label).
- [ ] If the tool joins a sport zone: `scenes[]` and `docs/sports/<slug>.md` stay in sync (gap moved to `toolIds` if one shipped).
- [ ] `node --test scripts/*.test.mjs` passes locally.

## Anything the reviewer should know?

<!-- Optional: context, open questions, or what you want feedback on.
     First PR here? Welcome — if main moves while this is open, we rebase it, we don't bounce it. -->
