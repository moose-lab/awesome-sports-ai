import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const catalog = JSON.parse(read("data/catalog.json"));
const readme = read("README.md");

const expectedCategoryIds = [
  "apps-products",
  "open-source-projects",
  "datasets-apis-feeds",
  "developer-libraries-sdks",
  "ai-models-components",
  "research-benchmarks",
  "event-toolkits",
  "learning-collections",
];

const expectedSportTags = [
  "Soccer",
  "Basketball",
  "American Football",
  "Baseball/Softball",
  "Tennis/Racquet",
  "Running/Track",
  "Cycling",
  "Swimming",
  "Ice Hockey",
  "Rugby",
  "Cricket",
  "Volleyball",
  "Golf",
  "Combat Sports",
  "Motorsport",
  "Esports",
  "Multi-sport",
];

const expectedCapabilities = [
  "data-ingestion",
  "computer-vision",
  "tracking",
  "analytics-modeling",
  "llm-nlp",
  "media-generation",
  "training-load",
  "operations",
  "simulation-rl",
  "benchmarking",
];

const expectedOpenness = [
  "open-source",
  "open-data",
  "open-api",
  "free-dev-tier",
  "paper-benchmark",
  "commercial-reference",
];

const ids = (items) => items.map((item) => item.id);
const byId = (items) => new Map(items.map((item) => [item.id, item]));
const unique = (values) => new Set(values).size === values.length;
const escapeRegExp = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const readOptionsForField = (templatePath, fieldId) => {
  const lines = read(templatePath).split("\n");
  const idIndex = lines.findIndex((line) => line.trim() === `id: ${fieldId}`);
  assert.notEqual(idIndex, -1, `${templatePath} missing id: ${fieldId}`);

  const optionsIndex = lines.findIndex((line, index) => index > idIndex && line.trim() === "options:");
  assert.notEqual(optionsIndex, -1, `${templatePath} missing options for ${fieldId}`);

  const options = [];
  for (let index = optionsIndex + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (/^  - type: /.test(line)) break;
    const option = line.match(/^\s+- "?([^"]+?)"?\s*$/);
    if (option) options.push(option[1]);
  }
  return options;
};

test("catalog publishes stable taxonomy enums", () => {
  assert.deepEqual(ids(catalog.categories), expectedCategoryIds);
  assert.deepEqual(catalog.sportTags, expectedSportTags);
  assert.deepEqual(ids(catalog.aiCapabilities), expectedCapabilities);
  assert.deepEqual(catalog.openness, expectedOpenness);
});

test("catalog entries use valid IDs, enums, and required fields", () => {
  const categoryIds = new Set(ids(catalog.categories));
  const sportTags = new Set(catalog.sportTags);
  const capabilityIds = new Set(ids(catalog.aiCapabilities));
  const openness = new Set(catalog.openness);
  const toolIds = ids(catalog.tools);

  assert.ok(catalog.tools.length >= 45, "expected a useful initial catalog");
  assert.ok(unique(toolIds), "tool IDs must be unique");

  catalog.tools.forEach((tool) => {
    assert.match(tool.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(tool.title, `${tool.id} missing title`);
    assert.match(tool.url, /^https?:\/\/|^\.\//, `${tool.id} must use a public or local URL`);
    assert.ok(tool.description, `${tool.id} missing description`);
    assert.ok(categoryIds.has(tool.categoryId), `${tool.id} has invalid category ${tool.categoryId}`);
    assert.ok(tool.sportTags.length > 0, `${tool.id} missing sport tags`);
    tool.sportTags.forEach((tag) => assert.ok(sportTags.has(tag), `${tool.id} invalid sport tag ${tag}`));
    assert.ok(tool.aiCapabilities.length > 0, `${tool.id} missing AI capabilities`);
    tool.aiCapabilities.forEach((capability) => {
      assert.ok(capabilityIds.has(capability), `${tool.id} invalid capability ${capability}`);
    });
    assert.ok(openness.has(tool.openness), `${tool.id} invalid openness ${tool.openness}`);
  });
});

test("builder recipes reference catalog tools", () => {
  const toolIds = new Set(ids(catalog.tools));
  const recipeIds = ids(catalog.recipes);

  assert.ok(catalog.recipes.length >= 6, "expected builder recipes");
  assert.ok(unique(recipeIds), "recipe IDs must be unique");

  catalog.recipes.forEach((recipe) => {
    assert.match(recipe.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(recipe.title, `${recipe.id} missing title`);
    assert.ok(recipe.goal, `${recipe.id} missing goal`);
    assert.ok(recipe.toolIds.length >= 3, `${recipe.id} should reference several tools`);
    recipe.toolIds.forEach((toolId) => assert.ok(toolIds.has(toolId), `${recipe.id} references ${toolId}`));
  });
});

test("README follows the audit's catalog-first awesome-list structure", () => {
  const orderedSections = [
    "## Table of Contents",
    "## The Catalog",
    "## The Prototype Factory",
    "## Builder Paths & Resources",
    "## Community & Related Lists",
    "## Contributing",
    "## License",
  ];

  let previousIndex = -1;
  orderedSections.forEach((heading) => {
    const index = readme.indexOf(heading);
    assert.notEqual(index, -1, `README missing ${heading}`);
    assert.ok(index > previousIndex, `${heading} must appear after the previous major section`);
    previousIndex = index;
  });

  const toc = readme.match(/## Table of Contents\n([\s\S]+?)\n## The Catalog/);
  assert.ok(toc, "README missing Table of Contents block before The Catalog");
  catalog.categories.forEach((category) => {
    assert.match(toc[1], new RegExp(`\\[${escapeRegExp(category.label)}\\]\\(#`));
  });

  assert.doesNotMatch(readme, /## Featured Event Toolkits/);
  assert.doesNotMatch(readme, /Congratulations, New York Knicks/);
  assert.doesNotMatch(readme, /\[!\[[^\]]+\]\(visualizations\//);
});

test("README exposes catalog categories and one marker per tool", () => {
  const categoryLabels = catalog.categories.map((category) => category.label);
  const directory = readme.match(/## The Catalog\n([\s\S]+?)\n## The Prototype Factory/);
  assert.ok(directory, "README missing The Catalog section");

  const headings = [...directory[1].matchAll(/^### (.+)$/gm)].map((match) => match[1]);
  assert.deepEqual(headings, categoryLabels);

  catalog.tools.forEach((tool) => {
    const marker = `<!-- catalog:${tool.id} -->`;
    const count = readme.split(marker).length - 1;
    assert.equal(count, 1, `README must include exactly one marker for ${tool.id}`);
  });
});

test("README catalog entries use the standard audit tag format", () => {
  catalog.tools.forEach((tool) => {
    const marker = `<!-- catalog:${escapeRegExp(tool.id)} -->`;
    const entryPattern = new RegExp(
      `^- ${marker} \\[[^\\]]+\\]\\([^)]+\\) - .+\\. \\(Tags: Sports: .+\\. AI: .+\\. Access: .+\\.\\)$`,
      "m",
    );
    assert.match(readme, entryPattern, `${tool.id} must use the standard catalog entry format`);
  });
});

test("README presents prototypes as a compact factory table", () => {
  const prototypeFactory = readme.match(/## The Prototype Factory\n([\s\S]+?)\n## Builder Paths & Resources/);
  assert.ok(prototypeFactory, "README missing The Prototype Factory section");

  ["llm-match-commentator", "wnba-gravity-mapper", "pickleball-court-mapper"].forEach((prototypeId) => {
    assert.match(prototypeFactory[1], new RegExp(`\\| \`${escapeRegExp(prototypeId)}\` \\|`));
  });

  assert.doesNotMatch(prototypeFactory[1], /```/);
  assert.doesNotMatch(prototypeFactory[1], /\[!\[/);
});

test("issue templates stay in sync with catalog taxonomy", () => {
  assert.equal(existsSync(new URL("../.github/ISSUE_TEMPLATE/add-tool.yml", import.meta.url)), false);

  assert.deepEqual(
    readOptionsForField(".github/ISSUE_TEMPLATE/submit-tool.yml", "suggested-category"),
    [...catalog.categories.map((category) => category.label), "Not sure / maintainer can choose"],
  );

  assert.deepEqual(
    readOptionsForField(".github/ISSUE_TEMPLATE/new-prototype.yml", "ai-capability"),
    catalog.aiCapabilities.map((capability) => capability.label),
  );
});
