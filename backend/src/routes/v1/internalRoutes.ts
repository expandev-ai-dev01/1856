import { Router } from 'express';
import timerSettingsRoutes from './timerSettingsRoutes';
import sessionHistoryRoutes from './sessionHistoryRoutes';
import notificationSettingsRoutes from './notificationSettingsRoutes';
import notificationContentRoutes from './notificationContentRoutes';

const router = Router();

// Internal/Authenticated routes
router.use('/timer-settings', timerSettingsRoutes);
router.use('/session-history', sessionHistoryRoutes);
router.use('/notification-settings', notificationSettingsRoutes);
router.use('/notification-content', notificationContentRoutes);

export default router;
