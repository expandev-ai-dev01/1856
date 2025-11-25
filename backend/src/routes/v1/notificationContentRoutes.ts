import { Router } from 'express';
import { validationMiddleware } from '@/middleware/validation';
import * as controller from '@/api/v1/internal/notification-content/controller';

const router = Router();

// Get notification content by type
router.get(
  '/:type',
  validationMiddleware(controller.getNotificationContentSchema),
  controller.getContent
);

export default router;
