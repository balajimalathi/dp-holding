import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    APP_URL: z.string().min(1),
    FED_API_URL: z.string().min(1),
  },
  // For Next.js >= 13.4.4, you can just reference process.env:
  experimental__runtimeEnv: process.env
});