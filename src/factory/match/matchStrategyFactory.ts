import { MATCH_STRATEGIES } from "../../constants/matchStrategies";
import type { IMatchStrategy } from "../../strategy/match/interface/IMatchStrategy";

/**
 * Uses the strategy factory pattern to return the correct game service
 * based off predefined strategey type from enum MATCH_STRATEGIES
 */
export class MatchStrategyFactory {
  /** TODO: come back and add the strategies once created. */
  getMatchStrategy = (type: keyof typeof MATCH_STRATEGIES) => {
    switch (type) {
      case MATCH_STRATEGIES.LEAGUE_OF_LEGENDS:
        return null as unknown as IMatchStrategy;
      case MATCH_STRATEGIES.MARVEL_RIVALS:
        return null as unknown as IMatchStrategy;
      default:
        throw new Error(`Strategy Type: ${type} not supported`);
    }
  };
}
