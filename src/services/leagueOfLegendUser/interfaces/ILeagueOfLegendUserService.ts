import type { RiotMatchDTO } from "@/dto/RiotMatchDTO";
import type { Summoner } from "@/models/Summoner";

export interface ILeagueOfLegendUserService {
  getSummonerByNameAndTagLine(summonerName: string, tagLine: string): Promise<Summoner | null>;
  getSummonerByPuuid(puuid: string): Promise<Summoner | null>;
  getChampionAggregateStats(): void; // todo: update the return type and params after more thought
  updateSummonerAggregateStats(): void; // todo: update the return type and params after more thought
  updateSummonerByPuuid(puuid: string): Promise<Summoner>;
  updateSummonerBySummonerNameAndTagLine(summonerName: string, tagLine: string): Promise<Summoner>;
}
