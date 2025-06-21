import type { Summoner } from "@/models/Summoner";
import type { SummonerEntity } from "@/models/entity/SummonerEntity";

export interface ISummonerDAO {
  findByPuuid: (puuid: string) => Promise<SummonerEntity | null>;
  findByNameAndTag: (summonerName: string, tagLine: string) => Promise<SummonerEntity | null>;
  upsert: (summoner: Summoner) => Promise<void>;
  delete: (summoner: Summoner) => Promise<number>;
}
