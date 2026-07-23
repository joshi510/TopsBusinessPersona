import type { IndustryLabel } from "@/lib/assessment/types";

/**
 * Maps registration industry → 5th assessment role question.
 * OTHER resolves to a random role at session build time.
 */
export type IndustryMapRole =
  | "SALES"
  | "MARKETING"
  | "OPERATIONS"
  | "ACCOUNTS"
  | "RESEARCH"
  | "RECEPTION"
  | "SUPPORT"
  | "PA"
  | "RANDOM";

export const INDUSTRY_QUESTION_MAP: Record<string, IndustryMapRole> = {
  CERAMICS_TILES: "OPERATIONS",
  TEXTILE_DENIM: "RESEARCH",
  DIAMOND_JEWELLERY: "RECEPTION",
  CHEMICALS_PHARMA: "RESEARCH",
  ENGINEERING_AUTO_COMPONENTS: "OPERATIONS",
  AGRO_SPICES: "SUPPORT",
  DAIRY_VALUE_ADD: "OPERATIONS",
  LOGISTICS_FREIGHT: "PA",
  REAL_ESTATE: "RECEPTION",
  FMCG_DISTRIBUTION: "SUPPORT",
  OTHER: "RANDOM",
};

/** Registration dropdown label → map key */
export const INDUSTRY_LABEL_TO_KEY: Record<IndustryLabel, string> = {
  "Ceramics & Tiles": "CERAMICS_TILES",
  "Textile & Denim": "TEXTILE_DENIM",
  "Diamond & Jewellery": "DIAMOND_JEWELLERY",
  "Chemicals & Pharma": "CHEMICALS_PHARMA",
  "Engineering & Auto Components": "ENGINEERING_AUTO_COMPONENTS",
  "Agro & Spices": "AGRO_SPICES",
  "Dairy Value Add": "DAIRY_VALUE_ADD",
  "Logistics & Freight": "LOGISTICS_FREIGHT",
  "Real Estate": "REAL_ESTATE",
  "FMCG Distribution": "FMCG_DISTRIBUTION",
  Other: "OTHER",
};

export function getIndustryMapKey(industryLabel: string): string {
  return (
    INDUSTRY_LABEL_TO_KEY[industryLabel as IndustryLabel] ?? "OTHER"
  );
}

export function getFifthRoleFromIndustry(
  industryLabel: string
): IndustryMapRole {
  const key = getIndustryMapKey(industryLabel);
  return INDUSTRY_QUESTION_MAP[key] ?? "RANDOM";
}
