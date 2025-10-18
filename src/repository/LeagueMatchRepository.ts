import type { ILeagueMatchDAO } from "@/dao/interfaces/ILeagueMatchDAO";
import type { LeagueMatchEntity } from "@/models/entity/LeagueMatchEntity";
import { LeagueMatch } from "@/models/riotMatches/LeagueMatch";
import type { ILeagueMatchRepository } from "./interfaces/ILeagueMatchRepository";

export class LeagueMatchRepository implements ILeagueMatchRepository {
  private _leagueMatchDAO: ILeagueMatchDAO;

  constructor(leagueMatchDAO: ILeagueMatchDAO) {
    this._leagueMatchDAO = leagueMatchDAO;
  }

  async deleteAllMatchesByPuuid(puuid: string) {
    await this._leagueMatchDAO.batchDeleteByPuuid(puuid);
  }

  async getAllMatchesByPuuid(puuid: string): Promise<LeagueMatch[]> {
    const records = await this._leagueMatchDAO.getMatchesByPuuid(puuid);

    return this.convertEntityToMatches(records);
  }

  async updateUserMatchesByPuuid(puuid: string, matches: LeagueMatch[]) {
    const entities = matches.map((match) => {
      const entity = match.toEntity();
      entity.updateUpdatedAt();
      return entity;
    });

    await this._leagueMatchDAO.updateUserMatchesByPuuid(puuid, entities);
  }

  convertEntityToMatches(entities: LeagueMatchEntity[]) {
    return entities.map((entity) => {
      const {
        assists,
        championId,
        crowdControlScore,
        damageDealtToBuildings,
        deaths,
        doubleKills,
        firstBlood,
        firstTowerKill,
        gameDuration,
        gameMode,
        gameStartTimestamp,
        gameType,
        goldEarned,
        kills,
        magicalDamage,
        magicalDamageTaken,
        matchId,
        pentaKills,
        physicalDamage,
        physicalDamageTaken,
        puuid,
        queueId,
        quadraKills,
        tripleKills,
        trueDamage,
        trueDamageTaken,
        win,
      } = entity;
      return new LeagueMatch(
        assists,
        championId,
        crowdControlScore,
        damageDealtToBuildings,
        deaths,
        doubleKills,
        firstBlood,
        firstTowerKill,
        gameDuration,
        gameMode,
        gameStartTimestamp,
        gameType,
        goldEarned,
        kills,
        magicalDamage,
        magicalDamageTaken,
        matchId,
        pentaKills,
        physicalDamage,
        physicalDamageTaken,
        puuid,
        queueId,
        quadraKills,
        tripleKills,
        trueDamage,
        trueDamageTaken,
        win,
      );
    });
  }
}
