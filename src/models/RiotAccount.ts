import { IRecord } from './interfaces/IRecord';

export class RiotAccount implements IRecord {
  private _gameName: string;
  private _puuid: string;
  private _tagLine: string;

  constructor(gameName: string, puuid: string, tagLine: string) {
    this._gameName = gameName;
    this._puuid = puuid;
    this._tagLine = tagLine;
  }

  get gameName() {
    return this._gameName;
  }
  get puuid() {
    return this._puuid;
  }
  get tagLine() {
    return this._tagLine;
  }
}
