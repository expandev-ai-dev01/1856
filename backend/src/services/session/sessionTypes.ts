/**
 * @interface Session
 * @description Represents a completed Pomodoro session
 *
 * @property {string} sessionId - Unique identifier (UUID)
 * @property {number} userId - User identifier
 * @property {string} sessionDescription - Description of the session
 * @property {Date} startTimestamp - When the session started
 * @property {number} durationMinutes - Duration in minutes
 */
export interface Session {
  sessionId: string;
  userId: number;
  sessionDescription: string;
  startTimestamp: Date;
  durationMinutes: number;
}

/**
 * @interface CreateSessionRequest
 * @description Payload for creating a new session history entry
 */
export interface CreateSessionRequest {
  sessionDescription?: string;
  startTimestamp: string | Date;
  durationMinutes: number;
}
