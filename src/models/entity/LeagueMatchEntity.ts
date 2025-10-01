export class LeagueMatchEntity {
  constructor(
    public assists: number,
    public championId: number,
    public crowdControlScore: number,
    public damageDealtToBuildings: number,
    public deaths: number,
    public doubleKills: number,
    public firstBlood: boolean,
    public firstTowerKill: boolean,
    public gameDuration: number,
    public gameMode: string,
    public gameStartTimestamp: Date,
    public gameType: string,
    public goldEarned: number,
    public kills: number,
    public magicalDamage: number,
    public magicalDamageTaken: number,
    public matchId: string,
    public pentaKills: number,
    public physicalDamage: number,
    public physicalDamageTaken: number,
    public puuid: string,
    public quadraKills: number,
    public tripleKills: number,
    public trueDamage: number,
    public trueDamageTaken: number,
    public win: boolean,
    public updatedAt: Date = new Date(),
  ) {}
  updateUpdatedAt() {
    this.updatedAt = new Date();
  }
}
