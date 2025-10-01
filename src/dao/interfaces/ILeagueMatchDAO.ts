import type { LeagueMatchEntity } from "@/models/entity/LeagueMatchEntity";

export interface ILeagueMatchDAO {
  getMatchesByPuuid(puuid: string): Promise<LeagueMatchEntity[]>;
  batchInsert(batch: LeagueMatchEntity[]): Promise<void>;
  batchDeleteByPuuid(puuid: string): Promise<void>;
  updateUserMatchesByPuuid(puuid: string, matches: LeagueMatchEntity[]): Promise<void>;
}
