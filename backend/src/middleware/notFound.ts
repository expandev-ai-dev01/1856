import { Request, Response } from 'express';
import { HttpStatusCode } from '@/constants';

export function notFoundMiddleware(req: Request, res: Response) {
  res.status(HttpStatusCode.NOT_FOUND).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.path} not found`,
    },
    timestamp: new Date().toISOString(),
  });
}
