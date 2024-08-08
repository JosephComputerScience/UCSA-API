import { User } from '../../models/User';

export interface IUserRepository {
  findByNameAndTag(name: string, tag: string): Promise<User | null>;
  findByPuuid(puuid: string): Promise<User | null>;
  save(user: User): void;
  update(user: User): void;
}
