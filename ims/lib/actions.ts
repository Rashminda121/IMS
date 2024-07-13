import { db } from "./db";

export const getItemList = async (query: string) => {
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
    return items;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const getItemById = async (id: string) => {
  try {
    const item = await db.item.findUnique({
      where: { id },
    });
    return item;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};
