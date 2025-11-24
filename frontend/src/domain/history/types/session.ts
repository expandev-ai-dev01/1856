import { z } from 'zod';

// Schema matching the backend API response
export const sessionSchema = z.object({
  id: z.string().uuid(),
  taskDescription: z.string(),
  startTimestamp: z.string().datetime(),
  durationMinutes: z.number().int().positive(),
});

export type Session = z.infer<typeof sessionSchema>;

export interface SessionHistoryResponse {
  success: boolean;
  data: Session[];
}
