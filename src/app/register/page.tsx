import type { Metadata } from "next";
import { IntakePage } from "@/components/register/intake-page";

export const metadata: Metadata = {
  title: "Register — Find Your Perfect AI Employee | TOPS Technologies",
  description:
    "Tell us about your business and get matched with the AI Employee that can create the biggest impact.",
};

export default function RegisterPage() {
  return <IntakePage />;
}
