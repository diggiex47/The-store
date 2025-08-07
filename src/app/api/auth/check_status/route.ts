import prisma from "@/lib/prisma";
import { error } from "console";
import { NextResponse, userAgent } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { name: email }],
      },
    });

  

    if (!user) {
      return NextResponse.json({ error: "User Not Found " }, { status: 404 });
    }

    if (!user.emailVerified) {
      return NextResponse.json({ status: "unverified", email: user.email });
    }
    return NextResponse.json({ status: "verified" });
  } catch (error) {
    console.error("Check status error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
