import { authenticatedClient } from '@/core/lib/api';
import type { TimerSettings, TimerSettingsResponse } from '../types/settings';

export const settingsService = {
  /**
   * Retrieves the current timer configuration
   * @returns Promise<TimerSettings>
   */
  async getSettings(): Promise<TimerSettings> {
    const { data } = await authenticatedClient.get<TimerSettingsResponse>('/timer-settings');
    return data.data;
  },

  /**
   * Updates the timer configuration
   * @param settings - The new settings to apply
   * @returns Promise<TimerSettings>
   */
  async updateSettings(settings: TimerSettings): Promise<TimerSettings> {
    const { data } = await authenticatedClient.put<TimerSettingsResponse>(
      '/timer-settings',
      settings
    );
    return data.data;
  },
};
