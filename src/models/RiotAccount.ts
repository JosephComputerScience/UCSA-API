import { IRecord } from './interfaces/IRecord';

export class RiotAccount implements IRecord {
  readonly gameName: string;
  readonly puuid: string;
  readonly tagLine: string;

  constructor(gameName: string, puuid: string, tagLine: string) {
    this.gameName = gameName;
    this.puuid = puuid;
    this.tagLine = tagLine;
  }
}
