export class RiotSummoner {
  private _accountId: string;
  private _profileIconId: number;
  private _revisionDate: Date;
  private _summonerId: string;
  private _puuid: string;
  private _summonerLevel: number;

  constructor(
    accountId: string,
    profileIconId: number,
    revisionDate: Date,
    summonerId: string,
    puuid: string,
    summonerLevel: number
  ) {
    this._accountId = accountId;
    this._profileIconId = profileIconId;
    this._revisionDate = revisionDate;
    this._summonerId = summonerId;
    this._puuid = puuid;
    this._summonerLevel = summonerLevel;
  }

  get accountId() {
    return this._accountId;
  }
  get profileIconId() {
    return this._profileIconId;
  }
  get revisionDate() {
    return this._revisionDate;
  }
  get summonerId() {
    return this._summonerId;
  }
  get puuid() {
    return this._puuid;
  }
  get summonerLevel() {
    return this._summonerLevel;
  }
}
