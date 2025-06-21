import type { MATCH_AGGREGATE_STRATEGIES } from "@/constants/matchAggregateStrategy";
import type { MatchAggregateFactory } from "@/factory/matchAggregate/matchAggregateFactory";

/**
 * Gets the data in the database for the game type and aggregate the
 * stats that is relevant to the game
 *
 * Retrieves the users match history in the database.
 *
 * Uses the strategy pattern to encapsulate behavior to be able
 * to aggregate the stats from the game based on it's own relevant
 * stats
 *
 */
export class MatchAggregateService {
  private _matchStrategyFactory: MatchAggregateFactory;

  constructor(matchStrategyFactory: MatchAggregateFactory) {
    this._matchStrategyFactory = matchStrategyFactory;
  }

  getMatches = async (id: string, gameType: keyof typeof MATCH_AGGREGATE_STRATEGIES) => {
    const strategy = this._matchStrategyFactory.getMatchAggregateStrategy(gameType);
    const results = await strategy.aggregateMatches(gameType);
    return results;
  };
}
