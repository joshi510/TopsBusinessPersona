import { redirect } from "next/navigation";

/** Legacy route — result page removed; continue to assessment/console flow. */
export default function ResultRedirect() {
  redirect("/assessment");
}
