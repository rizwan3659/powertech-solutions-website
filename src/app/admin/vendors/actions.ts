"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addVendor(formData: FormData) {
  const name = formData.get("name") as string;
  const contactPerson = formData.get("contactPerson") as string;
  const mobile = formData.get("mobile") as string;
  const email = formData.get("email") as string;
  const gst = formData.get("gst") as string;
  const pan = formData.get("pan") as string;

  if (!name || !mobile) {
    throw new Error("Name and Mobile are required");
  }

  await prisma.vendor.create({
    data: {
      name,
      contactPerson: contactPerson || null,
      mobile,
      email: email || null,
      gst: gst || null,
      pan: pan || null,
    },
  });

  revalidatePath("/admin/vendors");
}
