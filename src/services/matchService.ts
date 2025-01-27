import { MATCH_STRATEGIES } from '../constants/matchStrategies';
import { MatchStrategyFactory } from '../factory/match/matchStrategyFactory';

/**
 * Updates the users latest match history from the respective
 * game api to the database.
 *
 * Retrieves the users match history in the database.
 *
 * Uses the strategy pattern to encapsulate behavior to be able
 * to pull matches from the database or update the database from
 * each games respective third party api.
 *
 */
export class MatchService {
  private _matchStrategyFactory: MatchStrategyFactory;

  constructor(matchStrategyFactory: MatchStrategyFactory) {
    this._matchStrategyFactory = matchStrategyFactory;
  }

  getMatches = (id: string, gameType: keyof typeof MATCH_STRATEGIES) => {
    const strategy = this._matchStrategyFactory.getMatchStrategy(gameType);
    return strategy.getMatchesByUserId(id);
  };

  updateMatches = (id: string, gameType: keyof typeof MATCH_STRATEGIES) => {
    const strategy = this._matchStrategyFactory.getMatchStrategy(gameType);
    strategy.updateMatchesByUserId(id);
  };
}
