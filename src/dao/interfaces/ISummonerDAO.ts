import type { Summoner } from "../../models/Summoner";
import type { SummonerTRecord } from "./summonerRecord";

export interface ISummonerDAO {
  findByPuuid: (puuid: string) => Promise<SummonerTRecord | null>;
  findByNameAndTag: (summonerName: string, tagLine: string) => Promise<SummonerTRecord | null>;
  upsert: (summoner: Summoner) => void;
  delete: (summoner: Summoner) => void;
}
