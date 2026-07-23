/**
 * Presentation-only content for the AI Employee Console UI.
 * Does not change role selection, routing, or assessment logic.
 */

export type ConsoleCapability = string;

export type ConsoleWorkflowStep = {
  label: string;
  icon: string;
};

export type ConsoleAutomation = {
  title: string;
  description: string;
  icon: string;
};

export type ConsoleChatPreview = {
  user: string;
  ai: string;
};

export type ConsoleKpis = {
  hoursSaved: number;
  revenueGrowth: number;
  responseTime: string;
  tasksAutomated: number;
};

const CAPABILITIES: Record<string, ConsoleCapability[]> = {
  SALES: [
    "Lead Generation",
    "CRM",
    "Follow-ups",
    "WhatsApp",
    "Email",
    "Reporting",
  ],
  MARKETING: [
    "Content Calendar",
    "Campaign Drafts",
    "Social Posts",
    "Analytics",
    "Audience Targeting",
    "Creative Briefs",
  ],
  OPERATIONS: [
    "Workflow Tracking",
    "Inventory",
    "Handoffs",
    "Scheduling",
    "Status Alerts",
    "Reporting",
  ],
  ACCOUNTS: [
    "Invoicing",
    "GST Support",
    "Collections",
    "Expense Summaries",
    "Cash-flow Signals",
    "Payment Tracking",
  ],
  SUPPORT: [
    "Ticket Triage",
    "FAQ Replies",
    "Escalations",
    "CSAT Tracking",
    "Knowledge Base",
    "Status Updates",
  ],
  RECEPTION: [
    "Call Handling",
    "Appointments",
    "Visitor Logging",
    "Chat First-response",
    "Reminders",
    "Team Routing",
  ],
  RESEARCH: [
    "Document Search",
    "Market Summaries",
    "Compliance Lookups",
    "Brief Generation",
    "Source Tracking",
    "Insight Synthesis",
  ],
  PA: [
    "Calendar",
    "Email Priority",
    "Meeting Prep",
    "Task Tracking",
    "Reminders",
    "Briefs",
  ],
  HR: [
    "Profile Screening",
    "Interview Checklists",
    "Resume Parsing",
    "Onboarding",
    "Candidate Tracking",
    "Policy Q&A",
  ],
};

const WORKFLOWS: Record<string, ConsoleWorkflowStep[]> = {
  SALES: [
    { label: "Lead Inquiry", icon: "MessageCircle" },
    { label: "CRM Entry", icon: "Database" },
    { label: "Quotation", icon: "FileText" },
    { label: "WhatsApp Follow-up", icon: "MessageSquare" },
    { label: "Reminder", icon: "Bell" },
    { label: "Order Confirmation", icon: "CheckCircle2" },
  ],
  MARKETING: [
    { label: "Brief Intake", icon: "ClipboardList" },
    { label: "Content Draft", icon: "Sparkles" },
    { label: "Review", icon: "Eye" },
    { label: "Publish", icon: "Share2" },
    { label: "Engage", icon: "MessageCircle" },
    { label: "Report", icon: "BarChart3" },
  ],
  OPERATIONS: [
    { label: "Request In", icon: "Inbox" },
    { label: "Assign Owner", icon: "UserCheck" },
    { label: "Execute Task", icon: "Settings" },
    { label: "Update Status", icon: "RefreshCw" },
    { label: "Notify Team", icon: "Bell" },
    { label: "Close Loop", icon: "CheckCircle2" },
  ],
  ACCOUNTS: [
    { label: "Invoice Create", icon: "FileText" },
    { label: "Send to Client", icon: "Send" },
    { label: "Payment Track", icon: "CreditCard" },
    { label: "Reminder", icon: "Bell" },
    { label: "Reconcile", icon: "Calculator" },
    { label: "Report", icon: "BarChart3" },
  ],
  SUPPORT: [
    { label: "Ticket Received", icon: "Ticket" },
    { label: "Auto Triage", icon: "Filter" },
    { label: "Reply Draft", icon: "MessageCircle" },
    { label: "Resolve / Escalate", icon: "GitBranch" },
    { label: "CSAT Check", icon: "Smile" },
    { label: "Close Ticket", icon: "CheckCircle2" },
  ],
  RECEPTION: [
    { label: "Visitor / Call", icon: "Phone" },
    { label: "Identify Need", icon: "Search" },
    { label: "Book Slot", icon: "Calendar" },
    { label: "Route to Team", icon: "GitBranch" },
    { label: "Send Reminder", icon: "Bell" },
    { label: "Log Visit", icon: "ClipboardList" },
  ],
  RESEARCH: [
    { label: "Question In", icon: "HelpCircle" },
    { label: "Source Search", icon: "Search" },
    { label: "Synthesize", icon: "Brain" },
    { label: "Draft Brief", icon: "FileText" },
    { label: "Cite Sources", icon: "Link" },
    { label: "Deliver", icon: "Send" },
  ],
  PA: [
    { label: "Request In", icon: "Inbox" },
    { label: "Prioritize", icon: "ListOrdered" },
    { label: "Schedule", icon: "Calendar" },
    { label: "Prep Brief", icon: "FileText" },
    { label: "Remind", icon: "Bell" },
    { label: "Follow-up", icon: "CheckCircle2" },
  ],
  HR: [
    { label: "Application In", icon: "Inbox" },
    { label: "Screen Profile", icon: "UserSearch" },
    { label: "Shortlist", icon: "ListChecks" },
    { label: "Interview Prep", icon: "ClipboardList" },
    { label: "Feedback Log", icon: "MessageCircle" },
    { label: "Next Step", icon: "Rocket" },
  ],
};

const AUTOMATIONS: ConsoleAutomation[] = [
  {
    title: "WhatsApp Automation",
    description: "Instant follow-ups and reminders on WhatsApp.",
    icon: "MessageSquare",
  },
  {
    title: "Email Automation",
    description: "Personalized emails drafted and scheduled.",
    icon: "Mail",
  },
  {
    title: "CRM Sync",
    description: "Leads, notes, and stages stay up to date.",
    icon: "Database",
  },
  {
    title: "Invoice Generator",
    description: "Quotations and invoices in a few clicks.",
    icon: "FileText",
  },
  {
    title: "Meeting Scheduler",
    description: "Books slots and sends calendar invites.",
    icon: "Calendar",
  },
  {
    title: "Payment Reminder",
    description: "Polite nudges until payment is confirmed.",
    icon: "Bell",
  },
];

const CHAT_PREVIEW: Record<string, ConsoleChatPreview> = {
  SALES: {
    user: "Generate a quotation for ABC Traders.",
    ai: "Certainly! I've prepared the quotation and updated the CRM. Would you like me to email it as well?",
  },
  MARKETING: {
    user: "Draft this week's campaign posts for our brand.",
    ai: "Done — three posts, one email, and a clear CTA are ready for your review.",
  },
  OPERATIONS: {
    user: "What's blocking today's deliveries?",
    ai: "Two orders need confirmation. I've alerted owners and added a checklist so nothing slips.",
  },
  ACCOUNTS: {
    user: "Send payment reminders for overdue invoices.",
    ai: "Reminders drafted for 4 overdue accounts. Shall I send them now?",
  },
  SUPPORT: {
    user: "Reply to the customer waiting on ticket #4821.",
    ai: "Status update sent with ETA. I've also set a 4-hour follow-up nudge.",
  },
  RECEPTION: {
    user: "Book a visit for Mr. Shah tomorrow at 11 AM.",
    ai: "Booked and confirmed. Calendar invite and WhatsApp reminder are ready.",
  },
  RESEARCH: {
    user: "Summarize competitor pricing for our category.",
    ai: "Brief ready with 5 sources and a side-by-side comparison table.",
  },
  PA: {
    user: "Clear my afternoon and prep the board meeting notes.",
    ai: "Calendar cleared 2–5 PM. Meeting brief and agenda draft are attached.",
  },
  HR: {
    user: "Shortlist resumes for the open sales role.",
    ai: "Top 6 profiles shortlisted with interview questions and decline drafts.",
  },
};

const INDUSTRY_INSIGHTS: Record<string, string[]> = {
  "Ceramics & Tiles": [
    "Dealer Follow-ups",
    "Sample Request Tracking",
    "Quotation Automation",
    "Order Confirmations",
    "Site Visit Scheduling",
  ],
  "Textile & Denim": [
    "Buyer Follow-ups",
    "Sample Dispatch Tracking",
    "Rate Card Sharing",
    "Order Reminders",
    "Quality Update Alerts",
  ],
  "Diamond & Jewellery": [
    "Client Appointment Booking",
    "Design Approval Follow-ups",
    "Order Status Updates",
    "Payment Reminders",
    "VIP Client Care",
  ],
  "Chemicals & Pharma": [
    "Compliance Document Support",
    "Distributor Communication",
    "Batch Tracking Notes",
    "Order Confirmations",
    "Inquiry Triage",
  ],
  "Engineering & Auto Components": [
    "RFQ Follow-ups",
    "Drawing Approval Tracking",
    "Delivery Scheduling",
    "Vendor Coordination",
    "PO Confirmations",
  ],
  "Agro & Spices": [
    "Distributor Follow-ups",
    "Bulk Order Tracking",
    "Dealer Communication",
    "Quotation Automation",
    "Order Reminders",
  ],
  "Dairy & Value Add": [
    "Retailer Follow-ups",
    "Route Order Tracking",
    "Payment Collections",
    "Stock Alerts",
    "Delivery Confirmations",
  ],
  "Logistics & Freight": [
    "Shipment Status Updates",
    "Pickup Scheduling",
    "Client Notifications",
    "Document Reminders",
    "POD Follow-ups",
  ],
  "Real Estate": [
    "Site Visit Booking",
    "Lead Nurture Follow-ups",
    "Brochure Sharing",
    "Meeting Reminders",
    "Interest Tracking",
  ],
  "FMCG Distribution": [
    "Retailer Follow-ups",
    "Scheme Communication",
    "Order Booking",
    "Payment Reminders",
    "Stock Replenishment Alerts",
  ],
  Other: [
    "Lead Follow-ups",
    "CRM Updates",
    "Quotation Support",
    "Reminder Automation",
    "Status Tracking",
  ],
};

const KPIS: Record<string, ConsoleKpis> = {
  SALES: {
    hoursSaved: 18,
    revenueGrowth: 35,
    responseTime: "< 2s",
    tasksAutomated: 42,
  },
  MARKETING: {
    hoursSaved: 15,
    revenueGrowth: 28,
    responseTime: "< 2s",
    tasksAutomated: 36,
  },
  OPERATIONS: {
    hoursSaved: 22,
    revenueGrowth: 20,
    responseTime: "< 2s",
    tasksAutomated: 48,
  },
  ACCOUNTS: {
    hoursSaved: 16,
    revenueGrowth: 22,
    responseTime: "< 2s",
    tasksAutomated: 38,
  },
  SUPPORT: {
    hoursSaved: 24,
    revenueGrowth: 26,
    responseTime: "< 2s",
    tasksAutomated: 55,
  },
  RECEPTION: {
    hoursSaved: 14,
    revenueGrowth: 18,
    responseTime: "< 2s",
    tasksAutomated: 40,
  },
  RESEARCH: {
    hoursSaved: 20,
    revenueGrowth: 24,
    responseTime: "< 2s",
    tasksAutomated: 34,
  },
  PA: {
    hoursSaved: 12,
    revenueGrowth: 16,
    responseTime: "< 2s",
    tasksAutomated: 30,
  },
  HR: {
    hoursSaved: 14,
    revenueGrowth: 15,
    responseTime: "< 2s",
    tasksAutomated: 32,
  },
};

export function getConsoleCapabilities(roleKey: string): ConsoleCapability[] {
  return CAPABILITIES[roleKey] ?? CAPABILITIES.SALES!;
}

export function getConsoleWorkflow(roleKey: string): ConsoleWorkflowStep[] {
  return WORKFLOWS[roleKey] ?? WORKFLOWS.SALES!;
}

export function getConsoleAutomations(): ConsoleAutomation[] {
  return AUTOMATIONS;
}

export function getConsoleChatPreview(
  roleKey: string,
  _name: string
): ConsoleChatPreview {
  return CHAT_PREVIEW[roleKey] ?? CHAT_PREVIEW.SALES!;
}

export function getIndustryInsights(industry: string): string[] {
  if (INDUSTRY_INSIGHTS[industry]) return INDUSTRY_INSIGHTS[industry]!;
  const key = Object.keys(INDUSTRY_INSIGHTS).find(
    (k) => k.toLowerCase() === industry.toLowerCase()
  );
  if (key) return INDUSTRY_INSIGHTS[key]!;
  return INDUSTRY_INSIGHTS.Other!;
}

export function getConsoleKpis(roleKey: string): ConsoleKpis {
  return KPIS[roleKey] ?? KPIS.SALES!;
}

export function friendlyRoleLabel(roleKey: string, title: string): string {
  const map: Record<string, string> = {
    SALES: "AI Sales Employee",
    MARKETING: "AI Marketing Employee",
    OPERATIONS: "AI Operations Employee",
    ACCOUNTS: "AI Accounts Employee",
    SUPPORT: "AI Support Employee",
    RECEPTION: "AI Reception Employee",
    RESEARCH: "AI Research Employee",
    PA: "AI Personal Assistant",
    HR: "AI HR Employee",
  };
  return map[roleKey] ?? title;
}

