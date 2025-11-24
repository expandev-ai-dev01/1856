import { Request, Response } from 'express';
import { HttpStatusCode } from '@/constants';

/**
 * @api {get} /health Health Check
 * @apiName GetHealth
 * @apiGroup System
 * @apiVersion 1.0.0
 *
 * @apiDescription Checks if the API is running and healthy
 *
 * @apiSuccess {String} status System status
 * @apiSuccess {String} timestamp Current server time
 */
export const getHealth = (req: Request, res: Response) => {
  res.status(HttpStatusCode.OK).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
};
