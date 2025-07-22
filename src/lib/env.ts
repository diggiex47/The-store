import zod  from "zod";

const envSchema = zod.object({
  DATABASE_URL: zod.string().nonempty(),
  Google_Client_id: zod.string().nonempty(),
  Google_secret: zod.string().nonempty(),
  NEXAUTH_SECRET: zod.string().nonempty(),
  NEXTAUTH_URL: zod.string().url(),
  NEXAUTH_CLIENT_ID: zod.string().nonempty(),
});

export const env = envSchema.parse(process.env);
