import { RIOT_QUEUE_IDS } from '../constants/queuesJson';

export type RiotQueueType = {
  queueId: number;
  map: string;
  description: string;
  notes: string | null;
};

export type RiotQueue = Record<RIOT_QUEUE_IDS, RiotQueueType>;
