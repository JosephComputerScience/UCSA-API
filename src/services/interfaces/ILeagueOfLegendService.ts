import type { RIOT_QUEUE_IDS } from "../../constants";
import type { RiotMatchDTO } from "../../dto/RiotMatchDTO";
import type { Summoner } from "../../models/Summoner";

export interface ILeagueOfLegendService {
  getSummonerByNameAndTagline(summonerName: string, tagLine: string): Promise<Summoner | null>;
  getSummonerByPuuid(puuid: string): Promise<Summoner | null>;
  updateMatchesBySummonerNameAndTagAndQueueId(
    summonerName: string,
    tagLine: string,
    queueId: keyof typeof RIOT_QUEUE_IDS,
    count: number,
  ): Promise<RiotMatchDTO[] | RiotMatchDTO[]>;
  getChampionAggregateStats(): void; // todo: update the return type and params after more thought
  updateSummonerAggregateStats(): void; // todo: update the return type and params after more thought
}
