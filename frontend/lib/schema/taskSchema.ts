import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(5, "title must be at least 5 characters").max(30, "Username must be at most 30 characters"),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]).default("low"),
  deadline: z.string(),
  tags: z.array(z.string()).default([]),
});

export type TaskSchema = z.infer<typeof taskSchema>;
