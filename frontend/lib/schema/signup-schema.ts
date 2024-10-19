import zod from "zod";

export const signupSchema = zod.object({
  username: zod.string().min(3, "Username must be at least 3 characters").max(20, "Username must not exceed 20 characters"),
  email: zod.string().email("Must be a valid email address"),
  password: zod.string().min(8, "Password must be at least 8 characters").max(50, "Password must not exceed 50 characters"),
});

export type SignupSchema = zod.infer<typeof signupSchema>;