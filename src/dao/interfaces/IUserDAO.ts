import { User } from '../../models/User';

export interface IUserDAO {
  findByPuuid: (puuid: string) => Promise<User | null>;
  findByNameAndTag: (
    summonerName: string,
    tagLine: string
  ) => Promise<User | null>;
  delete: (user: User) => Promise<void>;
  save: (user: User) => Promise<void>;
  update: (user: User) => Promise<void>;
}
