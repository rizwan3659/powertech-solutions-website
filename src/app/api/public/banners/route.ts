import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// Returns currently-active banners (isActive + within optional date window),
// consumed client-side by the PromoBanner component.
export async function GET() {
  try {
    const now = new Date();
    const banners = await prisma.cmsBanner.findMany({
      where: {
        isActive: true,
        AND: [
          { OR: [{ startDate: null }, { startDate: { lte: now } }] },
          { OR: [{ endDate: null }, { endDate: { gte: now } }] },
        ],
      },
      orderBy: { id: "desc" },
    });
    return NextResponse.json(banners);
  } catch (error) {
    // If the table doesn't exist yet or DB is unreachable, fail gracefully.
    console.error("Error fetching banners:", error);
    return NextResponse.json([]);
  }
}
