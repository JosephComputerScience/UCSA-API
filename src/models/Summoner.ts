import { hasTimeElapsed } from "@/utils/hasTimeElapsed";

export class Summoner {
  puuid: string;
  summonerName: string;
  tagLine: string;
  summonerLevel: number;
  profileIconId: number;
  matches = [];
  revisionDate: Date;
  updatedAt: Date;

  constructor(
    puuid: string,
    summonerName: string,
    tagLine: string,
    summonerLevel: number,
    profileIconId: number,
    revisionDate: Date,
    updatedAt: Date,
  ) {
    this.puuid = puuid;
    this.summonerName = summonerName;
    this.tagLine = tagLine;
    this.summonerLevel = summonerLevel;
    this.profileIconId = profileIconId;
    this.revisionDate = revisionDate;
    this.updatedAt = updatedAt;
  }

  isStale(): boolean {
    const threeMins = 180000; // 3 mins in ms
    return hasTimeElapsed(this.updatedAt.valueOf(), threeMins);
  }
}
