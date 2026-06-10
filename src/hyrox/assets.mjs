import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(dirname(fileURLToPath(import.meta.url))));
const assetRegistry = JSON.parse(readFileSync(join(root, "data", "hyrox", "training-assets.json"), "utf8"));

const categoryLabels = {
  official_reference: "Official reference / 官方资料",
  science_and_methodology: "Science and methodology / 科学依据",
  video_and_technique: "Video and technique / 视频与技术",
  blogs_and_training_guides: "Blogs and training guides / 博客与训练指南",
  podcasts_and_media: "Podcasts and media / 播客与媒体"
};

export function flattenTrainingAssets(registry = assetRegistry) {
  return Object.entries(registry)
    .filter(([, value]) => Array.isArray(value))
    .flatMap(([category, entries]) =>
      entries.map((entry, index) => ({
        ...entry,
        category,
        category_label: categoryLabels[category] ?? category,
        ordinal: index + 1
      }))
    );
}

export function assetCategorySummary(registry = assetRegistry) {
  return Object.entries(registry)
    .filter(([, value]) => Array.isArray(value))
    .map(([category, entries]) => ({
      category,
      label: categoryLabels[category] ?? category,
      count: entries.length
    }));
}

export function recommendedSourceAnchors(registry = assetRegistry) {
  const assets = flattenTrainingAssets(registry);
  const pick = (predicate) => assets.find(predicate);

  return [
    pick((asset) => asset.title === "HYROX - The Fitness Race"),
    pick((asset) => asset.title === "HYROX Best Preparation"),
    pick((asset) => asset.asset_type === "peer-reviewed study"),
    pick((asset) => asset.title === "HYROX YouTube"),
    pick((asset) => asset.asset_type === "podcast")
  ].filter(Boolean);
}

export function renderAssetSummaryLines(registry = assetRegistry) {
  return [
    `HYROX training asset registry / HYROX 训练资产库`,
    `Last verified / 最近验证: ${registry.meta.last_verified}`,
    "",
    ...assetCategorySummary(registry).map((item) => `${item.label}: ${item.count}`)
  ];
}
