/**
 * The full schema for all RiotMatch DTOs can be found at
 * https://developer.riotgames.com/apis#match-v5/GET_getMatch
 */
export type RiotMatchDTO = {
  info: InfoDTO;
  metadata: MetadataDTO;
};

export type InfoDTO = {
  endOfGameResult: string;
  gameDuration: number; // game duration in ms
  gameId: number;
  gameMode: string;
  gameStartTimestamp: number;
  gameType: string;
  mapId: number;
  participants: ParticipantDTO[];
  queueId: number;
  teams: TeamDTO[];
  tournamentCode: string;
};

export type ParticipantDTO = {
  assists: number;
  baronKills: number;
  championId: number;
  championTransformed: number;
  consumablesPurchased: number;
  damageDealtToBuildings: number;
  damageDealtToObjectives: number;
  damageDealtToTurrets: number;
  damageSelfMitigated: number;
  deaths: number;
  detectorWardsPlaced: number;
  doubleKills: number;
  dragonKills: number;
  firstBloodKill: boolean;
  firstTowerKill: boolean;
  goldEarned: number;
  inhibitorKills: number;
  killingSprees: number;
  kills: number;
  lane: string;
  largestKillingSpree: number;
  largestMultiKill: number;
  magicDamageDealtToChampions: number;
  magicDamageTaken: number;
  neutralMinionsKilled: number;
  pentaKills: number;
  physicalDamageDealtToChampions: number;
  physicalDamageTaken: number;
  puuid: string;
  quadraKills: number;
  role: string;
  timeCCingOthers: number;
  totalDamageDealtToChampions: number;
  totalHealsOnTeammates: number;
  totalTimeSpentDead: number;
  tripleKills: number;
  trueDamageDealtToChampions: number;
  trueDamageTaken: number;
  turretKills: number;
  visionScore: number;
  wardsKilled: number;
  wardsPlaced: number;
  win: boolean;
};

export type TeamDTO = {
  bans: BanDTO;
  teamId: number;
  win: boolean;
};

export type BanDTO = {
  championId: number;
  pickTurn: number;
};

export type MetadataDTO = {
  matchId: string;
  participants: string[]; // list of puuids
};
