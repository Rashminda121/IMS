import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;
    const access = formData.get("access") === "true";

    const emailCheck = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (emailCheck) {
      return new NextResponse(
        JSON.stringify({
          error: true,
          message: "Email already registered",
        }),
        { status: 400 } // Using 400 for bad request due to duplicate email
      );
    }

    const user = await db.user.create({
      data: {
        name,
        email,
        password,
        role,
        access,
      },
    });

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "User Added successfully",
        user,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("[AUTH]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
