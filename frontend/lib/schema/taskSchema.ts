import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]).default("low").optional(),
  deadline: z.string(),
  tags: z.array(z.string()).default([]),
});

export type TaskSchema = z.infer<typeof taskSchema>;
