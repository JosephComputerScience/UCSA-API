import { Summoner } from '../../models/Summoner';

export interface ISummonerDAO {
  findByPuuid: (puuid: string) => Promise<Summoner | null>;
  findByNameAndTag: (
    summonerName: string,
    tagLine: string
  ) => Promise<Summoner | null>;
  delete: (summoner: Summoner) => Promise<void>;
  save: (summoner: Summoner) => Promise<void>;
  update: (summoner: Summoner) => Promise<void>;
}
