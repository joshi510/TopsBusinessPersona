import { NextResponse } from "next/server";
import { intakeSchema } from "@/lib/intake-schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = intakeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid intake data" },
        { status: 400 }
      );
    }

    const { companyName, email, phone, industry, teamSize, role } = parsed.data;

    try {
      const { prisma } = await import("@/lib/prisma");
      await prisma.assessment.create({
        data: {
          company: companyName,
          email: email || null,
          industry,
          answers: JSON.stringify({
            teamSize,
            role,
            phone: phone || null,
            stage: "intake",
          }),
        },
      });
    } catch (dbError) {
      console.warn("intake db skip", dbError);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("intake error", error);
    return NextResponse.json(
      { ok: false, error: "Unable to save intake" },
      { status: 500 }
    );
  }
}
