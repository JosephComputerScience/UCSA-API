export class Summoner {
  puuid: string;
  summonerName: string;
  tagLine: string;
  accountId: string;
  summonerId: string;
  summonerLevel: number;
  profileIconId: number;
  updatedAt: Date;
  lastManualUpdatedAt: Date;

  constructor(
    puuid: string,
    summonerName: string,
    tagLine: string,
    accountId: string,
    summonerId: string,
    summonerLevel: number,
    profileIconId: number,
    updatedAt: Date,
    lastManualUpdatedAt: Date = new Date(Date.now()),
  ) {
    this.puuid = puuid;
    this.summonerName = summonerName;
    this.tagLine = tagLine;
    this.accountId = accountId;
    this.summonerId = summonerId;
    this.summonerLevel = summonerLevel;
    this.profileIconId = profileIconId;
    this.updatedAt = updatedAt;
    this.lastManualUpdatedAt = lastManualUpdatedAt;
  }
}
