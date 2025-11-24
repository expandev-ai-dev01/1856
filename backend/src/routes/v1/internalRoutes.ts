import { Router } from 'express';
import timerSettingsRoutes from './timerSettingsRoutes';

const router = Router();

// Internal/Authenticated routes
router.use('/timer-settings', timerSettingsRoutes);

export default router;
