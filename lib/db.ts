import { PrismaClient } from  "./prisma-client/client"
import { PrismaPg } from "@prisma/adapter-pg"

//Global variable is necessary to prevent multiple instances of db on Next.js hot reload
const prismaGlobal = global as unknown as {prisma?: PrismaClient};

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
});

export const db = prismaGlobal.prisma ?? new PrismaClient({ adapter });

if(process.env.NODE_ENV != "production") {
    prismaGlobal.prisma = db;
}