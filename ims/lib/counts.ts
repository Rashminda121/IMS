import { db } from "./db";

export const getItemCount = async () => {
  try {
    const itemCount = await db.item.count();
    return itemCount;
  } catch (error) {
    throw new Error("Failed to fetch item count");
  }
};

export const getUserCount = async () => {
  try {
    const userCount = await db.user.count();
    return userCount;
  } catch (error) {
    throw new Error("Failed to fetch item count");
  }
};
