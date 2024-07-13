import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface SignInRequestBody {
  email: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SignInRequestBody;

    const { email, password } = body;

    // Find user by email
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (
      user &&
      user.password === password &&
      user.role === "manager" &&
      user.access === true
    ) {
      return new NextResponse(
        JSON.stringify({
          manager: true,
          message: "Authentication successful!",
        }),
        { status: 200 }
      );
    } else if (user && user.password === password && user.role === "admin") {
      return new NextResponse(
        JSON.stringify({
          admin: true,
          message: "Authentication successful!",
        }),
        { status: 200 }
      );
    } else {
      if (user && user.password === password && user.access === true) {
        // Password matches, return success response
        return new NextResponse(
          JSON.stringify({
            success: true,
            message: "Authentication successful!",
          }),
          { status: 200 }
        );
      } else if (user && user.password === password && user.access != true) {
        // Password matches, return success response
        return new NextResponse(
          JSON.stringify({
            error: true,
            message: "Currently your account is disabled",
          }),
          { status: 401 }
        );
      } else {
        // Either user not found or password does not match
        return new NextResponse(
          JSON.stringify({
            error: true,
            message: "Invalid email or password",
          }),
          { status: 401 }
        );
      }
    }
  } catch (error) {
    console.error("[AUTH]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
