import type { Summoner } from "../../models/Summoner";

export interface ISummonerService {
  getSummonerByNameAndTagline(summonerName: string, tagLine: string): Promise<Summoner | null>;
}
