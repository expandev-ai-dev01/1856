import { randomUUID } from 'crypto';
import { Session, CreateSessionRequest } from './sessionTypes';

// In-memory storage for sessions
// Key: userId, Value: Array of Sessions
const sessionStore = new Map<number, Session[]>();

const MAX_HISTORY_SIZE = 50;

/**
 * @summary
 * Retrieves the session history for a specific user, ordered by date descending.
 *
 * @function getSessions
 * @module session
 *
 * @param {number} userId - The user identifier
 * @returns {Promise<Session[]>} List of sessions
 */
export async function getSessions(userId: number): Promise<Session[]> {
  const sessions = sessionStore.get(userId) || [];
  return sessions;
}

/**
 * @summary
 * Creates a new session entry. Enforces the 50-item limit (FIFO).
 *
 * @function createSession
 * @module session
 *
 * @param {number} userId - The user identifier
 * @param {CreateSessionRequest} data - The session data
 * @returns {Promise<Session>} The created session
 */
export async function createSession(userId: number, data: CreateSessionRequest): Promise<Session> {
  const sessions = sessionStore.get(userId) || [];

  const newSession: Session = {
    sessionId: randomUUID(),
    userId,
    sessionDescription: data.sessionDescription || '',
    startTimestamp: new Date(data.startTimestamp),
    durationMinutes: data.durationMinutes,
  };

  // Add new session to the beginning (assuming we want to keep it sorted desc)
  sessions.unshift(newSession);

  // Ensure strict chronological order (descending)
  sessions.sort((a, b) => b.startTimestamp.getTime() - a.startTimestamp.getTime());

  // Enforce limit: Remove oldest if > 50
  if (sessions.length > MAX_HISTORY_SIZE) {
    // Since it's sorted descending, the last item is the oldest
    sessions.pop();
  }

  sessionStore.set(userId, sessions);
  return newSession;
}

/**
 * @summary
 * Deletes a specific session from history.
 *
 * @function deleteSession
 * @module session
 *
 * @param {number} userId - The user identifier
 * @param {string} sessionId - The session UUID
 * @returns {Promise<boolean>} True if deleted, false if not found
 */
export async function deleteSession(userId: number, sessionId: string): Promise<boolean> {
  const sessions = sessionStore.get(userId);
  if (!sessions) return false;

  const initialLength = sessions.length;
  const filteredSessions = sessions.filter((s) => s.sessionId !== sessionId);

  if (filteredSessions.length === initialLength) {
    return false;
  }

  sessionStore.set(userId, filteredSessions);
  return true;
}
