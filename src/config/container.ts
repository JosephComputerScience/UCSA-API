import { LeagueOfLegendController } from "../controllers/leagueOfLegendController";
import { SummonerDAO } from "../dao/SummonerDAO";
import { SummonerRepository } from "../repository/SummonerRepository";
import { LeagueMatchService } from "../services/leagueMatchService";
import { LeagueOfLegendService } from "../services/leagueOfLegendService";
import { RiotService } from "../services/riotService";
import { autoBind } from "../utils/autoBind";
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
const leagueSummonerController = new LeagueOfLegendController(leagueOfLegendService);

// bind callbacks
autoBind(leagueSummonerController);

export { riotService, leagueMatchService, leagueOfLegendService, leagueSummonerController };
