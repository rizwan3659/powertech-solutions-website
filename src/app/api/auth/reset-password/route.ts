import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { token, email, password } = await request.json();

    if (!token || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // Look up the token and verify it matches the email and is not expired.
    const record = await prisma.passwordResetToken.findUnique({ where: { token } });

    if (!record || record.email !== email || record.expires < new Date()) {
      // Clean up an expired/stale token if present.
      if (record) {
        await prisma.passwordResetToken.delete({ where: { id: record.id } }).catch(() => {});
      }
      return NextResponse.json(
        { error: "This reset link is invalid or has expired. Please request a new one." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      await prisma.passwordResetToken.delete({ where: { id: record.id } }).catch(() => {});
      return NextResponse.json(
        { error: "This reset link is invalid or has expired. Please request a new one." },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { email },
      data: { passwordHash },
    });

    // Single-use: invalidate the token (and any others for this email).
    await prisma.passwordResetToken.deleteMany({ where: { email } });

    return NextResponse.json({ success: true, message: "Password updated successfully" });
  } catch (error: any) {
    console.error("Reset Password Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
