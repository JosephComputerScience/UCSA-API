import { Request, Response, NextFunction } from 'express';

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
  throw new Error('my error')
 }
  next();
};