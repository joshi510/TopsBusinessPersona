import type { AssessmentState, RegistrationData } from "@/lib/assessment/types";

export const ASSESSMENT_STORAGE_KEY = "bap_assessment_state";

export type PersistedAssessmentState = Pick<
  AssessmentState,
  | "registrationData"
  | "industry"
  | "roleKeys"
  | "questions"
  | "currentQuestionIndex"
  | "selectedAnswers"
  | "painScores"
  | "completedAnswers"
>;

export function loadPersistedAssessment(): PersistedAssessmentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(ASSESSMENT_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PersistedAssessmentState;
  } catch {
    return null;
  }
}

export function persistAssessment(state: PersistedAssessmentState): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(ASSESSMENT_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore quota */
  }
}

export function clearPersistedAssessment(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(ASSESSMENT_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export function loadRegistrationFromIntake(): RegistrationData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem("bap_intake");
    if (!raw) return null;
    return JSON.parse(raw) as RegistrationData;
  } catch {
    return null;
  }
}
