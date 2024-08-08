import { IUserRepository } from '../repository/interfaces/IUserRepository';
import { IUserService } from './interfaces/IUserService';

class UserService implements IUserService {
  private _userRepository: IUserRepository;
  // TODO: add IAggregatorRepository
  constructor(userRepository: IUserRepository) {
    this._userRepository = userRepository;
  }

  getUser = (summonerName: string, tag: string) => {
    // TODO: retrieve the latest user aggregate numbers.
    return this._userRepository.findByNameAndTag(summonerName, tag);
  };
}
