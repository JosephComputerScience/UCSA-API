import { LeagueSummonerController } from "../controllers/leagueSummonerController";
import { SummonerDAO } from "../dao/SummonerDAO";
import { SummonerRepository } from "../repository/SummonerRepository";
import { LeagueMatchService } from "../services/leagueMatchService";
import { LeagueOfLegendService } from "../services/leagueOfLegendService";
import { RiotService } from "../services/riotService";
import { db } from "../utils/db";

const knex = db();
// Dao initializations
const summonerDAO = new SummonerDAO(knex);

// Repository initializations
const summonerRepository = new SummonerRepository(summonerDAO);

// Service initializations
const riotService = new RiotService();
// todo remove this
const leagueMatchService = new LeagueMatchService();
const leagueOfLegendService = new LeagueOfLegendService(riotService, summonerRepository, leagueMatchService);

// Controller initializations
const leagueSummonerController = new LeagueSummonerController(leagueOfLegendService);

export { riotService, leagueMatchService, leagueOfLegendService, leagueSummonerController };
