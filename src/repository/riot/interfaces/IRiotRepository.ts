import type { IRiotAccount } from "./IRiotAccount";
import type { IRiotLeagueMatch } from "./IRiotLeagueMatch";
import type { IRiotSummoner } from "./IRiotSummoner";

export interface IRiotRepository extends IRiotAccount, IRiotLeagueMatch, IRiotSummoner {}
