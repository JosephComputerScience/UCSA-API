import { RiotSummoner } from '../../models/RiotSummoner';

export interface IRiotSummonerDAO {
  findByPuuid(puuid: string): Promise<RiotSummoner>;
}
