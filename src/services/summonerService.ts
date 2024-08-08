import { ISummonerRepository } from '../repository/interfaces/ISummonerRepository';
import { ISummonerService } from './interfaces/ISummonerService';

class SummonerService implements ISummonerService {
  private _summonerRepository: ISummonerRepository;
  // TODO: add IAggregatorRepository
  constructor(summonerRepository: ISummonerRepository) {
    this._summonerRepository = summonerRepository;
  }

  getUser = (summonerName: string, tag: string) => {
    // TODO: retrieve the latest user aggregate numbers.
    return this._summonerRepository.findByNameAndTag(summonerName, tag);
  };
}


// if (!summoner) {
//   const riotAccount = await this._riotAccountDAO.findByNameTagLine(
//     name,
//     tagLine
//   );
//   const riotSummoner = await this._riotSummonerDAO.findByPuuid(
//     riotAccount.puuid
//   );
//   const newSummoner = new Summoner(
//     riotSummoner.puuid,
//     name,
//     tagLine,
//     riotSummoner.accountId,
//     riotSummoner.summonerId,
//     riotSummoner.summonerLevel,
//     riotSummoner.profileIconId,
//     new Date(riotSummoner.revisionDate)
//   );

//   await this._summonerDAO.save(newSummoner);

//   return newSummoner;
// }

// return summoner;

// if (!summoner) {
//   const riotAccount = await this._riotAccountDAO.findByPuuid(puuid);
//   const riotSummoner = await this._riotSummonerDAO.findByPuuid(puuid);
//   const newSummoner = new Summoner(
//     riotSummoner.puuid,
//     riotAccount.gameName,
//     riotAccount.tagLine,
//     riotSummoner.accountId,
//     riotSummoner.summonerId,
//     riotSummoner.summonerLevel,
//     riotSummoner.profileIconId,
//     new Date(riotSummoner.revisionDate)
//   );

//   await this._summonerDAO.save(newSummoner);

//   return newSummoner;
// }

// return summoner;