import {
  getFifthRoleFromIndustry,
  type IndustryMapRole,
} from "@/config/industryQuestionMap";
import {
  ALL_ROLES,
  CORE_ROLE_ORDER,
  buildQuestionForRole,
} from "@/lib/assessment/questions";
import type {
  AiEmployeeRole,
  AssessmentQuestion,
  RegistrationData,
} from "@/lib/assessment/types";

const EXTRA_ROLES: AiEmployeeRole[] = [
  "RESEARCH",
  "RECEPTION",
  "SUPPORT",
  "PA",
  "SALES",
  "MARKETING",
  "OPERATIONS",
  "ACCOUNTS",
];

function resolveFifthRole(
  mapped: IndustryMapRole,
  core: AiEmployeeRole[]
): AiEmployeeRole {
  if (mapped !== "RANDOM") {
    return mapped;
  }

  const pool = EXTRA_ROLES.filter((r) => !core.includes(r));
  const candidates = pool.length > 0 ? pool : ALL_ROLES;
  const idx = Math.floor(Math.random() * candidates.length);
  return candidates[idx]!;
}

export type BuiltAssessmentSession = {
  industry: string;
  roleKeys: AiEmployeeRole[];
  questions: AssessmentQuestion[];
  fifthRole: AiEmployeeRole;
};

/**
 * Always: SALES → MARKETING → OPERATIONS → ACCOUNTS
 * Then append industry-mapped 5th role question.
 */
export function buildAssessmentSession(
  registration: RegistrationData
): BuiltAssessmentSession {
  const industry = registration.industry;
  const mapped = getFifthRoleFromIndustry(industry);
  const core = [...CORE_ROLE_ORDER];
  const fifthRole = resolveFifthRole(mapped, core);
  const roleKeys: AiEmployeeRole[] = [...core, fifthRole];
  const questions = roleKeys.map(buildQuestionForRole);

  return {
    industry,
    roleKeys,
    questions,
    fifthRole,
  };
}
