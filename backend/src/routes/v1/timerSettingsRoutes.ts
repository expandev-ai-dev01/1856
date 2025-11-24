import { Router } from 'express';
import { validationMiddleware } from '@/middleware/validation';
import * as controller from '@/api/v1/internal/timer-settings/controller';

const router = Router();

// Get current settings
router.get('/', controller.getSettings);

// Update settings
router.put('/', validationMiddleware(controller.updateSettingsSchema), controller.updateSettings);

export default router;
