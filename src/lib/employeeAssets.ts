import type { AiEmployeeRole } from "@/lib/assessment/types";

export type EmployeeAsset = {
  roleKey: AiEmployeeRole | "HR";
  name: string;
  title: string;
  avatar: string;
  shortDescription: string;
  whySelected: string;
  superpowers: { label: string; emoji: string }[];
  impact: { label: string; icon: string }[];
  kpis: {
    hoursSaved: number;
    productivity: number;
    revenuePotential: number;
    responseSpeed: string;
  };
  insights: {
    coreSkill: string;
    workingStyle: string;
    topStrength: string;
    growthPotential: string;
  };
  accent: string;
  accentSoft: string;
};

export const EMPLOYEE_ASSETS: Record<string, EmployeeAsset> = {
  SALES: {
    roleKey: "SALES",
    name: "Arjun",
    title: "AI Salesperson",
    avatar: "/ai-employees/ai-employee-arjun-salesperson.png",
    shortDescription:
      "Closes more deals with consistent follow-ups and pipeline discipline.",
    whySelected:
      "Your responses indicate that your biggest opportunity is improving lead management and follow-up consistency.",
    superpowers: [
      { label: "Proactive", emoji: "⚡" },
      { label: "Persuasive", emoji: "🎯" },
      { label: "Consistent", emoji: "🤝" },
      { label: "Revenue Focused", emoji: "💰" },
    ],
    impact: [
      { label: "Never miss a lead", icon: "Target" },
      { label: "Instant follow-up", icon: "Zap" },
      { label: "CRM automation", icon: "Database" },
      { label: "Quote generation", icon: "FileText" },
      { label: "Payment reminders", icon: "Bell" },
      { label: "Customer tracking", icon: "Users" },
    ],
    kpis: {
      hoursSaved: 18,
      productivity: 42,
      revenuePotential: 35,
      responseSpeed: "2x",
    },
    insights: {
      coreSkill: "Lead Nurture",
      workingStyle: "Action-first",
      topStrength: "Follow-ups",
      growthPotential: "High Growth",
    },
    accent: "#1F7DD9",
    accentSoft: "#EAF4FF",
  },
  MARKETING: {
    roleKey: "MARKETING",
    name: "Maya",
    title: "AI Marketing Executive",
    avatar: "/ai-employees/ai-employee-maya-marketing.png",
    shortDescription:
      "Keeps campaigns moving with content cadence and analytics clarity.",
    whySelected:
      "Your responses show marketing consistency and campaign output are where AI can create the biggest lift.",
    superpowers: [
      { label: "Creative", emoji: "✨" },
      { label: "Data-driven", emoji: "📊" },
      { label: "Consistent", emoji: "📅" },
      { label: "Brand Sharp", emoji: "🎨" },
    ],
    impact: [
      { label: "Content calendar automation", icon: "Calendar" },
      { label: "Campaign drafts on demand", icon: "Sparkles" },
      { label: "Social publishing support", icon: "Share2" },
      { label: "Performance insights", icon: "BarChart3" },
      { label: "Audience targeting cues", icon: "Target" },
      { label: "Creative brief generation", icon: "FileText" },
    ],
    kpis: {
      hoursSaved: 15,
      productivity: 38,
      revenuePotential: 28,
      responseSpeed: "3x",
    },
    insights: {
      coreSkill: "Campaign Design",
      workingStyle: "Creative-analytical",
      topStrength: "Content cadence",
      growthPotential: "Brand Scale",
    },
    accent: "#7C3AED",
    accentSoft: "#F5F3FF",
  },
  OPERATIONS: {
    roleKey: "OPERATIONS",
    name: "Karan",
    title: "AI Operations Manager",
    avatar: "/ai-employees/ai-employee-karan-operations.png",
    shortDescription:
      "Keeps workflows, inventory, and handoffs running without friction.",
    whySelected:
      "Your assessment highlights operational coordination and tracking as the highest-impact automation area.",
    superpowers: [
      { label: "Organized", emoji: "🗂️" },
      { label: "Reliable", emoji: "✅" },
      { label: "Process-driven", emoji: "⚙️" },
      { label: "Clear Ownership", emoji: "🧭" },
    ],
    impact: [
      { label: "Workflow checklists", icon: "ListChecks" },
      { label: "Inventory visibility", icon: "Package" },
      { label: "Handoff alerts", icon: "Bell" },
      { label: "Status tracking", icon: "Activity" },
      { label: "Schedule coordination", icon: "Calendar" },
      { label: "Bottleneck detection", icon: "AlertTriangle" },
    ],
    kpis: {
      hoursSaved: 22,
      productivity: 45,
      revenuePotential: 20,
      responseSpeed: "2.5x",
    },
    insights: {
      coreSkill: "Process Control",
      workingStyle: "Systems-first",
      topStrength: "Coordination",
      growthPotential: "Ops Scale",
    },
    accent: "#059669",
    accentSoft: "#ECFDF5",
  },
  ACCOUNTS: {
    roleKey: "ACCOUNTS",
    name: "Meera",
    title: "AI Accountant",
    avatar: "/ai-employees/ai-employee-meera-accountant.png",
    shortDescription:
      "Keeps invoices, GST, and cash-flow visibility clean every week.",
    whySelected:
      "Your answers point to financial follow-ups and reporting as the strongest place for AI impact.",
    superpowers: [
      { label: "Precise", emoji: "🧮" },
      { label: "Reliable", emoji: "🛡️" },
      { label: "Clear", emoji: "📈" },
      { label: "Audit Ready", emoji: "📋" },
    ],
    impact: [
      { label: "Invoice reminders", icon: "Bell" },
      { label: "Expense summaries", icon: "Wallet" },
      { label: "GST support", icon: "Receipt" },
      { label: "Cash-flow signals", icon: "TrendingUp" },
      { label: "Weekly finance briefs", icon: "FileText" },
      { label: "Payment tracking", icon: "CreditCard" },
    ],
    kpis: {
      hoursSaved: 16,
      productivity: 36,
      revenuePotential: 22,
      responseSpeed: "2x",
    },
    insights: {
      coreSkill: "Financial Clarity",
      workingStyle: "Detail-oriented",
      topStrength: "Collections",
      growthPotential: "Control & Scale",
    },
    accent: "#0D9488",
    accentSoft: "#F0FDFA",
  },
  RECEPTION: {
    roleKey: "RECEPTION",
    name: "Riya",
    title: "AI Receptionist",
    avatar: "/ai-employees/ai-employee-riya-receptionist.png",
    shortDescription:
      "Greets, schedules, and routes every visitor and call with warmth.",
    whySelected:
      "Your assessment shows front-desk coverage and appointment handling as a high-leverage opportunity.",
    superpowers: [
      { label: "Welcoming", emoji: "😊" },
      { label: "Organized", emoji: "📅" },
      { label: "Responsive", emoji: "📞" },
      { label: "Always On", emoji: "🌙" },
    ],
    impact: [
      { label: "Call & visitor handling", icon: "Phone" },
      { label: "Appointment booking", icon: "Calendar" },
      { label: "Chat first-response", icon: "MessageCircle" },
      { label: "Reminder nudges", icon: "Bell" },
      { label: "Visitor logging", icon: "ClipboardList" },
      { label: "Routing to teams", icon: "GitBranch" },
    ],
    kpis: {
      hoursSaved: 14,
      productivity: 30,
      revenuePotential: 18,
      responseSpeed: "4x",
    },
    insights: {
      coreSkill: "First Response",
      workingStyle: "People-first",
      topStrength: "Scheduling",
      growthPotential: "Service Excellence",
    },
    accent: "#9333EA",
    accentSoft: "#FAF5FF",
  },
  RESEARCH: {
    roleKey: "RESEARCH",
    name: "Neel",
    title: "AI Research Executive",
    avatar: "/ai-employees/ai-employee-neel-research.png",
    shortDescription:
      "Finds answers fast across documents, markets, and compliance needs.",
    whySelected:
      "Your responses highlight research and information gathering as the area where AI can save the most time.",
    superpowers: [
      { label: "Curious", emoji: "🔍" },
      { label: "Analytical", emoji: "🧠" },
      { label: "Thorough", emoji: "📚" },
      { label: "Insightful", emoji: "💡" },
    ],
    impact: [
      { label: "Document search", icon: "Search" },
      { label: "Market summaries", icon: "Globe" },
      { label: "Compliance lookups", icon: "Shield" },
      { label: "Brief generation", icon: "FileText" },
      { label: "Source tracking", icon: "Link" },
      { label: "Insight synthesis", icon: "Sparkles" },
    ],
    kpis: {
      hoursSaved: 20,
      productivity: 40,
      revenuePotential: 24,
      responseSpeed: "5x",
    },
    insights: {
      coreSkill: "Knowledge Discovery",
      workingStyle: "Deep-dive",
      topStrength: "Synthesis",
      growthPotential: "Decision Speed",
    },
    accent: "#6366F1",
    accentSoft: "#EEF2FF",
  },
  SUPPORT: {
    roleKey: "SUPPORT",
    name: "Aisha",
    title: "AI Customer Support Executive",
    avatar: "/ai-employees/ai-employee-aisha-support.png",
    shortDescription:
      "Resolves tickets faster with 24/7 replies and clear escalations.",
    whySelected:
      "Your answers show customer questions and ticket handling as the strongest automation opportunity.",
    superpowers: [
      { label: "Empathetic", emoji: "💙" },
      { label: "Fast", emoji: "⚡" },
      { label: "Clear", emoji: "💬" },
      { label: "Reliable", emoji: "🛡️" },
    ],
    impact: [
      { label: "FAQ auto-replies", icon: "MessageCircle" },
      { label: "Ticket triage", icon: "Ticket" },
      { label: "Status updates", icon: "RefreshCw" },
      { label: "CSAT tracking", icon: "Smile" },
      { label: "Escalation routing", icon: "GitBranch" },
      { label: "Knowledge base help", icon: "BookOpen" },
    ],
    kpis: {
      hoursSaved: 24,
      productivity: 48,
      revenuePotential: 26,
      responseSpeed: "6x",
    },
    insights: {
      coreSkill: "Issue Resolution",
      workingStyle: "Customer-first",
      topStrength: "Response speed",
      growthPotential: "Loyalty Lift",
    },
    accent: "#EA580C",
    accentSoft: "#FFF7ED",
  },
  PA: {
    roleKey: "PA",
    name: "Vihaan",
    title: "AI Personal Assistant",
    avatar: "/ai-employees/ai-employee-vihaan-assistant.png",
    shortDescription:
      "Owns calendars, emails, and meeting prep so leaders stay focused.",
    whySelected:
      "Your assessment shows admin coordination and scheduling as the highest-leverage place for an AI assistant.",
    superpowers: [
      { label: "Disciplined", emoji: "🗓️" },
      { label: "Discreet", emoji: "🕶️" },
      { label: "Anticipatory", emoji: "🔮" },
      { label: "Executive-ready", emoji: "👔" },
    ],
    impact: [
      { label: "Calendar management", icon: "Calendar" },
      { label: "Email prioritization", icon: "Mail" },
      { label: "Meeting reminders", icon: "Bell" },
      { label: "Task dashboards", icon: "CheckSquare" },
      { label: "Brief prep", icon: "FileText" },
      { label: "Follow-up tracking", icon: "ListTodo" },
    ],
    kpis: {
      hoursSaved: 12,
      productivity: 34,
      revenuePotential: 16,
      responseSpeed: "3x",
    },
    insights: {
      coreSkill: "Executive Ops",
      workingStyle: "Anticipatory",
      topStrength: "Scheduling",
      growthPotential: "Leadership Leverage",
    },
    accent: "#0F172A",
    accentSoft: "#F1F5F9",
  },
  HR: {
    roleKey: "HR",
    name: "Ananya",
    title: "AI HR Executive",
    avatar: "/ai-employees/ai-employee-ananya-hr.png",
    shortDescription:
      "Streamlines hiring, profiles, and interview readiness for growing teams.",
    whySelected:
      "Your business profile suggests people operations and hiring workflows can benefit from AI support.",
    superpowers: [
      { label: "People-centric", emoji: "🤝" },
      { label: "Structured", emoji: "📋" },
      { label: "Fair", emoji: "⚖️" },
      { label: "Supportive", emoji: "🌱" },
    ],
    impact: [
      { label: "Profile screening", icon: "UserSearch" },
      { label: "Interview checklists", icon: "ListChecks" },
      { label: "Resume parsing", icon: "FileText" },
      { label: "Onboarding nudges", icon: "Rocket" },
      { label: "Candidate tracking", icon: "Users" },
      { label: "Policy Q&A", icon: "BookOpen" },
    ],
    kpis: {
      hoursSaved: 14,
      productivity: 32,
      revenuePotential: 15,
      responseSpeed: "2x",
    },
    insights: {
      coreSkill: "Talent Ops",
      workingStyle: "People-first",
      topStrength: "Screening",
      growthPotential: "Team Quality",
    },
    accent: "#DB2777",
    accentSoft: "#FDF2F8",
  },
};

export function getEmployeeAsset(roleKey: string): EmployeeAsset {
  return EMPLOYEE_ASSETS[roleKey] ?? EMPLOYEE_ASSETS.SALES;
}

export function buildConsoleHref(
  roleKey: string,
  industry: string,
  view: "demo" | "explore" = "demo"
): string {
  const params = new URLSearchParams({
    roleKey,
    industry: industry || "Other",
    view,
  });
  return `/console?${params.toString()}`;
}
