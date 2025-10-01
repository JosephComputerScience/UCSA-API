import type { LeagueMatchEntity } from "@/models/entity/LeagueMatchEntity";
import type { Knex } from "knex";
import type { ILeagueMatchDAO } from "./interfaces/ILeagueMatchDAO";

export class LeagueMatchDAO implements ILeagueMatchDAO {
  knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  async getMatchesByPuuid(puuid: string): Promise<LeagueMatchEntity[]> {
    return await this.knex("league_match").select<LeagueMatchEntity[]>("*").where({ puuid });
  }

  async batchInsert(batch: LeagueMatchEntity[]) {
    await this.knex("league_match").insert<LeagueMatchEntity>(batch);
  }

  async batchDeleteByPuuid(puuid: string) {
    await this.knex("league_match").where({ puuid }).del();
  }

  async updateUserMatchesByPuuid(puuid: string, matchEntities: LeagueMatchEntity[]): Promise<void> {
    await this.knex.transaction(async (trx) => {
      await trx("league_match").where({ puuid }).del();
      await trx("league_match").insert(matchEntities);
    });
  }
}
