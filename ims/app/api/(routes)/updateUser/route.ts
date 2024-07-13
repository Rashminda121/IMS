import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;
    const access = formData.get("access") === "true";

    const item = await db.user.update({
      where: { id: id },
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
        message: "User updated successfully",
        item: item,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("[DB]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
