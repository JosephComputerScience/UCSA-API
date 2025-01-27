import { MATCH_STRATEGIES } from '../constants/matchStrategies';
import { MatchStrategy } from '../strategy/match/MatchStrategy';

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
  private _matchStrategy: MatchStrategy;

  constructor(matchStrategy: MatchStrategy) {
    this._matchStrategy = matchStrategy;
  }

  getMatches = (id: string, gameType: keyof typeof MATCH_STRATEGIES) => {
    const strategy = this._matchStrategy.getMatchStrategy(gameType);
    return strategy.getMatchesByUserId(id);
  };

  updateMatches = (id: string, gameType: keyof typeof MATCH_STRATEGIES) => {
    const strategy = this._matchStrategy.getMatchStrategy(gameType);
    strategy.updateMatchesByUserId(id);
  };
}
