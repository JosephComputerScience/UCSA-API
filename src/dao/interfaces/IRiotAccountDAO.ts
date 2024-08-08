import { RiotAccount } from '../../models/RiotAccount';

export interface IRiotAccountDAO {
  findByPuuid(puuid: string): Promise<RiotAccount>;
  findByNameTagLine(gameName: string, tagLine: string): Promise<RiotAccount>;
}
