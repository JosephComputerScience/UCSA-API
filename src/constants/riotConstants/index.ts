export * from "./platformHost";
export * from "./regionalHost";
export * from "./riotQueues";
import { getRiotApiKey } from "../../utils/riot/getRiotApiKey";

/** Riot api key based on env */
export const RIOT_API_KEY = getRiotApiKey();
