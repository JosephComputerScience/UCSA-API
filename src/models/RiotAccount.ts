export class RiotAccount {
  readonly gameName: string;
  readonly puuid: string;
  readonly tagLine: string;

  constructor(gameName: string, puuid: string, tagLine: string) {
    this.gameName = gameName;
    this.puuid = puuid;
    this.tagLine = tagLine;
  }
}
