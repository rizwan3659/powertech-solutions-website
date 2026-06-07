import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    // Basic API Key validation
    const apiKey = request.headers.get("x-api-key");
    if (apiKey !== process.env.WEBHOOK_API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const {
      name,
      mobile,
      email,
      company,
      city,
      state,
      enquiryType = "General",
      leadSource = "Website - Contact Form",
      message,
      utmSource,
      utmMedium,
      utmCampaign,
      utmKeyword,
    } = body;

    if (!name || !mobile) {
      return NextResponse.json({ error: "Name and Mobile are required" }, { status: 400 });
    }

    // Check for duplicate lead by mobile
    const existingLead = await prisma.lead.findFirst({
      where: { mobile, stage: "New" }
    });

    if (existingLead) {
      // Just append the new message or log activity (ignoring for now to keep it simple)
      return NextResponse.json({ success: true, message: "Lead already captured", leadId: existingLead.id });
    }

    // Generate unique LEAD-YYYY-NNNN ID
    const year = new Date().getFullYear();
    const count = await prisma.lead.count();
    const leadNumber = `LEAD-${year}-${String(count + 1).padStart(4, "0")}`;

    const lead = await prisma.lead.create({
      data: {
        leadNumber,
        name,
        mobile,
        email,
        company,
        city,
        state,
        enquiryType,
        leadSource,
        message,
        utmSource,
        utmMedium,
        utmCampaign,
        utmKeyword,
        priority: "Warm",
        stage: "New",
      },
    });

    // Log the webhook payload
    await prisma.webhookLog.create({
      data: {
        source: leadSource,
        payload: body,
        status: "Success",
      }
    });

    return NextResponse.json({ success: true, leadId: lead.id }, { status: 201 });

  } catch (error: any) {
    console.error("Webhook Error:", error);
    
    // Log the failure
    await prisma.webhookLog.create({
      data: {
        source: "Website Webhook",
        payload: {},
        status: "Failed",
        error: error.message
      }
    }).catch(() => {});

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
