import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    const { name, email, password, repassword, role } = req.body;

    // Check if passwords match
    if (password !== repassword) {
      return new NextResponse("Passwords do not match", { status: 400 });
    }

    // Create user in the database
    let user;
    if (role !== "") {
      user = await db.user.create({
        data: {
          name,
          email,
          password, // Ensure to hash password securely in production
          role,
        },
      });
    } else {
      user = await db.user.create({
        data: {
          name,
          email,
          password, // Ensure to hash password securely in production
        },
      });
    }

    // Return success response with user data
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("[AUTH]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
