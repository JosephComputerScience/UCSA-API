export interface IMatchAggregateStrategy {
  aggregateMatches: <T = any>(gameType: string) => T | Promise<T>;
}
