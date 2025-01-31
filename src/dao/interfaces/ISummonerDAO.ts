import type { Summoner } from "../../models/Summoner";

export interface ISummonerDAO {
  findByPuuid: (puuid: string) => Promise<Summoner | null>;
  findByNameAndTag: (summonerName: string, tagLine: string) => Promise<Summoner | null>;
  delete: (summoner: Summoner) => void;
  save: (summoner: Summoner) => void;
  update: (summoner: Summoner) => void;
  upsert: (summoner: Summoner) => void;
}
