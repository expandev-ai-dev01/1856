import { z } from 'zod';

export const timerSettingsSchema = z.object({
  focusDuration: z.coerce
    .number()
    .int('Must be an integer')
    .min(5, 'O valor deve ser um número entre 5 e 90.')
    .max(90, 'O valor deve ser um número entre 5 e 90.'),
  shortBreakDuration: z.coerce
    .number()
    .int('Must be an integer')
    .min(1, 'O valor deve ser um número entre 1 e 30.')
    .max(30, 'O valor deve ser um número entre 1 e 30.'),
  longBreakDuration: z.coerce
    .number()
    .int('Must be an integer')
    .min(10, 'O valor deve ser um número entre 10 e 60.')
    .max(60, 'O valor deve ser um número entre 10 e 60.'),
});
