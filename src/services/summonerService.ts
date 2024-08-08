import { ISummonerRepository } from '../repository/interfaces/ISummonerRepository';
import { ISummonerService } from './interfaces/ISummonerService';

class UserService implements ISummonerService {
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
