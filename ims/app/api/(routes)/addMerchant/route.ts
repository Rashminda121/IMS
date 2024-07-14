import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;

    const emailCheck = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (emailCheck) {
      return new NextResponse(
        JSON.stringify({
          error: true,
          message: "Email already added",
        }),
        { status: 400 }
      );
    }

    const user = await db.merchant.create({
      data: {
        name,
        email,
        phone,
        address,
      },
    });

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "Merchant Added successfully",
        user,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("[AUTH]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
