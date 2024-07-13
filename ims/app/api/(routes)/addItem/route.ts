import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const code = formData.get("code") as string;
    const price = parseFloat(formData.get("price") as string);
    const quantity = parseInt(formData.get("quantity") as string);

    const item = await db.item.create({
      data: {
        name,
        code,
        price,
        quantity,
      },
    });

    const codeCheck = await db.item.findMany({
      where: {
        code: code,
      },
    });

    if (codeCheck) {
      return new NextResponse(
        JSON.stringify({
          error: true,
          message: "Item Code Already Existing",
        }),
        { status: 400 } // Using 400 for bad request due to duplicate email
      );
    }

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "Item created successfully",
        item: item,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("[DB]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
