import {createEnv} from "@t3-oss/env-nextjs";
import {z} from "zod";

export const env = createEnv({
  server: {
    POSTGRES_PRISMA_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "test", "production"]),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string().min(1)
        : z.string().min(1).optional(),
    NEXTAUTH_URL: z.preprocess(
      (str) => process.env.VERCEL_URL ?? str,
      process.env.VERCEL ? z.string().min(1) : z.string().url(),
    ),
    // Add `.min(1) on ID and SECRET if you want to make sure they're not empty
    YANDEX_CLIENT_ID: z.string(),
    YANDEX_CLIENT_SECRET: z.string(),
  },
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string().min(1),
  },
  runtimeEnv: {
    POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    YANDEX_CLIENT_ID: process.env.YANDEX_CLIENT_ID,
    YANDEX_CLIENT_SECRET: process.env.YANDEX_CLIENT_SECRET,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
