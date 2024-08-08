import { IUserRepository } from './interfaces/IUserRepository';
import { RiotAccountDAO } from '../dao/RiotAccountDAO';
import { RiotSummonerDAO } from '../dao/RiotSummonerDAO';
import { User } from '../models/User';
import { IRiotAccountDAO } from '../dao/interfaces/IRiotAccountDAO';
import { IRiotSummonerDAO } from '../dao/interfaces/IRiotSummonerDAO';
import { IUserDAO } from '../dao/interfaces/IUserDAO';

class UserRepository implements IUserRepository {
  private _riotAccountDAO: IRiotAccountDAO;
  private _riotSummonerDAO: IRiotSummonerDAO;
  private _userDAO: IUserDAO;

  constructor(
    riotAccountDAO: IRiotAccountDAO,
    riotSummonerDAO: IRiotSummonerDAO,
    userDAO: IUserDAO
  ) {
    this._riotAccountDAO = riotAccountDAO;
    this._riotSummonerDAO = riotSummonerDAO;
    this._userDAO = userDAO;
  }
  findByNameAndTag = async (name: string, tagLine: string) => {
    try {
      const user = await this._userDAO.findByNameAndTag(name, tagLine);
      if (!user) {
        const riotAccount = await this._riotAccountDAO.findByNameTagLine(
          name,
          tagLine
        );
        const riotSummoner = await this._riotSummonerDAO.findByPuuid(
          riotAccount.puuid
        );
        const newUser = new User(
          riotSummoner.puuid,
          name,
          tagLine,
          riotSummoner.accountId,
          riotSummoner.summonerId,
          riotSummoner.summonerLevel,
          riotSummoner.profileIconId,
          new Date(riotSummoner.revisionDate)
        );

        await this._userDAO.save(newUser);

        return newUser;
      }

      return user;
    } catch (e) {
      return null;
    }
  };

  findByPuuid = async (puuid: string) => {
    try {
      const user = await this._userDAO.findByPuuid(puuid);
      if (!user) {
        const riotAccount = await this._riotAccountDAO.findByPuuid(puuid);
        const riotSummoner = await this._riotSummonerDAO.findByPuuid(puuid);
        const newUser = new User(
          riotSummoner.puuid,
          riotAccount.gameName,
          riotAccount.tagLine,
          riotSummoner.accountId,
          riotSummoner.summonerId,
          riotSummoner.summonerLevel,
          riotSummoner.profileIconId,
          new Date(riotSummoner.revisionDate)
        );

        await this._userDAO.save(newUser);

        return newUser;
      }

      return user;
    } catch (e) {
      return null;
    }
  };
  save = async (user: User) => {
    await this._userDAO.save(user);
  };
  update = async (user: User) => {
    await this._userDAO.update(user);
  };
}
