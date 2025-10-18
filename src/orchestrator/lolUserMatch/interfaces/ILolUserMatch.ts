import type { Summoner } from "@/models/Summoner";

export interface ILolUserMatch {
  getSummonerByPuuid(puuid: string): Promise<Summoner>;
  getSummonerByNameAndTagLine(summonerName: string, tagLine: string): Promise<Summoner>;
  updateSummonerAndMatchesByPuuid(puuid: string): Promise<Summoner>;
  updateSummonerAndMatchesByNameAndTagLine(summonerName: string, tagLine: string): Promise<Summoner>;
}
