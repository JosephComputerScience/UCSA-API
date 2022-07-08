// external imports
import { Request, Response } from 'express';
import Router from 'express-promise-router';
// local imports
import { getMatchesByPuuidAndRegion, getMatchByMatchIdAndRegion } from '../controllers/match';
import { checkForCountQuery } from '../middleware/match/match';

// match router
export const matchRouter = Router();

matchRouter
  .route('/match/ids/:region/:puuid')
  .get(checkForCountQuery, async (req: Request, res: Response) => {
  const count = req.query.count as string
  const match = await getMatchesByPuuidAndRegion(
    req.params.puuid as string,
    req.params.region as string,
    +count,
  );
  res.status(200).json({ ...match });
});

matchRouter
  .route('/match/:region/:matchId')
  .get(async (req: Request, res: Response) => {
    const match = await getMatchByMatchIdAndRegion(
      req.params.matchId as string,
      req.params.region as string,
    );
    res.status(200).json({ ...match });
  });


