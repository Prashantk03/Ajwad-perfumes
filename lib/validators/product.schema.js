import { z } from "zod";

/********Variant schema********/

export const productVariantSchema = z.object({
  sizeMl: z.number().int().positive("Size is required"),
  price: z.number().positive("Price must be positive"),
  stock: z.number().int().nonnegative("Stock cannot be negative"),
  sku: z.string().optional(),
});

/********Product Schema*********/

export const createProductSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  brand: z.string().min(1, "Brand is required"),
  fragranceFamily: z.string().optional(),
  concentration: z.enum(["EDP", "EDT", "Attar"]),
  images: z.array(z.string().url("Image must be a valid URL")).min(1),
  variants: z.array(productVariantSchema).min(1),
});

/******Update Product Schema*****/

export const updateProductSchema = createProductSchema.partial();