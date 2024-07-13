// /api/viewItem.ts

import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const items = await db.item.findMany({
        select: {
          id: true,
          name: true,
          code: true,
          price: true,
          quantity: true,
        },
      });

      // Log items to console
      console.log("Items fetched:", items);

      res.status(200).json(items);
    } catch (error) {
      console.error("Failed to fetch items:", error);
      res.status(500).json({ error: "Failed to fetch items" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
