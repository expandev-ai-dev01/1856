import { authenticatedClient } from '@/core/lib/api';
import type { Session, SessionHistoryResponse } from '../types/session';

export const sessionService = {
  /**
   * Retrieves the history of completed sessions
   */
  async getHistory(): Promise<Session[]> {
    const { data } = await authenticatedClient.get<SessionHistoryResponse>('/session-history');
    return data.data;
  },

  /**
   * Deletes a specific session record
   */
  async deleteEntry(id: string): Promise<void> {
    await authenticatedClient.delete(`/session-history/${id}`);
  },

  /**
   * Creates a new session entry (used by Timer feature)
   */
  async createEntry(entry: {
    sessionDescription?: string;
    startTimestamp: string;
    durationMinutes: number;
  }): Promise<Session> {
    const { data } = await authenticatedClient.post<{ success: boolean; data: Session }>(
      '/session-history',
      entry
    );
    return data.data;
  },
};
