import { experienceLevels } from "@/drizzle/schema";
import z from "zod";

export const jobInfoSchema = z.object({
  name: z.string().min(1, "Required"),

  title: z.string().min(1).nullable(),
  experienceLevel: z.enum(experienceLevels, {
    required_error: "Please select an experience level",
  }),
  description: z.string().min(1, "Description is required"),
});
