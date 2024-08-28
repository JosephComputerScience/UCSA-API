import { Summoner } from '../../models/Summoner';

export interface ISummonerService {
  getSummoner(summonerName: string, tagLine: string): Promise<Summoner | null>;
}
