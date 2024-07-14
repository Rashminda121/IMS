import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const id = formData.get("id") as string;

    const item = await db.merchant.delete({
      where: { id: id },
    });

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "Merchant deleted successfully",
        item: item,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("[DB]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
