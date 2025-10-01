import { RIOT_QUEUES, RIOT_QUEUE_TYPES } from "@/constants";
import type { ParticipantDTO, RiotMatchDTO } from "@/dto/RiotMatchDTO";
import { LeagueMatch } from "@/models/riotMatches/LeagueMatch";
import type { ILeagueMatchRepository } from "@/repository/interfaces/ILeagueMatchRepository";
import type { IRiotRepository } from "@/repository/riot/interfaces/IRiotRepository";
import type { ILeagueOfLegendMatchService } from "./interfaces/ILeagueOfLegendMatchService";

export class LeagueOfLegendMatchService implements ILeagueOfLegendMatchService {
  private _leagueMatchRepository: ILeagueMatchRepository;
  private _riotRepository: IRiotRepository;

  constructor(leagueMatchRepository: ILeagueMatchRepository, riotRepository: IRiotRepository) {
    this._leagueMatchRepository = leagueMatchRepository;
    this._riotRepository = riotRepository;
  }
  async getMatchesByPuuid(puuid: string) {
    return await this._leagueMatchRepository.getAllMatchesByPuuid(puuid);
  }

  async deleteMatchesByPuuid(puuid: string) {
    await this._leagueMatchRepository.deleteAllMatchesByPuuid(puuid);
  }

  async updateMatchesByPuuid(puuid: string): Promise<void> {
    const riotMatchIdPromises = Object.keys(RIOT_QUEUE_TYPES).map((queueType) =>
      this._riotRepository.getMatchIdsByPuuid(puuid, RIOT_QUEUES[queueType].queueId, 100),
    );

    const riotMatchGameIds = await Promise.all(riotMatchIdPromises);
    const riotMatchIds = riotMatchGameIds.flat();
    console.log(`puuid: ${puuid}`, `number of match ids received ${riotMatchIds.length}`);

    const riotMatchDTOs = await this._riotRepository.getMatchesByMatchIds(riotMatchIds);
    console.log(`puuid: ${puuid}`, `number of matches received ${riotMatchDTOs.length}`);

    const leagueMatches = this.riotMatchDtoToLeagueMatch(riotMatchDTOs, puuid);
    await this._leagueMatchRepository.updateUserMatchesByPuuid(puuid, leagueMatches);
  }

  riotMatchDtoToLeagueMatch(riotMatchDtos: RiotMatchDTO[], puuid: string): LeagueMatch[] {
    const riotMatches = riotMatchDtos.map((riotMatchDto) => {
      const { info, metadata } = riotMatchDto;
      const participant = info.participants.find((p) => p.puuid === puuid);
      const {
        assists,
        championId,
        damageDealtToBuildings,
        deaths,
        doubleKills,
        firstBloodKill,
        firstTowerKill,
        goldEarned,
        kills,
        magicDamageDealtToChampions,
        magicDamageTaken,
        pentaKills,
        physicalDamageDealtToChampions,
        physicalDamageTaken,
        quadraKills,
        timeCCingOthers,
        tripleKills,
        trueDamageDealtToChampions,
        trueDamageTaken,
        win,
      } = participant as ParticipantDTO;

      const { gameDuration, gameMode, gameStartTimestamp, gameType } = info;

      const { matchId } = metadata;
      return new LeagueMatch(
        assists,
        championId,
        timeCCingOthers,
        damageDealtToBuildings,
        deaths,
        doubleKills,
        firstBloodKill,
        firstTowerKill,
        gameDuration,
        gameMode,
        new Date(gameStartTimestamp),
        gameType,
        goldEarned,
        kills,
        magicDamageDealtToChampions,
        magicDamageTaken,
        matchId,
        pentaKills,
        physicalDamageDealtToChampions,
        physicalDamageTaken,
        puuid,
        quadraKills,
        tripleKills,
        trueDamageDealtToChampions,
        trueDamageTaken,
        win,
      );
    });
    return riotMatches;
  }
}
