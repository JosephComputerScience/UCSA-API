import { MATCH_AGGREGATE_STRATEGIES } from "../../constants/matchAggregateStrategy";
import type { IMatchAggregateStrategy } from "../../strategy/matchAggregate/interface/IMatchAggregateStrategy";

/**
 * Uses the strategy factory pattern to return the correct match aggregate
 * service based off predefined strategey type from enum MATCH_AGGREGATE_STRATEGIES
 */
export class MatchAggregateFactory {
  /** TODO: come back and add the strategies once created. */
  getMatchAggregateStrategy = (type: keyof typeof MATCH_AGGREGATE_STRATEGIES) => {
    switch (type) {
      case MATCH_AGGREGATE_STRATEGIES.LEAGUE_OF_LEGENDS:
        return null as unknown as IMatchAggregateStrategy;
      case MATCH_AGGREGATE_STRATEGIES.MARVEL_RIVALS:
        return null as unknown as IMatchAggregateStrategy;
      default:
        throw new Error(`Strategy Type: ${type} not supported`);
    }
  };
}
