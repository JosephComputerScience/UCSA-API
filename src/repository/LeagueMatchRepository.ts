import type { ILeagueMatchDAO } from "@/dao/interfaces/ILeagueMatchDAO";
import type { LeagueMatch } from "@/models/riotMatches/LeagueMatch";
import type { ILeagueMatchRepository } from "./interfaces/ILeagueMatchRepository";

export class LeagueMatchRepository implements ILeagueMatchRepository {
  private _leagueMatchDAO: ILeagueMatchDAO;

  constructor(leagueMatchDAO: ILeagueMatchDAO) {
    this._leagueMatchDAO = leagueMatchDAO;
  }

  async deleteAllMatchesByPuuid(puuid: string) {
    await this._leagueMatchDAO.batchDeleteByPuuid(puuid);
  }

  async getAllMatchesByPuuid(puuid: string): Promise<LeagueMatch[]> {
    const records = await this._leagueMatchDAO.getMatchesByPuuid(puuid);
    // todo: need to convert the entity to league match model because match stats are a json under match stats
    console.log("records", records);
    return [];
  }

  async updateUserMatchesByPuuid(puuid: string, matches: LeagueMatch[]) {
    const entities = matches.map((match) => {
      const entity = match.toEntity();
      entity.updateUpdatedAt();
      return entity;
    });
    await this._leagueMatchDAO.updateUserMatchesByPuuid(puuid, entities);
  }
}
