import { User } from '../models/User';
import { db } from '../utils/db';
import { IUserDAO } from './interfaces/IUserDAO';
import { UserTRecord, UserTResult } from './recordInterfaces/userRecord';

export class UserDAO implements IUserDAO {
  knex = db();

  findByPuuid = async (puuid: string): Promise<User | null> => {
    try {
      const record = await this.knex<UserTRecord, UserTResult[]>('user')
        .select('*')
        .where({ puuid })
        .first();

      if (!record) {
        return null;
      }
      return new User(
        record.puuid,
        record.summonerName,
        record.tagLine,
        record.accountId,
        record.summonerId,
        record.summonerLevel,
        record.profileIconId,
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
  ): Promise<User | null> => {
    try {
      const record = await this.knex<UserTRecord, UserTResult[]>('user')
        .select('*')
        .where({ summonerName, tagLine })
        .first();

      if (!record) {
        return null;
      }
      return new User(
        record.puuid,
        record.summonerName,
        record.tagLine,
        record.accountId,
        record.summonerId,
        record.summonerLevel,
        record.profileIconId,
        record.updatedAt
      );
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  delete = async (user: User) => {
    const record = await this.knex<UserTRecord>('user')
      .where({ puuid: user.puuid })
      .del();
  };

  save = async (user: User) => {
    try {
      await this.knex<UserTRecord, UserTResult[]>('user')
        .select('user.puuid')
        .where({ puuid: user.puuid })
        .first();
    } catch (e) {
      console.log(e);
    }
  };

  update = async (user: User) => {
    try {
      const {
        puuid,
        summonerName,
        summonerLevel,
        profileIconId,
        updatedAt,
        tagLine,
      } = user;
      await this.knex<UserTRecord>('user').where({ puuid }).update({
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
}
