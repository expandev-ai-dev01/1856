import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { HttpStatusCode } from '@/constants';
import { getNotificationContent, NotificationType } from '@/services/notification';

/**
 * Validation schema for notification content request
 */
export const getNotificationContentSchema = z.object({
  params: z.object({
    type: z.enum(['inicio_pomodoro', 'fim_pomodoro', 'inicio_intervalo', 'fim_intervalo']),
  }),
});

/**
 * @api {get} /api/v1/internal/notification-content/:type Get Notification Content
 * @apiName GetNotificationContent
 * @apiGroup NotificationContent
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves notification content (title, message, color, icon, sound) for a specific cycle event
 *
 * @apiParam {String} type Notification type (inicio_pomodoro, fim_pomodoro, inicio_intervalo, fim_intervalo)
 *
 * @apiSuccess {Boolean} success Operation status
 * @apiSuccess {Object} data Notification content object
 */
export async function getContent(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { type } = req.params;
    const data = getNotificationContent(type as NotificationType);

    res.status(HttpStatusCode.OK).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}
