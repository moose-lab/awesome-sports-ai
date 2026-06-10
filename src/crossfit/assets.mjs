import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(dirname(fileURLToPath(import.meta.url))));
const assetRegistry = JSON.parse(readFileSync(join(root, "data", "crossfit", "training-assets.json"), "utf8"));

const categoryLabels = {
  official_crossfit_methodology: "Official CrossFit methodology / 官方 CrossFit 方法论",
  chinese_creator_notes: "Chinese creator notes / 中文创作者笔记",
  professional_and_athlete_video: "Professional and athlete video / 专业运动员与教练视频",
  science_and_safety: "Science and safety / 科学与安全"
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
    pick((asset) => asset.title === "CrossFit - What Is CrossFit?"),
    pick((asset) => asset.title === "CrossFit Level 1 Training Guide"),
    pick((asset) => asset.title === "A Theoretical Template for CrossFit Programming"),
    pick((asset) => asset.title === "CrossFit 的 Scale，不是降低难度而是……"),
    pick((asset) => asset.title === "CrossFit YouTube")
  ].filter(Boolean);
}

export function renderAssetSummaryLines(registry = assetRegistry) {
  return [
    "CrossFit training asset registry / CrossFit 训练资产库",
    `Last verified / 最近验证: ${registry.meta.last_verified}`,
    `Xiaohongshu status / 小红书状态: ${registry.meta.xiaohongshu_status}`,
    "",
    ...assetCategorySummary(registry).map((item) => `${item.label}: ${item.count}`)
  ];
}
