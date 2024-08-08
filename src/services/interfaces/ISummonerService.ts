import { Summoner } from '../../models/Summoner';

export interface ISummonerService {
  getUser(summonerName: string, tag: string): Promise<Summoner | null>;
}
