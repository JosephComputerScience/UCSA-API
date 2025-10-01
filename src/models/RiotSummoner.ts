export class RiotSummoner {
  readonly profileIconId: number;
  readonly revisionDate: Date;
  readonly puuid: string;
  readonly summonerLevel: number;

  constructor(profileIconId: number, revisionDate: Date, puuid: string, summonerLevel: number) {
    this.profileIconId = profileIconId;
    this.revisionDate = revisionDate;
    this.puuid = puuid;
    this.summonerLevel = summonerLevel;
  }
}
