import type { Summoner } from "../../models/Summoner";

export interface ISummonerRepository {
  findByNameAndTag: (name: string, tag: string) => Promise<Summoner | null>;
  findByPuuid: (puuid: string) => Promise<Summoner | null>;
  save: (summoner: Summoner) => void;
}
