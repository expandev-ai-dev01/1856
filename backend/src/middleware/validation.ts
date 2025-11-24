import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

export const validationMiddleware =
  (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate request body, query, and params against the schema
      // We use parseAsync to handle async refinements if any
      const validatedData = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      // Replace request data with validated/transformed data
      req.body = validatedData.body;
      req.query = validatedData.query;
      req.params = validatedData.params;

      next();
    } catch (error) {
      next(error);
    }
  };
