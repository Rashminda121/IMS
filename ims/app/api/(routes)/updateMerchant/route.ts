import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;

    const item = await db.merchant.update({
      where: { id: id },
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
        message: "Merchant updated successfully",
        item: item,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("[DB]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
