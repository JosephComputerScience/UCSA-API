import type { ILeagueMatchRepository } from "@/repository/interfaces/ILeagueMatchRepository";
import type { ILeagueMatchService } from "./interfaces/ILeagueMatchService";

export class LeagueMatchService implements ILeagueMatchService {
  _leagueMatchRepository: ILeagueMatchRepository;

  constructor(leagueMatchRepository: ILeagueMatchRepository) {
    this._leagueMatchRepository = leagueMatchRepository;
  }
  async getMatchesByPuuid(puuid: string) {
    return await this._leagueMatchRepository.getAllMatchesByPuuid(puuid);
  }

  async deleteMatchesByPuuid(puuid: string) {
    await this._leagueMatchRepository.deleteAllMatchesByPuuid(puuid);
  }
}
