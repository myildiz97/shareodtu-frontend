import * as z from "zod"

export const userSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  foodCount: z.number().min(1, {
    message: "Food count must be at least 1.",
  }),
  status: z.enum(["Active", "Inactive", "Pending"], {
    required_error: "Please select a status.",
  }),
})

export type UserSchema = z.infer<typeof userSchema>

