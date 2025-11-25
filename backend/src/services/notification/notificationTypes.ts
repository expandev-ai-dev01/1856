/**
 * @interface NotificationSettings
 * @description Represents notification configuration for a user
 *
 * @property {number} idUser - User identifier
 * @property {boolean} visualAlertsEnabled - Visual alerts activation status
 * @property {boolean} pushNotificationsEnabled - Push notifications activation status
 * @property {boolean} soundAlertsEnabled - Sound alerts activation status
 * @property {number} soundVolume - Sound volume level (0-100)
 * @property {Date} updatedAt - Last update timestamp
 */
export interface NotificationSettings {
  idUser: number;
  visualAlertsEnabled: boolean;
  pushNotificationsEnabled: boolean;
  soundAlertsEnabled: boolean;
  soundVolume: number;
  updatedAt: Date;
}

/**
 * @interface UpdateNotificationSettingsRequest
 * @description Payload for updating notification settings
 */
export interface UpdateNotificationSettingsRequest {
  visualAlertsEnabled?: boolean;
  pushNotificationsEnabled?: boolean;
  soundAlertsEnabled?: boolean;
  soundVolume?: number;
}

/**
 * @enum NotificationType
 * @description Types of cycle notifications
 */
export enum NotificationType {
  StartPomodoro = 'inicio_pomodoro',
  EndPomodoro = 'fim_pomodoro',
  StartBreak = 'inicio_intervalo',
  EndBreak = 'fim_intervalo',
}

/**
 * @interface NotificationContent
 * @description Content structure for notifications
 */
export interface NotificationContent {
  type: NotificationType;
  title: string;
  message: string;
  color?: string;
  icon?: string;
  soundFile?: string;
}
