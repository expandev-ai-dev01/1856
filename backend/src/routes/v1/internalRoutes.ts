import { Router } from 'express';
import timerSettingsRoutes from './timerSettingsRoutes';
import sessionHistoryRoutes from './sessionHistoryRoutes';

const router = Router();

// Internal/Authenticated routes
router.use('/timer-settings', timerSettingsRoutes);
router.use('/session-history', sessionHistoryRoutes);

export default router;
