"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addLead(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const mobile = (formData.get("mobile") as string)?.trim();
  const enquiryType = (formData.get("enquiryType") as string) || "Other";
  const leadSource = (formData.get("leadSource") as string) || "Website";

  const company = (formData.get("company") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const city = (formData.get("city") as string)?.trim();
  const priority = (formData.get("priority") as string) || "Warm";
  const message = (formData.get("message") as string)?.trim();

  if (!name || !mobile) {
    throw new Error("Name and Mobile are required");
  }

  // Generate a unique lead number: LEAD-YYYY-NNNN
  const year = new Date().getFullYear();
  const leadNumber = `LEAD-${year}-${Math.floor(1000 + Math.random() * 9000)}`;

  await prisma.lead.create({
    data: {
      leadNumber,
      name,
      mobile,
      enquiryType,
      leadSource,
      company: company || null,
      email: email || null,
      city: city || null,
      priority,
      message: message || null,
    },
  });

  revalidatePath("/admin/leads");
}
