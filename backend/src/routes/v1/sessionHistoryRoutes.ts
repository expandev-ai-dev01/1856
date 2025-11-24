import { Router } from 'express';
import { validationMiddleware } from '@/middleware/validation';
import * as controller from '@/api/v1/internal/session-history/controller';

const router = Router();

// Get history
router.get('/', controller.getHistory);

// Create new entry
router.post('/', validationMiddleware(controller.createSessionSchema), controller.createEntry);

// Delete entry
router.delete('/:id', controller.deleteEntry);

export default router;
