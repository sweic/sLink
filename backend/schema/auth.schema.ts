import { z } from "zod";

export const registerUserSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string(),
});
