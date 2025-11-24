import { z } from 'zod';

// Reusable Zod schemas and helpers

// Helper to create nullable string with max length
export const zNullableString = (maxLength?: number) => {
  let schema = z.string();
  if (maxLength) {
    schema = schema.max(maxLength);
  }
  return schema.nullable();
};

// Common field schemas
export const zName = z.string().min(1).max(200);
export const zDescription = z.string().max(500);
export const zNullableDescription = z.string().max(500).nullable();
export const zId = z.coerce.number().int().positive();
export const zNullableId = z.coerce.number().int().positive().nullable();
export const zBit = z.number().int().min(0).max(1);
export const zDateString = z.string().datetime();

// Pagination schema
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
});
