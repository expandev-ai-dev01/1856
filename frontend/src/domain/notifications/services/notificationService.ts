import { authenticatedClient } from '@/core/lib/api';
import type {
  NotificationContent,
  NotificationContentResponse,
  NotificationSettings,
  NotificationSettingsResponse,
  NotificationType,
} from '../types/notification';

/**
 * @service NotificationService
 * @domain notifications
 * @type REST API Integration
 */
export const notificationService = {
  /**
   * Retrieves notification content for a specific cycle event
   */
  async getContent(type: NotificationType): Promise<NotificationContent> {
    const { data } = await authenticatedClient.get<NotificationContentResponse>(
      `/notification-content/${type}`
    );
    return data.data;
  },

  /**
   * Retrieves current notification settings
   */
  async getSettings(): Promise<NotificationSettings> {
    const { data } = await authenticatedClient.get<NotificationSettingsResponse>(
      '/notification-settings'
    );
    return data.data;
  },

  /**
   * Updates notification settings
   */
  async updateSettings(settings: Partial<NotificationSettings>): Promise<NotificationSettings> {
    const { data } = await authenticatedClient.put<NotificationSettingsResponse>(
      '/notification-settings',
      settings
    );
    return data.data;
  },
};
