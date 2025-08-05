import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { VerificationOTP } from "../../../../generated/prisma/index";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: "Email and code is required " },
        { status: 400 },
      );
    }
    const OTP = await prisma.VerificationOTP.findFirst({
      where: {
        email,
        code,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    if (!OTP) {
      return NextResponse.json({ error: "Invalid OTP code" }, { status: 401 });
    }

    const now = new Date();

    if (OTP.expiresAt < now) {
      return NextResponse.json({ error: "OTP has expired" }, { status: 401 });
    }

    await prisma.VerificationOTP.deleteMany({
      where: {
        email,
      },
    });
    return NextResponse.json({ verified: true });
  } catch (err) {
    console.error("OTP Verification Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
