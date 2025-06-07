import type { Knex } from "knex";
import type { Summoner } from "../models/Summoner";
import type { SummonerEntity } from "../models/entity/SummonerEntity";
import type { ISummonerDAO } from "./interfaces/ISummonerDAO";

export class SummonerDAO implements ISummonerDAO {
  knex: Knex.QueryBuilder;

  constructor(knex: Knex) {
    this.knex = knex("summoner");
  }

  findByPuuid = async (puuid: string): Promise<SummonerEntity | null> => {
    try {
      const record = await this.knex.select<SummonerEntity>("*").where({ puuid }).first();

      if (!record) {
        return null;
      }
      return record;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  findByNameAndTag = async (summonerName: string, tagLine: string): Promise<SummonerEntity | null> => {
    try {
      const record = await this.knex.select<SummonerEntity>("*").where({ summonerName, tagLine }).first();

      if (!record) {
        return null;
      }
      return record;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  upsert = async (summoner: Summoner) => {
    try {
      const { puuid, summonerName, summonerLevel, profileIconId, updatedAt, tagLine } = summoner;
      const metadata = JSON.stringify({ summonerLevel, profileIconId });
      const lastManualUpdatedAt = new Date();
      await this.knex
        .insert<SummonerEntity>({
          puuid,
          summonerName,
          tagLine,
          metadata,
          updatedAt,
          lastManualUpdatedAt,
        })
        .onConflict("puuid")
        .merge();
      summoner.lastManualUpdatedAt;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  delete = async (summoner: Summoner) => {
    try {
      return await this.knex.select<SummonerEntity>("*").where({ puuid: summoner.puuid }).del();
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
}
