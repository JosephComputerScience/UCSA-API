import type { ILeagueOfLegendMatchService } from "@/services/interfaces/ILeagueOfLegendMatchService";
import type { ILeagueOfLegendUserService } from "@/services/interfaces/ILeagueOfLegendUserService";
import type { ILolUserMatch } from "../interfaces/ILolUserMatch";

export class LolUserMatch implements ILolUserMatch {
  private _leagueOfLegendMatchService: ILeagueOfLegendMatchService;
  private _leagueOfLegendUserService: ILeagueOfLegendUserService;

  constructor(leagueOfLegendMatchService: ILeagueOfLegendMatchService, leagueOfLegendUserService: ILeagueOfLegendUserService) {
    this._leagueOfLegendMatchService = leagueOfLegendMatchService;
    this._leagueOfLegendUserService = leagueOfLegendUserService;
  }

  async getSummonerByPuuid(puuid: string) {
    const summoner = await this._leagueOfLegendUserService.getSummonerByPuuid(puuid);
    if (!summoner || summoner.isStale()) {
      return await this.updateSummonerAndMatchesByPuuid(puuid);
    }

    return summoner;
  }

  async getSummonerByNameAndTagLine(summonerName: string, tagLine: string) {
    const summoner = await this._leagueOfLegendUserService.getSummonerByNameAndTagLine(summonerName, tagLine);
    if (!summoner || summoner.isStale()) {
      return await this.updateSummonerAndMatchesByNameAndTagLine(summonerName, tagLine);
    }

    return summoner;
  }

  async updateSummonerAndMatchesByPuuid(puuid: string) {
    const summoner = await this._leagueOfLegendUserService.updateSummonerByPuuid(puuid);
    await this._leagueOfLegendMatchService.updateMatchesByPuuid(puuid);

    return summoner;
  }

  async updateSummonerAndMatchesByNameAndTagLine(summonerName: string, tagLine: string) {
    const summoner = await this._leagueOfLegendUserService.updateSummonerBySummonerNameAndTagLine(summonerName, tagLine);
    await this._leagueOfLegendMatchService.updateMatchesByPuuid(summoner.puuid);

    return summoner;
  }
}
