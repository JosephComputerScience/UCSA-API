export class RiotSummoner {
  readonly accountId: string;
  readonly profileIconId: number;
  readonly revisionDate: Date;
  readonly summonerId: string;
  readonly puuid: string;
  readonly summonerLevel: number;

  constructor(
    accountId: string,
    profileIconId: number,
    revisionDate: Date,
    summonerId: string,
    puuid: string,
    summonerLevel: number
  ) {
    this.accountId = accountId;
    this.profileIconId = profileIconId;
    this.revisionDate = revisionDate;
    this.summonerId = summonerId;
    this.puuid = puuid;
    this.summonerLevel = summonerLevel;
  }
}
