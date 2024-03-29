// external imports
import { Request, Response } from 'express';
import Router from 'express-promise-router';
// local imports
// middleware
import { validateQueryCountOrDefault20 } from '../middleware/match/match';
//services
import {
  getMatchesByPuidAndRegion,
  getMatchByMatchIdAndRegion,
  groupDataByChamp,
} from '../controllers/match';

// match router
export const matchRouter = Router();
// match router root endpoint
matchRouter.use('/match', matchRouter);

matchRouter
  .route('/group-by-champ/:region/:puuid')
  .get(validateQueryCountOrDefault20, async (req: Request, res: Response) => {
    const count = req.query.count as string;
    const result = await groupDataByChamp(
      req.params.puuid as string,
      req.params.region as string,
      +count
    );
    res.status(200).json({ ...result });
  });

matchRouter
  .route('/ids/:region/:puuid')
  .get(async (req: Request, res: Response) => {
    const count = req.query.count as string;
    const match = await getMatchesByPuidAndRegion(
      req.params.puuid as string,
      req.params.region as string,
      +count
    );
    res.status(200).json({ ...match });
  });

matchRouter
  .route('/:region/:matchId')
  .get(async (req: Request, res: Response) => {
    const match = await getMatchByMatchIdAndRegion(
      req.params.matchId as string,
      req.params.region as string
    );
    res.status(200).json({ ...match });
  });
