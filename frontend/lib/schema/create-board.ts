import zod from "zod";

export const createBoardSchema = zod.object({
  name: zod.string().min(3, "Board name must be at least 3 character").max(20, "Board name must not exceed 20 characters"),
});

export type CreateBoardSchema = zod.infer<typeof createBoardSchema>;