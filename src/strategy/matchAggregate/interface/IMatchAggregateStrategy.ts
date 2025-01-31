export interface IMatchAggregateStrategy {
  aggregateMatches: <T>(gameType: string) => T | Promise<T>;
}
