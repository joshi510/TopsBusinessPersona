import { z } from "zod";

export const INDUSTRIES = [
  "Ceramics & Tiles",
  "Textile & Denim",
  "Diamond & Jewellery",
  "Chemicals & Pharma",
  "Engineering & Auto Components",
  "Agro & Spices",
  "Dairy Value Add",
  "Logistics & Freight",
  "Real Estate",
  "FMCG Distribution",
  "Other",
] as const;

export const TEAM_SIZES = ["1–5", "6–20", "21–50", "50+"] as const;

export const ROLES = ["Owner", "Manager", "Staff"] as const;

export const intakeSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(2, "Please enter your company name")
    .max(120, "Company name is too long"),
  email: z
    .string()
    .trim()
    .refine(
      (v) => v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      "Please enter a valid email"
    ),
  phone: z
    .string()
    .trim()
    .refine(
      (v) => v === "" || /^[+]?[\d\s()-]{8,18}$/.test(v),
      "Please enter a valid phone number"
    ),
  industry: z.string().min(1, "Please select an industry"),
  teamSize: z.string().min(1, "Please select team size"),
  role: z.string().min(1, "Please select your role"),
});

export type IntakeFormValues = z.infer<typeof intakeSchema>;

export const INTAKE_STORAGE_KEY = "bap_intake";
