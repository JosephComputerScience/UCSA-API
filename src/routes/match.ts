// external imports
import { Request, Response } from 'express';
import Router from 'express-promise-router';
// local imports
import { getMatchesByPuidAndRegion, getMatchesByMatchIdAndRegion } from '../controllers/match';

// match router
export const matchRouter = Router();

matchRouter
  .route('/match/ids/:region/:puuid')
  .get(async (req: Request, res: Response) => {
  const match = await getMatchesByPuidAndRegion(
    req.params.puuid as string,
    req.params.region as string,
    //req.query.startTime as number,
    //Add optional query params?
//   req.params.startTime as long,
//   req.params.endTime as long,
//   req.params.queue as int,
//   req.params.type as string,
//   req.params.start as int,
//   req.params.count as int,
  );
  res.status(200).json({ ...match });
});

matchRouter
  .route('/match/:region/:matchId')
  .get(async (req: Request, res: Response) => {
    const match = await getMatchesByMatchIdAndRegion(
      req.params.matchId as string,
      req.params.region as string,
    );
    res.status(200).json({ ...match });
  });


