import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { HttpStatusCode } from '@/constants';
import * as service from '@/services/session';

/**
 * Validation schema for creating a session
 */
export const createSessionSchema = z.object({
  body: z.object({
    sessionDescription: z.string().max(100).optional(),
    startTimestamp: z.string().datetime(),
    durationMinutes: z.number().int().positive(),
  }),
});

/**
 * @api {get} /api/v1/internal/session-history Get Session History
 * @apiName GetSessionHistory
 * @apiGroup SessionHistory
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves the history of completed Pomodoro sessions for the authenticated user
 *
 * @apiSuccess {Boolean} success Operation status
 * @apiSuccess {Array} data List of sessions
 */
export async function getHistory(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = parseInt((req.headers['x-user-id'] as string) || '1');
    const data = await service.getSessions(userId);

    res.status(HttpStatusCode.OK).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @api {post} /api/v1/internal/session-history Create Session Entry
 * @apiName CreateSessionEntry
 * @apiGroup SessionHistory
 * @apiVersion 1.0.0
 *
 * @apiDescription Records a new completed Pomodoro session
 *
 * @apiParam {String} [sessionDescription] Description of the session (max 100 chars)
 * @apiParam {String} startTimestamp ISO 8601 datetime string
 * @apiParam {Number} durationMinutes Duration in minutes (positive integer)
 *
 * @apiSuccess {Boolean} success Operation status
 * @apiSuccess {Object} data Created session object
 */
export async function createEntry(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = parseInt((req.headers['x-user-id'] as string) || '1');
    const data = await service.createSession(userId, req.body);

    res.status(HttpStatusCode.CREATED).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @api {delete} /api/v1/internal/session-history/:id Delete Session Entry
 * @apiName DeleteSessionEntry
 * @apiGroup SessionHistory
 * @apiVersion 1.0.0
 *
 * @apiDescription Deletes a specific session record from history
 *
 * @apiParam {String} id Session UUID
 *
 * @apiSuccess {Boolean} success Operation status
 */
export async function deleteEntry(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = parseInt((req.headers['x-user-id'] as string) || '1');
    const sessionId = req.params.id;

    const deleted = await service.deleteSession(userId, sessionId);

    if (!deleted) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Session not found',
        },
      });
      return;
    }

    res.status(HttpStatusCode.OK).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
}
