import type { RiotQueue } from "../../types/riot";
/**
 * Riot queues are used to filter out matches from the Riot API.
 *
 * The total list of Riot queues - https://static.developer.riotgames.com/docs/lol/queues.json
 */
export const RIOT_QUEUES: RiotQueue = {
  ARAM: {
    queueId: 450,
    map: "Howling Abyss",
    description: "5v5 ARAM games",
    notes: null,
  },
  NORMAL_BLIND: {
    queueId: 430,
    map: "Summoner's Rift",
    description: "5v5 Blind Pick games",
    notes: null,
  },
  NORMAL_DRAFT: {
    queueId: 400,
    map: "Summoner's Rift",
    description: "5v5 Draft Pick games",
    notes: null,
  },
  RANKED_FLEX: {
    queueId: 440,
    map: "Summoner's Rift",
    description: "5v5 Ranked Flex games",
    notes: null,
  },
  RANKED_SOLO: {
    queueId: 420,
    map: "Summoner's Rift",
    description: "5v5 Ranked Solo games",
    notes: null,
  },
} as const;

/** Riot queue ids */
export const RIOT_QUEUE_TYPES = {
  ARAM: "ARAM",
  NORMAL_BLIND: "NORMAL_BLIND",
  NORMAL_DRAFT: "NORMAL_DRAFT",
  RANKED_FLEX: "RANKED_FLEX",
  RANKED_SOLO: "RANKED_SOLO",
} as const;

export type RIOT_QUEUE_KEYS = keyof typeof RIOT_QUEUE_TYPES;
