import type { Knex } from "knex";
import type { Summoner } from "../models/Summoner";
import type { ISummonerDAO } from "./interfaces/ISummonerDAO";
import type { SummonerTRecord } from "./interfaces/summonerRecord";

export class SummonerDAO implements ISummonerDAO {
  knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  findByPuuid = async (puuid: string): Promise<SummonerTRecord | null> => {
    try {
      const record = await this.knex<SummonerTRecord>("summoner").select("*").where({ puuid }).first();

      if (!record) {
        return null;
      }
      return record;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  findByNameAndTag = async (summonerName: string, tagLine: string): Promise<SummonerTRecord | null> => {
    try {
      const record = await this.knex<SummonerTRecord>("summoner").select("*").where({ summonerName, tagLine }).first();

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
      await this.knex<SummonerTRecord>("summoner")
        .insert({
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
      return await this.knex<SummonerTRecord>("summoner").where({ puuid: summoner.puuid }).del();
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
}
