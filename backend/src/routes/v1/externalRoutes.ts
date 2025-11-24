import { Router } from 'express';
import { getHealth } from '@/api/health/controller';

const router = Router();

// Public routes
router.get('/health', getHealth);

export default router;
