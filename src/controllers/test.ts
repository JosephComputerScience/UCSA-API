import { riotService } from '../config/container';
export const test = async (req: any, res: any) => {
  const t = await riotService.getMatchIdsByPuuid(req.params.puuid, 450);
  res.send(t);
};
