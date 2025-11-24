import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { HttpStatusCode } from '@/constants';
import * as service from '@/services/timerSettings';

/**
 * Validation schema for updating timer settings
 * Enforces business rules for duration limits
 */
export const updateSettingsSchema = z.object({
  body: z.object({
    focusDuration: z.number().int().min(5).max(90),
    shortBreakDuration: z.number().int().min(1).max(30),
    longBreakDuration: z.number().int().min(10).max(60),
  }),
});

/**
 * @api {get} /api/v1/internal/timer-settings Get Timer Settings
 * @apiName GetTimerSettings
 * @apiGroup TimerSettings
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves the current timer configuration for the authenticated user
 *
 * @apiSuccess {Boolean} success Operation status
 * @apiSuccess {Object} data Timer settings object
 */
export async function getSettings(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // In a real scenario, userId would come from auth middleware (req.user.id)
    // For this implementation, we simulate it via header or default to 1
    const userId = parseInt((req.headers['x-user-id'] as string) || '1');

    const data = await service.getSettings(userId);

    res.status(HttpStatusCode.OK).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @api {put} /api/v1/internal/timer-settings Update Timer Settings
 * @apiName UpdateTimerSettings
 * @apiGroup TimerSettings
 * @apiVersion 1.0.0
 *
 * @apiDescription Updates the timer configuration for the authenticated user
 *
 * @apiParam {Number} focusDuration Focus duration in minutes (5-90)
 * @apiParam {Number} shortBreakDuration Short break duration in minutes (1-30)
 * @apiParam {Number} longBreakDuration Long break duration in minutes (10-60)
 *
 * @apiSuccess {Boolean} success Operation status
 * @apiSuccess {Object} data Updated timer settings object
 */
export async function updateSettings(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = parseInt((req.headers['x-user-id'] as string) || '1');

    const data = await service.updateSettings(userId, req.body);

    res.status(HttpStatusCode.OK).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}
