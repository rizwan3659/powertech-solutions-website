import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Public self-registration is disabled. Signup is only allowed to bootstrap
    // the very first admin account (when no users exist yet). Additional users
    // must be created by an existing administrator.
    const userCount = await prisma.user.count();
    if (userCount > 0) {
      return NextResponse.json(
        { error: "Registration is disabled. Contact an administrator to create an account." },
        { status: 403 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: "SUPER_ADMIN", // First/bootstrap account is the super admin
      },
    });

    return NextResponse.json({ success: true, userId: user.id }, { status: 201 });
  } catch (error: any) {
    console.error("Signup Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
