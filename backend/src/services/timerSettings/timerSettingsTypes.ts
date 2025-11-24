/**
 * @interface TimerSettings
 * @description Represents the timer configuration settings for a user
 *
 * @property {number} idUser - User identifier
 * @property {number} focusDuration - Duration of focus session in minutes
 * @property {number} shortBreakDuration - Duration of short break in minutes
 * @property {number} longBreakDuration - Duration of long break in minutes
 * @property {Date} updatedAt - Timestamp of last update
 */
export interface TimerSettings {
  idUser: number;
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  updatedAt: Date;
}

/**
 * @interface UpdateTimerSettingsRequest
 * @description Payload for updating timer settings
 */
export interface UpdateTimerSettingsRequest {
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
}
