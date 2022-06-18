// external imports
import { Request, Response, NextFunction } from 'express';
// local imports
import { BadRequestError } from './BadRequestError';
import { NotFoundError } from './NotFoundError';
import { UnauthorizedError } from './UnauthorizedError';

/**
 * Error handler uses a switch case to throw errors.
 * Defaults to 500 status code.
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response<any, Record<string, any>> => {
  console.log(`REQUEST FAILURE`, req.method, req.url, req.params, err);
  switch (err.constructor) {
    case BadRequestError: {
      return res.status(400).json({ error: err.message });
    }
    case NotFoundError: {
      return res.status(404).json({ error: err.message });
    }
    case UnauthorizedError: {
      return res.status(401).json({ error: err.message });
    }
    default: {
      return res.status(500).json({ error: err.message });
    }
  }
};
