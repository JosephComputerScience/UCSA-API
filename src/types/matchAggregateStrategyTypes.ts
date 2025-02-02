import type { MATCH_AGGREGATE_STRATEGIES } from "../constants/matchAggregateStrategy";

/** Union of match aggregate values to be used as param for string values */
export type MATCH_AGGREGATE_STRATEGY_TYPE = (typeof MATCH_AGGREGATE_STRATEGIES)[keyof typeof MATCH_AGGREGATE_STRATEGIES];
