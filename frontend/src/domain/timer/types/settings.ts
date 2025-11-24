import { z } from 'zod';
import { timerSettingsSchema } from '../validations/settings';

export type TimerSettings = z.infer<typeof timerSettingsSchema>;

export interface TimerSettingsResponse {
  success: boolean;
  data: TimerSettings;
}
