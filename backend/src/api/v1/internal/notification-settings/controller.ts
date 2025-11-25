import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { HttpStatusCode } from '@/constants';
import * as service from '@/services/notification';

/**
 * Validation schema for updating notification settings
 */
export const updateNotificationSettingsSchema = z.object({
  body: z.object({
    visualAlertsEnabled: z.boolean().optional(),
    pushNotificationsEnabled: z.boolean().optional(),
    soundAlertsEnabled: z.boolean().optional(),
    soundVolume: z.number().int().min(0).max(100).optional(),
  }),
});

/**
 * @api {get} /api/v1/internal/notification-settings Get Notification Settings
 * @apiName GetNotificationSettings
 * @apiGroup NotificationSettings
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves the current notification configuration for the authenticated user
 *
 * @apiSuccess {Boolean} success Operation status
 * @apiSuccess {Object} data Notification settings object
 */
export async function getSettings(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = parseInt((req.headers['x-user-id'] as string) || '1');
    const data = await service.getNotificationSettings(userId);

    res.status(HttpStatusCode.OK).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @api {put} /api/v1/internal/notification-settings Update Notification Settings
 * @apiName UpdateNotificationSettings
 * @apiGroup NotificationSettings
 * @apiVersion 1.0.0
 *
 * @apiDescription Updates the notification configuration for the authenticated user
 *
 * @apiParam {Boolean} [visualAlertsEnabled] Enable/disable visual alerts
 * @apiParam {Boolean} [pushNotificationsEnabled] Enable/disable push notifications
 * @apiParam {Boolean} [soundAlertsEnabled] Enable/disable sound alerts
 * @apiParam {Number} [soundVolume] Sound volume level (0-100)
 *
 * @apiSuccess {Boolean} success Operation status
 * @apiSuccess {Object} data Updated notification settings object
 */
export async function updateSettings(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = parseInt((req.headers['x-user-id'] as string) || '1');
    const data = await service.updateNotificationSettings(userId, req.body);

    res.status(HttpStatusCode.OK).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}
