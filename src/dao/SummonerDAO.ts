import type { Knex } from "knex";
import type { Summoner } from "../models/Summoner";
import type { SummonerEntity } from "../models/entity/SummonerEntity";
import type { ISummonerDAO } from "./interfaces/ISummonerDAO";

export class SummonerDAO implements ISummonerDAO {
  knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  findByPuuid = async (puuid: string): Promise<SummonerEntity | null> => {
    try {
      const record = await this.knex("summoner").select<SummonerEntity>("*").where({ puuid }).first();

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
      const record = await this.knex("summoner").select<SummonerEntity>("*").where({ summonerName, tagLine }).first();

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
      const { puuid, summonerName, tagLine, accountId, summonerId, summonerLevel, profileIconId, revisionDate } = summoner;
      const updatedAt = new Date();
      const entity: SummonerEntity = {
        puuid,
        summonerName,
        tagLine,
        accountId,
        summonerId,
        summonerLevel,
        profileIconId,
        revisionDate,
        updatedAt,
      };
      await this.knex("summoner").insert<SummonerEntity>(entity).onConflict("puuid").merge();
      summoner.updatedAt = updatedAt;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  delete = async (summoner: Summoner) => {
    try {
      return await this.knex("summoner").select<SummonerEntity>("*").where({ puuid: summoner.puuid }).del();
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
}
