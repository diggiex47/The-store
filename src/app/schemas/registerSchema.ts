import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .max(20, "Username must be at most 20 characters long")
    .min(3, "Username must be at least 3 characters long")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores",
    ),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password must be at most 50 characters long")
    // .regex(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    //   "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    // )
    .regex(
      /^[a-zA-Z0-9!@#$%^&*()_+=-]+$/,
      "Password can only contain letters, numbers, and special characters !@#$",
    ),
});
export type RegisterSchemaType = z.infer<typeof registerSchema>
