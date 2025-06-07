export interface ILeagueMatchService {
  getMatchesByUserId<T>(id: string, count: number): T[];
}
