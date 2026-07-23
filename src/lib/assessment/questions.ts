import type {
  AiEmployeeRole,
  AssessmentOption,
  AssessmentQuestion,
  PainScore,
} from "@/lib/assessment/types";

const LETTERS = ["A", "B", "C", "D", "E"] as const;
const PAIN_BY_LETTER: Record<(typeof LETTERS)[number], PainScore> = {
  A: 3,
  B: 2,
  C: 1,
  D: 1,
  E: 0,
};

function buildOptions(
  roleKey: AiEmployeeRole,
  questionId: string,
  labels: [string, string, string, string, string]
): AssessmentOption[] {
  return LETTERS.map((letter, i) => {
    const optionId = `${questionId}_${letter}`;
    return {
      id: optionId,
      optionId,
      letter,
      label: labels[i],
      roleKey,
      questionId,
      painScore: PAIN_BY_LETTER[letter],
    };
  });
}

type RoleQuestionDef = {
  roleKey: AiEmployeeRole;
  text: string;
  labels: [string, string, string, string, string];
};

/**
 * One question per AI Employee role.
 * Core order: SALES → MARKETING → OPERATIONS → ACCOUNTS
 * Plus industry-driven 5th role.
 */
export const ROLE_QUESTIONS: Record<AiEmployeeRole, RoleQuestionDef> = {
  SALES: {
    roleKey: "SALES",
    text: "How painful is lead follow-up and closing deals for your team right now?",
    labels: [
      "Extremely painful — leads keep slipping",
      "Quite painful — follow-ups are inconsistent",
      "Moderate — we manage but it takes time",
      "Slightly — only occasional delays",
      "Not painful — sales is under control",
    ],
  },
  MARKETING: {
    roleKey: "MARKETING",
    text: "How much struggle do you face creating consistent marketing and campaigns?",
    labels: [
      "Extremely hard — content and campaigns stall",
      "Quite hard — output is inconsistent",
      "Moderate — we keep up with effort",
      "Slightly — only occasional gaps",
      "Not an issue — marketing runs smoothly",
    ],
  },
  OPERATIONS: {
    roleKey: "OPERATIONS",
    text: "How painful is day-to-day operations tracking, schedules, and handoffs?",
    labels: [
      "Extremely painful — constant coordination chaos",
      "Quite painful — missed updates are common",
      "Moderate — workable but manual",
      "Slightly — rare bottlenecks",
      "Not painful — operations run smoothly",
    ],
  },
  ACCOUNTS: {
    roleKey: "ACCOUNTS",
    text: "How painful are invoices, expenses, and payment follow-ups?",
    labels: [
      "Extremely painful — cash flow visibility is poor",
      "Quite painful — chasing payments takes hours",
      "Moderate — we manage with spreadsheets",
      "Slightly — occasional delays",
      "Not painful — accounts are under control",
    ],
  },
  RESEARCH: {
    roleKey: "RESEARCH",
    text: "How much do you need help researching products, markets, or compliance info?",
    labels: [
      "Extremely — research eats our week",
      "Quite a lot — finding answers is slow",
      "Moderate — we dig when needed",
      "Slightly — occasional lookups",
      "Not much — research is covered",
    ],
  },
  RECEPTION: {
    roleKey: "RECEPTION",
    text: "How painful is handling front-desk calls, visitors, and first responses?",
    labels: [
      "Extremely — we miss calls and walk-ins",
      "Quite painful — reception is overloaded",
      "Moderate — we manage peak hours",
      "Slightly — only busy periods hurt",
      "Not painful — front desk is covered",
    ],
  },
  SUPPORT: {
    roleKey: "SUPPORT",
    text: "How painful is answering the same customer questions and tickets?",
    labels: [
      "Extremely — support backlog never ends",
      "Quite painful — replies are delayed",
      "Moderate — we keep up with effort",
      "Slightly — occasional spikes",
      "Not painful — support is smooth",
    ],
  },
  PA: {
    roleKey: "PA",
    text: "How much do you need help with scheduling, reminders, and admin coordination?",
    labels: [
      "Extremely — admin work blocks the team",
      "Quite a lot — calendars and tasks slip",
      "Moderate — we juggle manually",
      "Slightly — only peak weeks",
      "Not much — admin is organized",
    ],
  },
};

export const CORE_ROLE_ORDER: AiEmployeeRole[] = [
  "SALES",
  "MARKETING",
  "OPERATIONS",
  "ACCOUNTS",
];

export const ALL_ROLES: AiEmployeeRole[] = [
  "SALES",
  "MARKETING",
  "OPERATIONS",
  "ACCOUNTS",
  "RESEARCH",
  "RECEPTION",
  "SUPPORT",
  "PA",
];

export function buildQuestionForRole(
  roleKey: AiEmployeeRole
): AssessmentQuestion {
  const def = ROLE_QUESTIONS[roleKey];
  const questionId = `q_${roleKey.toLowerCase()}`;
  return {
    id: questionId,
    roleKey,
    text: def.text,
    options: buildOptions(roleKey, questionId, def.labels),
  };
}
