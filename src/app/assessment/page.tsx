import type { Metadata } from "next";
import { QuizPage } from "@/components/assessment/quiz-page";

export const metadata: Metadata = {
  title: "Assessment — Find Your Perfect AI Employee | TOPS Technologies",
  description: "Answer a few questions and discover your best AI Employee match.",
};

export default function AssessmentRoute() {
  return <QuizPage />;
}
