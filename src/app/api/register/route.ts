import { NextResponse } from "next/server"; //for returning responses used in API routes (next-auth)
import bcrypt from "bcrypt"; //for hasing passwords
import prisma from "@/lib/prisma"; //importing prisma client for read/write operations in the database
import Email from "next-auth/providers/email";
import { Account, Session } from '../../../generated/prisma/index';

export async function POST(req: Request) {
  try {
    //extracting username and password from the request body
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 },
      );
      //returning error if username or password is not provided
    }

    //checking if a user with the provided username already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        name: username,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 409 },
      );
      //returning error if username already exists
    }

    //hashing the password using bcrypt with a salt rounds of 10
    const hasdedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name: username,
        password: hasdedPassword, //storing the hashed password in the database
      },
    });

    return NextResponse.json(
      {
        message: "User registered successfully",
      },
      { status: 201 },
    );
    //returning success message if user is registered successfully
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
    //returning error if there is an internal server error
  }
}
