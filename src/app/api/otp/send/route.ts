
import { randomInt } from "crypto";
import nodemailer from "nodemailer";

import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { email } = await req.json();

  const otp = randomInt(100000, 999999).toString();

  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await prisma.verificationOTP.create({
    data: { email, otp, expiresAt },
  });

  const dalaal = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const info = await dalaal.sendMail({
    to: email,
    subject: "Le tera OTP",
    text: `Secure code is ${otp}`,
  });
  console.log("Email sent: ", info.messageId);
  console.log("Sending OTP to:", email);
  console.log("OTP code is:", otp);

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
