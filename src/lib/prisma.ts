<<<<<<< HEAD
import { PrismaClient } from "@prisma/client";
=======
import { PrismaClient } from "../generated/prisma";
>>>>>>> 69e21060e5c278c3c26577a4a8794e33e2c66ca9
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const prisma =
  globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
