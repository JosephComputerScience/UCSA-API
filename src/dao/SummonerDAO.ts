import { Knex } from 'knex';
import { Summoner } from '../models/Summoner';
import { db } from '../utils/db';
import { ISummonerDAO } from './interfaces/ISummonerDAO';
import {
  SummonerTRecord,
  SummonerTResult,
} from './recordInterfaces/summonerRecord';

export class SummonerDAO implements ISummonerDAO {
  knex: Knex;

  constructor(db: Knex) {
    this.knex = db;
  }

  findByPuuid = async (puuid: string): Promise<Summoner | null> => {
    try {
      const record = await this.knex<SummonerTRecord, SummonerTResult[]>(
        'summoner'
      )
        .select('*')
        .where({ puuid })
        .first();

      if (!record) {
        return null;
      }
      return new Summoner(
        record.puuid,
        record.summonerName,
        record.tagLine,
        record.accountId,
        record.summonerId,
        record.summonerLevel,
        record.profileIconId,
        record.revisionDate,
        record.updatedAt
      );
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  findByNameAndTag = async (
    summonerName: string,
    tagLine: string
  ): Promise<Summoner | null> => {
    try {
      const record = await this.knex<SummonerTRecord, SummonerTResult>(
        'summoner'
      )
        .select('*')
        .where({ summonerName, tagLine })
        .first();

      if (!record) {
        return null;
      }
      return new Summoner(
        record.puuid,
        record.summonerName,
        record.tagLine,
        record.accountId,
        record.summonerId,
        record.summonerLevel,
        record.profileIconId,
        record.revisionDate,
        record.updatedAt
      );
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  delete = async (summoner: Summoner) => {
    const record = await this.knex<SummonerTRecord>('summoner')
      .where({ puuid: summoner.puuid })
      .del();
  };

  save = (summoner: Summoner): void => {
    const {
      puuid,
      summonerName,
      tagLine,
      accountId,
      summonerId,
      summonerLevel,
      profileIconId,
      revisionDate,
      updatedAt,
    } = summoner;
    try {
      this.knex<SummonerTRecord, SummonerTResult[]>('summoner')
        .insert({
          puuid,
          summonerName,
          tagLine,
          accountId,
          summonerId,
          summonerLevel,
          profileIconId,
          revisionDate,
          updatedAt,
        })
        .where({ puuid: summoner.puuid })
        .first();
    } catch (e) {
      console.log(e);
    }
  };

  update = async (summoner: Summoner) => {
    try {
      const {
        puuid,
        summonerName,
        summonerLevel,
        profileIconId,
        updatedAt,
        tagLine,
      } = summoner;
      await this.knex<SummonerTRecord>('summoner').where({ puuid }).update({
        summonerName,
        summonerLevel,
        profileIconId,
        updatedAt,
        tagLine,
      });
    } catch (e) {
      console.log(e);
    }
  };

  upsert = async (summoner: Summoner) => {
    try {
      const {
        puuid,
        summonerName,
        tagLine,
        accountId,
        summonerId,
        summonerLevel,
        profileIconId,
        revisionDate,
        updatedAt,
      } = summoner;
      await this.knex<SummonerTRecord, SummonerTRecord>('summoner')
        .insert({
          puuid,
          summonerName,
          tagLine,
          accountId,
          summonerId,
          summonerLevel,
          profileIconId,
          revisionDate,
          updatedAt,
        })
        .onConflict('puuid')
        .merge();
    } catch (e) {
      console.log(e);
    }
  };
}
