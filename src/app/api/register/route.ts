import { NextResponse } from "next/server"; //for returning responses used in API routes (next-auth)
import bcrypt from "bcrypt"; //for hasing passwords
import prisma from "@/lib/prisma"; //importing prisma client for read/write operations in the database
import crypto from "crypto";
import { sendOTPEmail } from "@/lib/sendOtp";

export async function POST(req: Request) {
  try {
    //extracting username and password from the request body
    const body = await req.json();
    const { email, username, password } = body;

    //checking the username and password -- checking the empty case Edge case
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 },
      );
    }

    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 },
      );
    }



    //Cecking for Email
    const existingemail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    //if present return
    if (existingemail) {
      return NextResponse.json(
        { error: "Email already exist" },
        { status: 409 },
      );
    }

    //Checking the Username
    const existingUser = await prisma.user.findFirst({
      where: {
        name: username,
      },
    });

    //if user is present already
    if (existingUser) {
      return NextResponse.json(
        { error: "username already in use" },
        { status: 409 },
      );
    }

    //hashing the password using bcrypt with a salt rounds of 10
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = crypto.randomInt(100000, 999999).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    // Step 1: Perform database operations in a transaction.
    await prisma.$transaction(async (tx) => {
      let user;

      //if User is Existing we update his deatils and he is not verified then we update his details 
      if (existingUser) {
        user = await tx.user.update({
          where: { email },
          data: { name: username, password: hashedPassword },
        });
      } else {
        // If the user does not exist, CREATE them.
        user = await tx.user.create({
          data: { email: email, name: username, password: hashedPassword },
        });
      }

      // clear old otp and create a new one.
      await tx.verifyOTP.deleteMany({ where: { userId: user.id } });
      const expires = new Date(Date.now() + 5 * 60 * 1000);


      //creating the opt 
      await tx.verifyOTP.create({
        data: {
          userId: user.id,
          otp: hashedOtp,
          expires,
        },
      });
    });
    await sendOTPEmail(email, otp);

    //if all successful return the user registration done.
    return NextResponse.json(
      {
        message: "User registered successfully",
      },
      { status: 201 },
    );
    //returning success message if user is registered successfully
  } catch (error) {
    console.error("Registration Failed :", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
    
  }
}
