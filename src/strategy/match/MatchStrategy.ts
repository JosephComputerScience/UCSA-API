import { MatchStrategyType } from '../../types/strategy/matchStrategy/matchStrategyTypes';
import { IMatchStrategy } from './interface/IMatchStrategy';
import { MATCH_STRATEGIES } from '../../constants/matchStrategies';

/**
 * Uses the strategy pattern to return the correct game service
 * based off predefined strategey type from enum MATCH_STRATEGIES
 */
export class MatchStrategy {
  private _matchTypetoService: MatchStrategyType;

  constructor(leagueOfLegendService: IMatchStrategy, marvelRivalService: IMatchStrategy) {
    this._matchTypetoService = {
      [MATCH_STRATEGIES.LEAGUE_OF_LEGENDS]: leagueOfLegendService,
      [MATCH_STRATEGIES.MARVEL_RIVALS]: marvelRivalService,
    };
  }
  getMatchStrategy = (type: keyof typeof MATCH_STRATEGIES) => {
    return this._matchTypetoService[type];
  };
}
