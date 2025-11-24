import { TimerSettings, UpdateTimerSettingsRequest } from './timerSettingsTypes';

// In-memory storage for timer settings
// Key: userId, Value: TimerSettings
const settingsStore = new Map<number, TimerSettings>();

/**
 * @summary
 * Retrieves timer settings for a specific user. Returns default values if not found.
 *
 * @function getSettings
 * @module timerSettings
 *
 * @param {number} userId - The user identifier
 * @returns {Promise<TimerSettings>} The user's timer settings
 */
export async function getSettings(userId: number): Promise<TimerSettings> {
  const settings = settingsStore.get(userId);

  if (!settings) {
    // Return default values as per specification
    return {
      idUser: userId,
      focusDuration: 25,
      shortBreakDuration: 5,
      longBreakDuration: 15,
      updatedAt: new Date(),
    };
  }

  return settings;
}

/**
 * @summary
 * Updates or creates timer settings for a specific user.
 *
 * @function updateSettings
 * @module timerSettings
 *
 * @param {number} userId - The user identifier
 * @param {UpdateTimerSettingsRequest} data - The new settings values
 * @returns {Promise<TimerSettings>} The updated settings
 */
export async function updateSettings(
  userId: number,
  data: UpdateTimerSettingsRequest
): Promise<TimerSettings> {
  const newSettings: TimerSettings = {
    idUser: userId,
    ...data,
    updatedAt: new Date(),
  };

  settingsStore.set(userId, newSettings);
  return newSettings;
}
