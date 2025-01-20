export class LeagueMatch {
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

  constructor(
    assists: number,
    bountyLevel: number,
    championId: number,
    crowdControlScore: number,
    damageDealtToBuildings: number,
    deaths: number,
    doubleKills: number,
    firstBlood: boolean,
    gameResult: string,
    goldEarned: number,
    kills: number,
    magicalDamage: number,
    matchId: string,
    pentaKills: number,
    physicalDamage: number,
    puuid: string,
    quadraKills: number,
    tripleKills: number,
    trueDamage: number
  ) {
    this.assists = assists;
    this.bountyLevel = bountyLevel;
    this.championId = championId;
    this.crowdControlScore = crowdControlScore;
    this.damageDealtToBuildings = damageDealtToBuildings;
    this.deaths = deaths;
    this.doubleKills = doubleKills;
    this.firstBlood = firstBlood;
    this.gameResult = gameResult;
    this.goldEarned = goldEarned;
    this.kills = kills;
    this.magicalDamage = magicalDamage;
    this.matchId = matchId;
    this.pentaKills = pentaKills;
    this.physicalDamage = physicalDamage;
    this.puuid = puuid;
    this.quadraKills = quadraKills;
    this.tripleKills = tripleKills;
    this.trueDamage = trueDamage;
  }
}
