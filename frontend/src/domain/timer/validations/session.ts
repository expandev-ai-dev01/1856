import { z } from 'zod';

export const sessionStartSchema = z.object({
  description: z.string().max(100, 'A descrição deve ter no máximo 100 caracteres.').optional(),
});

export type SessionStartFormData = z.infer<typeof sessionStartSchema>;
