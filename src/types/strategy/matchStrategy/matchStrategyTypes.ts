import { MATCH_STRATEGIES } from '../../../constants/matchStrategies';
import { IMatchStrategy } from '../../../strategy/match/interface/IMatchStrategy';

export type MatchStrategyType = Record<MATCH_STRATEGIES, IMatchStrategy>;
