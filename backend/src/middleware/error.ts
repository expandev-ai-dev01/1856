import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { logger } from '@/utils/logger';
import { HttpStatusCode } from '@/constants';

interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
}

export function errorMiddleware(error: any, req: Request, res: Response, next: NextFunction) {
  const timestamp = new Date().toISOString();

  // Log the error
  logger.error('Request error', {
    path: req.path,
    method: req.method,
    error: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
  });

  // Handle Zod Validation Errors
  if (error instanceof ZodError) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid request parameters',
        details: error.errors,
      },
      timestamp,
    });
  }

  // Handle Syntax Errors (JSON parsing)
  if (error instanceof SyntaxError && 'body' in error) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      error: {
        code: 'INVALID_JSON',
        message: 'Invalid JSON format',
      },
      timestamp,
    });
  }

  // Default Internal Server Error
  const statusCode = error.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
  const message = error.statusCode ? error.message : 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: {
      code: error.code || 'SERVER_ERROR',
      message,
    },
    timestamp,
  });
}
