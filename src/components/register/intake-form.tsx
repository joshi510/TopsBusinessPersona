"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  BriefcaseBusiness,
  CheckCircle2,
  Factory,
  Mail,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { PremiumIcon } from "@/components/register/premium-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAssessment } from "@/context/assessment-context";
import {
  INDUSTRIES,
  INTAKE_STORAGE_KEY,
  intakeSchema,
  ROLES,
  TEAM_SIZES,
  type IntakeFormValues,
} from "@/lib/intake-schema";
import { fadeUp, springSoft, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const STEPS = [
  { n: 1, label: "Intake" },
  { n: 2, label: "Assessment" },
  { n: 3, label: "Result" },
] as const;

type FieldKey =
  | "companyName"
  | "email"
  | "phone"
  | "industry"
  | "teamSize"
  | "role";

export function IntakeForm() {
  const reduce = useReducedMotion();
  const router = useRouter();
  const { startAssessment } = useAssessment();
  const [rippling, setRippling] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<FieldKey | null>(null);
  const [btnHover, setBtnHover] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IntakeFormValues>({
    resolver: zodResolver(intakeSchema),
    defaultValues: {
      companyName: "",
      email: "",
      phone: "",
      industry: "",
      teamSize: "",
      role: "",
    },
  });

  const onSubmit = async (values: IntakeFormValues) => {
    setRippling(true);
    try {
      sessionStorage.setItem(INTAKE_STORAGE_KEY, JSON.stringify(values));
      startAssessment(values);
      await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }).catch(() => undefined);
      router.push("/assessment");
    } finally {
      setRippling(false);
    }
  };

  const focusHandlers = (key: FieldKey) => ({
    onFocus: () => setFocused(key),
    onBlur: () => setFocused((f) => (f === key ? null : f)),
  });

  return (
    <div className="relative flex w-full flex-1 items-stretch justify-center bg-white px-4 py-5 sm:px-6 sm:py-7 md:px-8 lg:h-full lg:px-8 lg:py-8">
      <motion.div
        className="relative z-10 flex w-full max-w-[720px] flex-col lg:h-full"
        variants={reduce ? undefined : staggerContainer(0.08, 0.12)}
        initial={reduce ? false : "hidden"}
        animate="show"
      >
        <motion.div
          variants={reduce ? undefined : fadeUp}
          whileHover={reduce ? undefined : { y: -2 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 md:p-6 lg:h-full"
        >
          <nav aria-label="Progress" className="mb-4 sm:mb-5">
            <ol className="flex items-center justify-between gap-1 sm:gap-2">
              {STEPS.map((step, i) => {
                const active = submitted ? step.n <= 2 : step.n === 1;
                const done = submitted && step.n === 1;
                return (
                  <li
                    key={step.label}
                    className="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-2"
                  >
                    <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
                      <span
                        className={cn(
                          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-all sm:h-8 sm:w-8 sm:text-[12px]",
                          active
                            ? "bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] text-white"
                            : "border border-slate-200 bg-slate-50 text-slate-400"
                        )}
                        aria-current={active && !done ? "step" : undefined}
                      >
                        {done ? (
                          <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        ) : (
                          step.n
                        )}
                      </span>
                      <span
                        className={cn(
                          "truncate text-[11px] font-semibold sm:text-[12px]",
                          active ? "text-slate-800" : "text-slate-400"
                        )}
                      >
                        {step.label}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div
                        className={cn(
                          "mx-0.5 h-px min-w-[8px] flex-1 sm:mx-1",
                          active ? "bg-[#C4B5FD]" : "bg-slate-200"
                        )}
                        aria-hidden
                      />
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          {submitted ? (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-6 text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-violet-200/40 bg-gradient-to-br from-violet-500/10 to-blue-500/10 text-[#7C3AED]">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h2 className="text-[20px] font-extrabold tracking-tight text-slate-900 sm:text-[22px] md:text-[24px]">
                You&apos;re all set
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-slate-500 sm:text-[14px]">
                We&apos;ve saved your business details. Your personalized AI
                Employee assessment is ready to begin next.
              </p>
            </motion.div>
          ) : (
            <>
              <motion.div variants={reduce ? undefined : fadeUp}>
                <h2 className="text-[20px] font-extrabold leading-tight tracking-tight text-slate-900 sm:text-[24px] md:text-[26px]">
                  Let&apos;s Get To Know Your Business
                </h2>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-500 sm:text-[14px]">
                  This helps us personalize your AI Employee recommendation.
                </p>
              </motion.div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-4 space-y-4 sm:mt-5"
                noValidate
              >
                <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                  <motion.div
                    variants={reduce ? undefined : fadeUp}
                    className="min-w-0 space-y-1.5 sm:space-y-2"
                  >
                    <Label htmlFor="companyName">Company Name</Label>
                    <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                      <PremiumIcon
                        icon={Building2}
                        focused={focused === "companyName"}
                        delay={0.05}
                      />
                      <Input
                        id="companyName"
                        placeholder="Enter your company name"
                        className="min-w-0 flex-1"
                        autoComplete="organization"
                        {...register("companyName")}
                        {...focusHandlers("companyName")}
                        aria-invalid={!!errors.companyName}
                      />
                    </div>
                    {errors.companyName && (
                      <p className="text-[12px] font-medium text-rose-500">
                        {errors.companyName.message}
                      </p>
                    )}
                  </motion.div>

                  <motion.div
                    variants={reduce ? undefined : fadeUp}
                    className="min-w-0 space-y-1.5 sm:space-y-2"
                  >
                    <Label htmlFor="email">
                      Email{" "}
                      <span className="font-normal text-slate-400">
                        (optional)
                      </span>
                    </Label>
                    <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                      <PremiumIcon
                        icon={Mail}
                        focused={focused === "email"}
                        delay={0.1}
                      />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your work email"
                        className="min-w-0 flex-1"
                        autoComplete="email"
                        {...register("email")}
                        {...focusHandlers("email")}
                        aria-invalid={!!errors.email}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-[12px] font-medium text-rose-500">
                        {errors.email.message}
                      </p>
                    )}
                  </motion.div>

                  <motion.div
                    variants={reduce ? undefined : fadeUp}
                    className="min-w-0 space-y-1.5 sm:space-y-2"
                  >
                    <Label htmlFor="phone">
                      Phone{" "}
                      <span className="font-normal text-slate-400">
                        (optional)
                      </span>
                    </Label>
                    <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                      <PremiumIcon
                        icon={Phone}
                        focused={focused === "phone"}
                        delay={0.15}
                      />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        className="min-w-0 flex-1"
                        autoComplete="tel"
                        {...register("phone")}
                        {...focusHandlers("phone")}
                        aria-invalid={!!errors.phone}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-[12px] font-medium text-rose-500">
                        {errors.phone.message}
                      </p>
                    )}
                  </motion.div>

                  <motion.div
                    variants={reduce ? undefined : fadeUp}
                    className="min-w-0 space-y-1.5 sm:space-y-2"
                  >
                    <Label htmlFor="industry">Industry</Label>
                    <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                      <PremiumIcon
                        icon={Factory}
                        focused={focused === "industry"}
                        delay={0.2}
                      />
                      <Controller
                        control={control}
                        name="industry"
                        render={({ field }) => (
                          <Select
                            value={field.value || undefined}
                            onValueChange={field.onChange}
                            onOpenChange={(open) =>
                              setFocused(open ? "industry" : null)
                            }
                          >
                            <SelectTrigger
                              id="industry"
                              className="min-w-0 flex-1"
                              aria-invalid={!!errors.industry}
                              onFocus={() => setFocused("industry")}
                              onBlur={() =>
                                setFocused((f) =>
                                  f === "industry" ? null : f
                                )
                              }
                            >
                              <SelectValue placeholder="Select your industry" />
                            </SelectTrigger>
                            <SelectContent>
                              {INDUSTRIES.map((ind) => (
                                <SelectItem key={ind} value={ind}>
                                  {ind}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                    {errors.industry && (
                      <p className="text-[12px] font-medium text-rose-500">
                        {errors.industry.message}
                      </p>
                    )}
                  </motion.div>

                  <motion.div
                    variants={reduce ? undefined : fadeUp}
                    className="min-w-0 space-y-1.5 sm:space-y-2"
                  >
                    <Label htmlFor="teamSize">Team Size</Label>
                    <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                      <PremiumIcon
                        icon={Users}
                        focused={focused === "teamSize"}
                        delay={0.25}
                      />
                      <Controller
                        control={control}
                        name="teamSize"
                        render={({ field }) => (
                          <Select
                            value={field.value || undefined}
                            onValueChange={field.onChange}
                            onOpenChange={(open) =>
                              setFocused(open ? "teamSize" : null)
                            }
                          >
                            <SelectTrigger
                              id="teamSize"
                              className="min-w-0 flex-1"
                              aria-invalid={!!errors.teamSize}
                              onFocus={() => setFocused("teamSize")}
                              onBlur={() =>
                                setFocused((f) =>
                                  f === "teamSize" ? null : f
                                )
                              }
                            >
                              <SelectValue placeholder="Select team size" />
                            </SelectTrigger>
                            <SelectContent>
                              {TEAM_SIZES.map((size) => (
                                <SelectItem key={size} value={size}>
                                  {size}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                    {errors.teamSize && (
                      <p className="text-[12px] font-medium text-rose-500">
                        {errors.teamSize.message}
                      </p>
                    )}
                  </motion.div>

                  <motion.div
                    variants={reduce ? undefined : fadeUp}
                    className="min-w-0 space-y-1.5 sm:space-y-2"
                  >
                    <Label htmlFor="role">Your Role</Label>
                    <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                      <PremiumIcon
                        icon={BriefcaseBusiness}
                        focused={focused === "role"}
                        delay={0.3}
                      />
                      <Controller
                        control={control}
                        name="role"
                        render={({ field }) => (
                          <Select
                            value={field.value || undefined}
                            onValueChange={field.onChange}
                            onOpenChange={(open) =>
                              setFocused(open ? "role" : null)
                            }
                          >
                            <SelectTrigger
                              id="role"
                              className="min-w-0 flex-1"
                              aria-invalid={!!errors.role}
                              onFocus={() => setFocused("role")}
                              onBlur={() =>
                                setFocused((f) => (f === "role" ? null : f))
                              }
                            >
                              <SelectValue placeholder="Select your role" />
                            </SelectTrigger>
                            <SelectContent>
                              {ROLES.map((role) => (
                                <SelectItem key={role} value={role}>
                                  {role}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                    {errors.role && (
                      <p className="text-[12px] font-medium text-rose-500">
                        {errors.role.message}
                      </p>
                    )}
                  </motion.div>
                </div>

                <motion.div
                  variants={reduce ? undefined : fadeUp}
                  className="pt-1"
                >
                  <motion.div
                    whileHover={reduce ? undefined : { y: -2, scale: 1.01 }}
                    whileTap={reduce ? undefined : { scale: 0.985 }}
                    transition={springSoft}
                    onHoverStart={() => setBtnHover(true)}
                    onHoverEnd={() => setBtnHover(false)}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        "btn-tops relative h-11 w-full overflow-hidden rounded-full border-0 text-[14px] font-semibold text-white sm:h-12 sm:text-[15px]",
                        "hover:brightness-[1.03]"
                      )}
                    >
                      {rippling && (
                        <motion.span
                          className="pointer-events-none absolute inset-0 bg-white/25"
                          initial={{
                            scale: 0,
                            opacity: 0.5,
                            borderRadius: "999px",
                          }}
                          animate={{ scale: 2.4, opacity: 0 }}
                          transition={{ duration: 0.55, ease: "easeOut" }}
                        />
                      )}
                      <span className="relative z-10 inline-flex items-center gap-2">
                        {isSubmitting ? "Saving…" : "Start Assessment"}
                        <motion.span
                          className="inline-flex"
                          animate={
                            reduce || isSubmitting
                              ? undefined
                              : { x: btnHover ? 6 : 0 }
                          }
                          transition={{ duration: 0.25, ease: "easeOut" }}
                        >
                          <ArrowRight className="h-5 w-5" strokeWidth={2.25} />
                        </motion.span>
                      </span>
                    </Button>
                  </motion.div>
                </motion.div>
              </form>
            </>
          )}

          <motion.div
            variants={reduce ? undefined : fadeUp}
            className="mt-4 flex items-start justify-center gap-2 pt-2 text-center text-[11px] leading-snug text-slate-400 sm:mt-auto sm:items-center sm:gap-3 sm:pt-4 sm:text-[12px]"
          >
            <span className="mt-0.5 shrink-0 sm:mt-0">
              <PremiumIcon icon={ShieldCheck} delay={0.35} size={18} />
            </span>
            <span className="min-w-0">Your information is secure and confidential.</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
