// external import
import { Request, Response, NextFunction } from 'express';
// custom error handler
import { BadRequestError } from '../../errorHandler/BadRequestError';

/**
 * Validates query count and defaults to 20 or 100 if count is larger than 100
 * If not a bad request error is thrown.
 */
export const validateQueryCountOrDefault20 = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.query.count) {
      req.query['count'] = '20';
    } else {
      const countQuery = req.query.count as string;
      console.log(Number.isNaN(countQuery), countQuery);
      if (isNaN(Number(countQuery))) {
        throw new BadRequestError('Query count must be of type number');
      }
      let count = +countQuery;
      if (count > 100) {
        count = 100;
      } else if (count < 1) {
        throw new BadRequestError('Query count must be between 1-100');
      }
    }
  } catch (e) {
    if (e instanceof BadRequestError) {
      console.log(e.message);
      throw e;
    } else {
      console.log(e);
    }
    throw e;
  }
  next();
};
