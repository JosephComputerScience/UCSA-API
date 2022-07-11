import { Request, Response, NextFunction } from 'express';

/**
 * Controller checks to see if count is of type Number
 * If not a bad request error is thrown.
 */
export const checkForCountQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
 try {
    if(req.query.count){
        const countQuery = req.query.count as string

        if ( Number.isNaN(countQuery) ){
            throw new TypeError('Missing count param')
        }
    }

 } catch (e) {
  throw new Error('Count is not of type Number')
 }
  next();
};