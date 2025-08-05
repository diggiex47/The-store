import { NextResponse } from "next/server"; //for returning responses used in API routes (next-auth)
import bcrypt from "bcrypt"; //for hasing passwords
import prisma from "@/lib/prisma"; //importing prisma client for read/write operations in the database
import { Prisma } from "@prisma/client";
import { error } from "console";

export async function POST(req: Request) {
  try {
    //extracting username and password from the request body
    const body = await req.json();
    const { email, username, password } = body;

    

    //checking the user name and password -- checking the empty case Edge case 
    if (!email || !username || !password) {
      return NextResponse.json(
        { error: "Username or Email and password are required" },
        { status: 400 },
      );
    }

    //Cecking for Email 
    const existingemail = await prisma.user.findUnique({
      where: {
        email: email
      },
    });
    
    //if present return
    if (existingemail) {
      return NextResponse.json(
        { error: "Email already exist" },
        { status: 400 },
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
        { error: "Username already exists Choose another" },
        { status: 409 },
      );
    }

    //hashing the password using bcrypt with a salt rounds of 10
    const hashedPassword = await bcrypt.hash(password, 10);

    //if not exist creating the user in the database.
    await prisma.user.create({
      data: {
        name: username,
        email: email,
        password: hashedPassword, //storing the hashed password in the database
      },
    });

    //if all successful return the user registration done.
    return NextResponse.json(
      {
        message: "User registered successfully",
      },
      { status: 201 },
    );
    //returning success message if user is registered successfully
  } catch (error) {
    console.error("Registration Failed :" , error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
    //returning error if there is an internal server error
  }
}
