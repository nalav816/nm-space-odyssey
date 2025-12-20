import { PrismaClient } from  "./prisma-client";

const clientGlobal = global as unknown as {prisma?: PrismaClient};
export const db = clientGlobal.prisma ?? new PrismaClient();

if(process.env.NODE_ENV != "production") {
    clientGlobal.prisma = db;
}