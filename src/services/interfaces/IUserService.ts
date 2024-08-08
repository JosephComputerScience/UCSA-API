import { User } from '../../models/User';

export interface IUserService {
  getUser(summonerName: string, tag: string): Promise<User | null>;
}
