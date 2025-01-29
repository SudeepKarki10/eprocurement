// src/app/api/auth/register/route.ts

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db/mongodb";
import User from "@/lib/db/models/user";

export async function POST(req: Request) {
  try {
    const { email, password, role, companyName, registrationNumber } =
      await req.json();

    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      role,
      companyName,
      registrationNumber,
      verificationStatus: false,
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        user: { email: user.email, role: user.role },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
