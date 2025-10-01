import type { RIOT_QUEUE_KEYS } from "@/constants";
import type { RiotMatchDTO } from "@/dto/RiotMatchDTO";
import type { Summoner } from "@/models/Summoner";

export interface ILeagueOfLegendUserService {
  getSummonerByNameAndTagLine(summonerName: string, tagLine: string): Promise<Summoner | null>;
  getSummonerByPuuid(puuid: string): Promise<Summoner | null>;
  updateMatchesBySummonerNameAndTagAndQueueId(
    summonerName: string,
    tagLine: string,
    queueId: RIOT_QUEUE_KEYS,
    count: number,
  ): Promise<RiotMatchDTO[] | RiotMatchDTO[]>;
  getChampionAggregateStats(): void; // todo: update the return type and params after more thought
  updateSummonerAggregateStats(): void; // todo: update the return type and params after more thought
  updateSummonerByPuuid(puuid: string): Promise<Summoner>;
  updateSummonerBySummonerNameAndTagLine(summonerName: string, tagLine: string): Promise<Summoner>;
}
