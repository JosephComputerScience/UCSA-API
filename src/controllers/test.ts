import { riotService } from "../config/container";
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const test = async (req: any, res: any) => {
  const t = await riotService.getMatchIdsByPuuid(req.params.puuid, 450);
  res.send(t);
};
