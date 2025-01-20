import { RiotMatchDTO } from '../../dto/RiotMatchDTO';

export interface IRiotLeagueMatchService {
  getMatchIdsByPuuid: (puuid: string, queueId: number, count: number) => Promise<string[]>;
  getMatchesByMatchIds: (matchIds: string[]) => Promise<RiotMatchDTO[]>;
}
