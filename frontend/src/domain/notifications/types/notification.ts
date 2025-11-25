import { z } from 'zod';

export const notificationTypeSchema = z.enum([
  'inicio_pomodoro',
  'fim_pomodoro',
  'inicio_intervalo',
  'fim_intervalo',
]);

export type NotificationType = z.infer<typeof notificationTypeSchema>;

export const notificationContentSchema = z.object({
  tipo_alerta: notificationTypeSchema,
  mensagem: z.string(),
  cor_alerta: z.string(),
  icone: z.string(),
  arquivo_som: z.string(),
  titulo_notificacao: z.string(),
  corpo_notificacao: z.string(),
});

export type NotificationContent = z.infer<typeof notificationContentSchema>;

export const notificationSettingsSchema = z.object({
  visualAlertsEnabled: z.boolean(),
  pushNotificationsEnabled: z.boolean(),
  soundAlertsEnabled: z.boolean(),
  soundVolume: z.number().int().min(0).max(100),
});

export type NotificationSettings = z.infer<typeof notificationSettingsSchema>;

export interface NotificationContentResponse {
  success: boolean;
  data: NotificationContent;
}

export interface NotificationSettingsResponse {
  success: boolean;
  data: NotificationSettings;
}

export type NotificationPermission = 'default' | 'granted' | 'denied';

export interface DeviceCapabilities {
  notifications: boolean;
  audio: boolean;
  backgroundAudio: boolean;
  vibration: boolean;
}
