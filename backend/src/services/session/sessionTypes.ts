/**
 * @interface Session
 * @description Represents a completed Pomodoro session
 *
 * @property {string} sessionId - Unique identifier (UUID)
 * @property {number} userId - User identifier
 * @property {string} taskDescription - Description of the task
 * @property {Date} startTimestamp - When the session started
 * @property {number} durationMinutes - Duration in minutes
 */
export interface Session {
  sessionId: string;
  userId: number;
  taskDescription: string;
  startTimestamp: Date;
  durationMinutes: number;
}

/**
 * @interface CreateSessionRequest
 * @description Payload for creating a new session history entry
 */
export interface CreateSessionRequest {
  taskDescription: string;
  startTimestamp: string | Date;
  durationMinutes: number;
}
