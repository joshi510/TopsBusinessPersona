import { getEmployeeAsset, type EmployeeAsset } from "@/lib/employeeAssets";
import type { AiEmployeeRole, SelectedAnswer } from "@/lib/assessment/types";

export type RankedRole = {
  roleKey: AiEmployeeRole;
  painScore: number;
  matchPercent: number;
  asset: EmployeeAsset;
};

export type ResultViewModel = {
  primaryRole: RankedRole;
  runnerUpRoles: RankedRole[];
  ranked: RankedRole[];
};

/**
 * Presentation-only ranking from already-collected answers.
 * Does not change assessment storage or scoring pipeline.
 */
export function buildResultView(
  answers: SelectedAnswer[]
): ResultViewModel | null {
  if (!answers.length) return null;

  const byRole = new Map<AiEmployeeRole, number>();
  const order: AiEmployeeRole[] = [];

  for (const a of answers) {
    if (!byRole.has(a.roleKey)) order.push(a.roleKey);
    byRole.set(a.roleKey, Math.max(byRole.get(a.roleKey) ?? 0, a.painScore));
  }

  const ranked: RankedRole[] = [...byRole.entries()]
    .map(([roleKey, painScore]) => ({
      roleKey,
      painScore,
      matchPercent: painToMatchPercent(painScore),
      asset: getEmployeeAsset(roleKey),
    }))
    .sort((a, b) => {
      if (b.painScore !== a.painScore) return b.painScore - a.painScore;
      return order.indexOf(a.roleKey) - order.indexOf(b.roleKey);
    });

  // Premium display floor so reveal feels strong
  if (ranked[0]) {
    ranked[0] = {
      ...ranked[0],
      matchPercent: Math.max(ranked[0].matchPercent, 82),
    };
  }
  ranked.slice(1, 3).forEach((r, i) => {
    ranked[i + 1] = {
      ...r,
      matchPercent: Math.min(
        ranked[0]!.matchPercent - 6 - i * 4,
        Math.max(r.matchPercent, 64 - i * 4)
      ),
    };
  });

  return {
    primaryRole: ranked[0]!,
    runnerUpRoles: ranked.slice(1, 3),
    ranked,
  };
}

function painToMatchPercent(pain: number): number {
  const map: Record<number, number> = {
    0: 58,
    1: 72,
    2: 86,
    3: 94,
  };
  return map[pain] ?? 70;
}
