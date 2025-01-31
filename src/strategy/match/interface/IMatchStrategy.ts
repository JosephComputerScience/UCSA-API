export interface IMatchStrategy {
  getMatchesByUserId: <T = any>(id: string) => T | Promise<T>;
  updateMatchesByUserId: (id: string) => null;
}
