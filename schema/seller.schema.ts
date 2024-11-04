import { z } from "zod";

const requiredString = z.string().min(1, { message: "required" });

export const SellerSchema = z.object({
  name: requiredString,
  phone: z.string().length(11, { message: "must be exactly 11 characters" }),
  email: z.string().email().optional(),
  imageUrl: requiredString,
  bio: requiredString,
});

export type SellerSchemaType = z.infer<typeof SellerSchema>;
