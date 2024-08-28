import { BaseModel } from './BaseModel';

export class Summoner extends BaseModel<Summoner> {
  private _puuid: string;
  private _summonerName: string;
  private _tagLine: string;
  private _accountId: string;
  private _summonerId: string;
  private _summonerLevel: number;
  private _profileIconId: number;
  private _revisionDate: Date;
  private _updatedAt: Date;

  constructor(
    puuid: string,
    summonerName: string,
    tagLine: string,
    accountId: string,
    summonerId: string,
    summonerLevel: number,
    profileIconId: number,
    revisionDate: Date,
    updatedAt: Date
  ) {
    super();
    this._puuid = puuid;
    this._summonerName = summonerName;
    this._tagLine = tagLine;
    this._accountId = accountId;
    this._summonerId = summonerId;
    this._summonerLevel = summonerLevel;
    this._profileIconId = profileIconId;
    this._revisionDate = revisionDate;
    this._updatedAt = updatedAt;
  }

  get summonerName(): string {
    return this._summonerName;
  }

  get tagLine(): string {
    return this._tagLine;
  }

  get accountId(): string {
    return this._accountId;
  }

  get puuid(): string {
    return this._puuid;
  }

  get summonerId(): string {
    return this._summonerId;
  }

  get summonerLevel(): number {
    return this._summonerLevel;
  }

  get profileIconId(): number {
    return this._profileIconId;
  }

  get revisionDate(): Date {
    return this._revisionDate;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  update = (summoner: Summoner) => {
    const {
      puuid,
      summonerName,
      tagLine,
      accountId,
      summonerId,
      summonerLevel,
      profileIconId,
      revisionDate,
    } = summoner;
    this._puuid = puuid;
    this._summonerName = summonerName;
    this._tagLine = tagLine;
    this._accountId = accountId;
    this._summonerId = summonerId;
    this._summonerLevel = summonerLevel;
    this._profileIconId = profileIconId;
    this._revisionDate = revisionDate;
    this._updatedAt = new Date();
  };
}
