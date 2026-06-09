import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/email";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    // To prevent email enumeration, we always return success even if user doesn't exist
    if (!user) {
      return NextResponse.json({ success: true, message: "If an account exists, an email was sent." });
    }

    // Generate a secure random token
    const token = crypto.randomBytes(32).toString("hex");

    // Persist the token with a 1-hour expiry. Invalidate any previous tokens
    // for this email so only the most recent reset link is valid.
    await prisma.passwordResetToken.deleteMany({ where: { email } });
    await prisma.passwordResetToken.create({
      data: {
        email,
        token,
        expires: new Date(Date.now() + 60 * 60 * 1000),
      },
    });

    // Create the reset link
    // Assuming the app runs on VERCEL_URL or localhost
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://powertech-nine.vercel.app";
    const resetLink = `${baseUrl}/admin/reset-password?token=${token}&email=${encodeURIComponent(email)}`;

    // Send the email
    await sendPasswordResetEmail(email, resetLink);

    return NextResponse.json({ success: true, message: "Reset email sent" });
  } catch (error: any) {
    console.error("Forgot Password Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
