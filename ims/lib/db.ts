import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

// import { PrismaClient } from "@prisma/client";

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// let prismaInstance: PrismaClient;

// // Initialize Prisma client if not already initialized
// if (process.env.NODE_ENV === "production") {
//   prismaInstance = new PrismaClient();
// } else {
//   if (!globalThis.prisma) {
//     globalThis.prisma = new PrismaClient();
//   }
//   prismaInstance = globalThis.prisma;
// }

// export const db = prismaInstance;
