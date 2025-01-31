export interface IMatchStrategy {
  getMatchesByUserId: <T>(id: string) => T | Promise<T>;
  updateMatchesByUserId: (id: string) => null;
}
