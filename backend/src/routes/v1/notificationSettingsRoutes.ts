import { Router } from 'express';
import { validationMiddleware } from '@/middleware/validation';
import * as controller from '@/api/v1/internal/notification-settings/controller';

const router = Router();

// Get notification settings
router.get('/', controller.getSettings);

// Update notification settings
router.put(
  '/',
  validationMiddleware(controller.updateNotificationSettingsSchema),
  controller.updateSettings
);

export default router;
