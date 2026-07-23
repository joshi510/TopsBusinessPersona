import type { IntakeFormValues } from "@/lib/intake-schema";
import { INDUSTRIES } from "@/lib/intake-schema";

export type IndustryLabel = (typeof INDUSTRIES)[number];

export type AiEmployeeRole =
  | "SALES"
  | "MARKETING"
  | "OPERATIONS"
  | "ACCOUNTS"
  | "RESEARCH"
  | "RECEPTION"
  | "SUPPORT"
  | "PA";

export type PainScore = 0 | 1 | 2 | 3;

export type AssessmentOption = {
  /** Same as optionId — used by the existing quiz UI */
  id: string;
  optionId: string;
  letter: string;
  label: string;
  roleKey: AiEmployeeRole;
  questionId: string;
  painScore: PainScore;
};

export type AssessmentQuestion = {
  id: string;
  roleKey: AiEmployeeRole;
  text: string;
  options: AssessmentOption[];
};

export type SelectedAnswer = {
  roleKey: AiEmployeeRole;
  questionId: string;
  optionId: string;
  painScore: PainScore;
  letter: string;
  label: string;
};

export type RegistrationData = IntakeFormValues;

export type AssessmentState = {
  registrationData: RegistrationData | null;
  industry: string | null;
  /** Ordered role keys for this session (4 core + 1 industry) */
  roleKeys: AiEmployeeRole[];
  /** Built question list for this session */
  questions: AssessmentQuestion[];
  currentQuestionIndex: number;
  /** questionId → selected answer */
  selectedAnswers: Record<string, SelectedAnswer>;
  /** Collected pain scores by questionId (no aggregation yet) */
  painScores: Record<string, PainScore>;
  /** Snapshot after Q5 submit, for Result page */
  completedAnswers: SelectedAnswer[] | null;
  isHydrated: boolean;
};
