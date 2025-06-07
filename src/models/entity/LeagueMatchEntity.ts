export type LeagueMatchStats = {
  assists: number;
  bountyLevel: number;
  championId: number;
  crowdControlScore: number;
  damageDealtToBuildings: number;
  deaths: number;
  doubleKills: number;
  firstBlood: boolean;
  gameResult: string;
  goldEarned: number;
  kills: number;
  magicalDamage: number;
  matchId: string;
  pentaKills: number;
  physicalDamage: number;
  puuid: string;
  quadraKills: number;
  tripleKills: number;
  trueDamage: number;
};

export type LeagueMatchEntity = {
  puuid: string;
  accountId: string;
  matchId: string;
  gameType: string;
  subGameType: string;
  win: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  matchStats: any; // todo test with knex to see if the value comes as string or actual json
};
