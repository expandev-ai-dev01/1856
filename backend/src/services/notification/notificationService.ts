import {
  NotificationSettings,
  UpdateNotificationSettingsRequest,
  NotificationType,
  NotificationContent,
} from './notificationTypes';

// In-memory storage for notification settings
const notificationSettingsStore = new Map<number, NotificationSettings>();

/**
 * @summary
 * Retrieves notification settings for a specific user. Returns default values if not found.
 *
 * @function getNotificationSettings
 * @module notification
 *
 * @param {number} userId - The user identifier
 * @returns {Promise<NotificationSettings>} The user's notification settings
 */
export async function getNotificationSettings(userId: number): Promise<NotificationSettings> {
  const settings = notificationSettingsStore.get(userId);

  if (!settings) {
    return {
      idUser: userId,
      visualAlertsEnabled: true,
      pushNotificationsEnabled: true,
      soundAlertsEnabled: true,
      soundVolume: 80,
      updatedAt: new Date(),
    };
  }

  return settings;
}

/**
 * @summary
 * Updates notification settings for a specific user.
 *
 * @function updateNotificationSettings
 * @module notification
 *
 * @param {number} userId - The user identifier
 * @param {UpdateNotificationSettingsRequest} data - The new settings values
 * @returns {Promise<NotificationSettings>} The updated settings
 */
export async function updateNotificationSettings(
  userId: number,
  data: UpdateNotificationSettingsRequest
): Promise<NotificationSettings> {
  const currentSettings = await getNotificationSettings(userId);

  const updatedSettings: NotificationSettings = {
    ...currentSettings,
    ...data,
    updatedAt: new Date(),
  };

  notificationSettingsStore.set(userId, updatedSettings);
  return updatedSettings;
}

/**
 * @summary
 * Retrieves notification content based on notification type.
 *
 * @function getNotificationContent
 * @module notification
 *
 * @param {NotificationType} type - The notification type
 * @returns {NotificationContent} The notification content
 */
export function getNotificationContent(type: NotificationType): NotificationContent {
  const contentMap: Record<NotificationType, NotificationContent> = {
    [NotificationType.StartPomodoro]: {
      type: NotificationType.StartPomodoro,
      title: 'Pomodoro Iniciado',
      message: 'Hora de focar! Seu Pomodoro começou.',
      color: '#FF5252',
      icon: 'timer',
      soundFile: '/assets/sounds/start-pomodoro.mp3',
    },
    [NotificationType.EndPomodoro]: {
      type: NotificationType.EndPomodoro,
      title: 'Pomodoro Concluído',
      message: 'Pomodoro concluído! Hora de uma pausa.',
      color: '#FF5252',
      icon: 'timer',
      soundFile: '/assets/sounds/end-pomodoro.mp3',
    },
    [NotificationType.StartBreak]: {
      type: NotificationType.StartBreak,
      title: 'Intervalo Iniciado',
      message: 'Seu intervalo começou. Aproveite para descansar.',
      color: '#4CAF50',
      icon: 'coffee',
      soundFile: '/assets/sounds/start-break.mp3',
    },
    [NotificationType.EndBreak]: {
      type: NotificationType.EndBreak,
      title: 'Intervalo Finalizado',
      message: 'Intervalo finalizado. Prepare-se para o próximo Pomodoro.',
      color: '#4CAF50',
      icon: 'coffee',
      soundFile: '/assets/sounds/end-break.mp3',
    },
  };

  return contentMap[type];
}
