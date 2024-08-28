export class SummonerDTO {
  puuid: string;
  summonerName: string;
  tagLine: string;
  accountId: string;
  summonerId: string;
  summonerLevel: number;
  profileIconId: number;
  updatedAt: Date;
  constructor(
    puuid: string,
    summonerName: string,
    tagLine: string,
    accountId: string,
    summonerId: string,
    summonerLevel: number,
    profileIconId: number,
    updatedAt: Date
  ) {
    this.puuid = puuid;
    this.summonerName = summonerName;
    this.tagLine = tagLine;
    this.accountId = accountId;
    this.summonerId = summonerId;
    this.summonerLevel = summonerLevel;
    this.profileIconId = profileIconId;
    this.updatedAt = updatedAt;
  }
}
