import type { Knex } from "knex";
import type { LeagueMatchEntity } from "../models/entity/LeagueMatchEntity";
import type { ILeagueMatchDAO } from "./interfaces/ILeagueMatchDAO";

export class LeagueMatchDAO implements ILeagueMatchDAO {
  knex: Knex.QueryBuilder;

  constructor(knex: Knex) {
    this.knex = knex("league_match");
  }

  async getMatchesByPuuid(puuid: string): Promise<LeagueMatchEntity[]> {
    return await this.knex.select<LeagueMatchEntity[]>("*").where({ puuid });
  }

  async batchInsert(batch: LeagueMatchEntity[]) {
    await this.knex.insert<LeagueMatchEntity>(batch);
  }

  async batchDeleteByPuuid(puuid: string) {
    await this.knex.where({ puuid }).del();
  }
}
