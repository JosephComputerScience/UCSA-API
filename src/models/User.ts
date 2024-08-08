import { v4 as uuid } from 'uuid';
import { IEditable } from './interfaces/IEditable';

export class User implements IEditable {
  private _puuid: string;
  private _summonerName: string;
  private _tagLine: string;
  private _accountId: string;
  private _summonerId: string;
  private _summonerLevel: number;
  private _profileIconId: number;
  private _updatedAt: Date;

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
    this._puuid = puuid;
    this._summonerName = summonerName;
    this._tagLine = tagLine;
    this._accountId = accountId;
    this._summonerId = summonerId;
    this._summonerLevel = summonerLevel;
    this._profileIconId = profileIconId;
    this._updatedAt = updatedAt;
  }

  get summonerName(): string {
    return this._summonerName;
  }

  set summonerName(summonerName: string) {
    this._summonerName = summonerName;
  }

  get tagLine(): string {
    return this._tagLine;
  }

  set tagLine(tagLine: string) {
    this._tagLine = tagLine;
  }

  get accountId(): string {
    return this._accountId;
  }

  set accountId(accountId: string) {
    this._accountId = accountId;
  }

  get puuid(): string {
    return this._puuid;
  }

  get summonerId(): string {
    return this._summonerId;
  }

  set summonerId(summonerId: string) {
    this._summonerId = summonerId;
  }

  get summonerLevel(): number {
    return this._summonerLevel;
  }

  set summonerLevel(summonerLevel: number) {
    this._summonerLevel = summonerLevel;
  }

  get profileIconId(): number {
    return this._profileIconId;
  }

  set profileIconId(profileIconId: number) {
    this._profileIconId = profileIconId;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  update = (updatedAt: Date = new Date()) => {
    this._updatedAt = updatedAt;
  };
}
