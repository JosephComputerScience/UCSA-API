import { RIOT_QUEUE_ID_TYPES } from "@/constants";

export const getQueueName = (queueId: number) => {
  return RIOT_QUEUE_ID_TYPES[queueId];
};
