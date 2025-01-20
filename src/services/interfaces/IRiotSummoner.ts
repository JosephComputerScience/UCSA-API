import { RiotSummoner } from '../../models/RiotSummoner';

export interface IRiotSummonerService {
  getSummonerByPuuid(puuid: string): Promise<RiotSummoner>;
}
