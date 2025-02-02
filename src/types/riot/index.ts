import type { RIOT_QUEUE_IDS, RIOT_PLATFORM_HOST, RIOT_PLATFORM, RIOT_REGIONAL_HOST, RIOT_REGIONAL } from "../../constants/riotConstants";

export type RIOT_REGIONAL_HOST_TYPE = (typeof RIOT_REGIONAL_HOST)[keyof typeof RIOT_REGIONAL_HOST];
/** Union of the riot queue game type values to be usable as param for string values */
export type RIOT_QUEUE_ID_TYPE = (typeof RIOT_QUEUE_IDS)[keyof typeof RIOT_QUEUE_IDS];

/** Riot queue json type */
export type RiotQueueType = {
  queueId: number;
  map: string;
  description: string;
  notes: string | null;
};

/**
 * Record for string to riot games
 * Current supported riot games id
 * ARAM
 * NORMAL_BLIND
 * NORMAL_DRAFT
 * RANKED_FLEX
 * RANKED_SOLO
 */
export type RiotQueue = Record<RIOT_QUEUE_ID_TYPE, RiotQueueType>;

/** Union of the riot platform host values to be useable as param for string values */
export type RIOT_PLATFORM_HOST_TYPE = (typeof RIOT_PLATFORM_HOST)[keyof typeof RIOT_PLATFORM_HOST];

/** Union of the riot platform values to be useable as param for string values */
export type RIOT_PLATFORM_TYPE = (typeof RIOT_PLATFORM)[keyof typeof RIOT_PLATFORM];

/** Union of the riot regional values to be useable as param for string values */
export type RIOT_REGIONAL_TYPE = (typeof RIOT_REGIONAL)[keyof typeof RIOT_REGIONAL];
