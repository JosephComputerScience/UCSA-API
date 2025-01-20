import { RiotAccount } from '../../models/RiotAccount';

export interface IRiotAccountService {
  getAccountByPuuid(puuid: string): Promise<RiotAccount>;
  getAccountByNameTagLine(gameName: string, tagLine: string): Promise<RiotAccount>;
}
