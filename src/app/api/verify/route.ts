import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { _success } from "zod/v4/core";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    // checking if the email or otp is present
    if (!email || !otp) {
      return NextResponse.json({ error: "OTP is required" }, { status: 400 });
    }

    //finding the user
    const user = await prisma.user.findFirst({
      where: {
        email: email,
        emailVerified: null,
      },
    });
    if (!user) {
      return NextResponse.json(
        { error: "The User not Found" },
        { status: 404 },
      );
    }

    const verify = await prisma.verifyOTP.findFirst({
      where: { userId: user.id },
      orderBy: { expires: "desc" },
    });

    if (!verify) {
      return NextResponse.json({ error: "OTP NOT FOUND" }, { status: 400 });
    }

    const isOtp = await bcrypt.compare(otp, verify.otp);
    if (!isOtp) {
      return NextResponse.json(
        {
          error: "The OTP is Not Valid",
        },
        { status: 400 },
      );
    }

    if (new Date() > verify.expires) {
      return NextResponse.json({ error: "OTP expired" }, { status: 401 });
    }

    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });

      await tx.verifyOTP.delete({
        where: { id: verify.id },
      });
    });

    return NextResponse.json(
      { message: "Email verified successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.log("The error is ", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
