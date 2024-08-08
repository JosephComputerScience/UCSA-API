import { RiotSummoner } from '../../models/RiotSummoner';

export interface IRiotSummonerService {
  findByPuuid(puuid: string): Promise<RiotSummoner>;
}
