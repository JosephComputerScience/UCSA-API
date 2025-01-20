import { RiotQueue } from '../../types';

/**
 * Riot queues are used to filter out matches from the Riot API.
 *
 * The total list of Riot queues - https://static.developer.riotgames.com/docs/lol/queues.json
 */
export const RIOT_QUEUES: RiotQueue = {
  ARAM: {
    queueId: 450,
    map: 'Howling Abyss',
    description: '5v5 ARAM games',
    notes: null,
  },
  NORMAL_BLIND: {
    queueId: 430,
    map: "Summoner's Rift",
    description: '5v5 Blind Pick games',
    notes: null,
  },
  NORMAL_DRAFT: {
    queueId: 400,
    map: "Summoner's Rift",
    description: '5v5 Draft Pick games',
    notes: null,
  },
  RANKED_FLEX: {
    queueId: 440,
    map: "Summoner's Rift",
    description: '5v5 Ranked Flex games',
    notes: null,
  },
  RANKED_SOLO: {
    queueId: 420,
    map: "Summoner's Rift",
    description: '5v5 Ranked Solo games',
    notes: null,
  },
};
