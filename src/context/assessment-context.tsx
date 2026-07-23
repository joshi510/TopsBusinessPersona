"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { buildAssessmentSession } from "@/lib/assessment/build-session";
import {
  clearPersistedAssessment,
  loadPersistedAssessment,
  loadRegistrationFromIntake,
  persistAssessment,
} from "@/lib/assessment/storage";
import type {
  AssessmentOption,
  AssessmentQuestion,
  AssessmentState,
  RegistrationData,
  SelectedAnswer,
} from "@/lib/assessment/types";

type AssessmentContextValue = AssessmentState & {
  startAssessment: (registration: RegistrationData) => void;
  ensureSession: () => boolean;
  selectAnswer: (option: AssessmentOption) => void;
  goNext: () => boolean;
  goPrev: () => void;
  completeAssessment: () => SelectedAnswer[];
  currentQuestion: AssessmentQuestion | null;
  selectedOptionId: string | null;
  isLastQuestion: boolean;
  progressPercent: number;
  totalQuestions: number;
};

const AssessmentContext = createContext<AssessmentContextValue | null>(null);

const emptyState = (): AssessmentState => ({
  registrationData: null,
  industry: null,
  roleKeys: [],
  questions: [],
  currentQuestionIndex: 0,
  selectedAnswers: {},
  painScores: {},
  completedAnswers: null,
  isHydrated: false,
});

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AssessmentState>(emptyState);

  useEffect(() => {
    const persisted = loadPersistedAssessment();
    if (persisted?.questions?.length) {
      setState({
        ...emptyState(),
        ...persisted,
        isHydrated: true,
      });
      return;
    }

    const registration = loadRegistrationFromIntake();
    if (registration?.industry) {
      const session = buildAssessmentSession(registration);
      const next: AssessmentState = {
        ...emptyState(),
        registrationData: registration,
        industry: session.industry,
        roleKeys: session.roleKeys,
        questions: session.questions,
        isHydrated: true,
      };
      setState(next);
      persistAssessment({
        registrationData: next.registrationData,
        industry: next.industry,
        roleKeys: next.roleKeys,
        questions: next.questions,
        currentQuestionIndex: next.currentQuestionIndex,
        selectedAnswers: next.selectedAnswers,
        painScores: next.painScores,
        completedAnswers: next.completedAnswers,
      });
      return;
    }

    setState((s) => ({ ...s, isHydrated: true }));
  }, []);

  const syncPersist = useCallback((next: AssessmentState) => {
    persistAssessment({
      registrationData: next.registrationData,
      industry: next.industry,
      roleKeys: next.roleKeys,
      questions: next.questions,
      currentQuestionIndex: next.currentQuestionIndex,
      selectedAnswers: next.selectedAnswers,
      painScores: next.painScores,
      completedAnswers: next.completedAnswers,
    });
  }, []);

  const startAssessment = useCallback(
    (registration: RegistrationData) => {
      clearPersistedAssessment();
      const session = buildAssessmentSession(registration);
      const next: AssessmentState = {
        ...emptyState(),
        registrationData: registration,
        industry: session.industry,
        roleKeys: session.roleKeys,
        questions: session.questions,
        isHydrated: true,
      };
      setState(next);
      syncPersist(next);
    },
    [syncPersist]
  );

  const ensureSession = useCallback((): boolean => {
    if (state.questions.length > 0) return true;

    const registration =
      state.registrationData ?? loadRegistrationFromIntake();
    if (!registration?.industry) return false;

    const session = buildAssessmentSession(registration);
    const next: AssessmentState = {
      ...emptyState(),
      registrationData: registration,
      industry: session.industry,
      roleKeys: session.roleKeys,
      questions: session.questions,
      isHydrated: true,
    };
    setState(next);
    syncPersist(next);
    return true;
  }, [state.questions.length, state.registrationData, syncPersist]);

  const selectAnswer = useCallback(
    (option: AssessmentOption) => {
      setState((prev) => {
        const answer: SelectedAnswer = {
          roleKey: option.roleKey,
          questionId: option.questionId,
          optionId: option.optionId,
          painScore: option.painScore,
          letter: option.letter,
          label: option.label,
        };
        const next: AssessmentState = {
          ...prev,
          selectedAnswers: {
            ...prev.selectedAnswers,
            [option.questionId]: answer,
          },
          painScores: {
            ...prev.painScores,
            [option.questionId]: option.painScore,
          },
        };
        syncPersist(next);
        return next;
      });
    },
    [syncPersist]
  );

  const goNext = useCallback((): boolean => {
    const q = state.questions[state.currentQuestionIndex];
    if (!q || !state.selectedAnswers[q.id]) return false;
    if (state.currentQuestionIndex >= state.questions.length - 1) return false;

    setState((prev) => {
      const next = {
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      };
      syncPersist(next);
      return next;
    });
    return true;
  }, [
    state.questions,
    state.currentQuestionIndex,
    state.selectedAnswers,
    syncPersist,
  ]);

  const goPrev = useCallback(() => {
    setState((prev) => {
      if (prev.currentQuestionIndex <= 0) return prev;
      const next = {
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
      };
      syncPersist(next);
      return next;
    });
  }, [syncPersist]);

  const completeAssessment = useCallback((): SelectedAnswer[] => {
    const ordered = state.questions
      .map((q) => state.selectedAnswers[q.id])
      .filter(Boolean) as SelectedAnswer[];

    setState((prev) => {
      const next = { ...prev, completedAnswers: ordered };
      syncPersist(next);
      return next;
    });

    return ordered;
  }, [state.questions, state.selectedAnswers, syncPersist]);

  const currentQuestion =
    state.questions[state.currentQuestionIndex] ?? null;
  const selectedOptionId = currentQuestion
    ? state.selectedAnswers[currentQuestion.id]?.optionId ?? null
    : null;
  const totalQuestions = state.questions.length;
  const isLastQuestion =
    totalQuestions > 0 &&
    state.currentQuestionIndex === totalQuestions - 1;
  const progressPercent =
    totalQuestions > 0
      ? ((state.currentQuestionIndex + 1) / totalQuestions) * 100
      : 0;

  const value = useMemo<AssessmentContextValue>(
    () => ({
      ...state,
      startAssessment,
      ensureSession,
      selectAnswer,
      goNext,
      goPrev,
      completeAssessment,
      currentQuestion,
      selectedOptionId,
      isLastQuestion,
      progressPercent,
      totalQuestions,
    }),
    [
      state,
      startAssessment,
      ensureSession,
      selectAnswer,
      goNext,
      goPrev,
      completeAssessment,
      currentQuestion,
      selectedOptionId,
      isLastQuestion,
      progressPercent,
      totalQuestions,
    ]
  );

  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment(): AssessmentContextValue {
  const ctx = useContext(AssessmentContext);
  if (!ctx) {
    throw new Error("useAssessment must be used within AssessmentProvider");
  }
  return ctx;
}
