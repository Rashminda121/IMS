import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const code = formData.get("code") as string;
    const price = parseFloat(formData.get("price") as string);
    const quantity = parseInt(formData.get("quantity") as string);

    const item = await db.item.update({
      where: { id: id },
      data: {
        name,
        code,
        price,
        quantity,
      },
    });

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "Item updated successfully",
        item: item,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("[DB]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
