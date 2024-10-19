import zod from "zod";

export const signinSchema = zod.object({
  email: zod.string().email("Must be a valid email address"),
  password: zod.string().min(8, "Password must be at least 8 characters").max(50, "Password must not exceed 50 characters"),
});

export type SigninSchema = zod.infer<typeof signinSchema>;