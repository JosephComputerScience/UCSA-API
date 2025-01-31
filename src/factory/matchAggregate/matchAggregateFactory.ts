import { IMatchAggregateStrategy } from '../../strategy/matchAggregate/interface/IMatchAggregateStrategy';
import { MATCH_STRATEGIES } from '../../constants/matchStrategies';

/**
 * Uses the strategy factory pattern to return the correct match aggregate
 * service based off predefined strategey type from enum MATCH_STRATEGIES
 */
export class MatchAggregateFactory {
  /** TODO: come back and add the strategies once created. */
  getMatchAggregateStrategy = (type: keyof typeof MATCH_STRATEGIES) => {
    switch (type) {
      case MATCH_STRATEGIES.LEAGUE_OF_LEGENDS:
        return null as unknown as IMatchAggregateStrategy;
      case MATCH_STRATEGIES.MARVEL_RIVALS:
        return null as unknown as IMatchAggregateStrategy;
      default:
        throw new Error(`Strategy Type: ${type} not supported`);
    }
  };
}
