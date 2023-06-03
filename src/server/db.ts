import {PrismaClient} from "@prisma/client";
import {env} from "@/env.mjs";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const prisma =
    globalForPrisma.prisma ||
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    new PrismaClient({
        log: ["query"],
    });

if (env.NODE_ENV != "production") globalForPrisma.prisma;
