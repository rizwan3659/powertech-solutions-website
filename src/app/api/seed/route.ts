import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const existingAdmin = await prisma.user.findUnique({
      where: { email: "admin@powertech.com" },
    });

    if (existingAdmin) {
      return NextResponse.json({ message: "Admin user already exists", user: { id: existingAdmin.id, email: existingAdmin.email } });
    }

    const passwordHash = await bcrypt.hash("admin123", 10);

    const user = await prisma.user.create({
      data: {
        email: "admin@powertech.com",
        name: "Super Admin",
        passwordHash,
        role: "SUPER_ADMIN",
      },
    });

    return NextResponse.json({ message: "Admin user created successfully", user: { id: user.id, email: user.email } });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
