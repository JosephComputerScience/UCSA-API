import { LeagueOfLegendController } from "@/controllers/leagueOfLegendController";
import { SummonerDAO } from "@/dao/SummonerDAO";
import { SummonerRepository } from "@/repository/SummonerRepository";
import { RiotRepository } from "@/repository/riot/riotRepository";
import { LeagueMatchService } from "@/services/leagueMatchService";
import { LeagueOfLegendService } from "@/services/leagueOfLegendService";
import { autoBind } from "@/utils/autoBind";
import { db } from "@/utils/db";

const knex = db();
// Dao initializations
const summonerDAO = new SummonerDAO(knex);

// Repository initializations
const summonerRepository = new SummonerRepository(summonerDAO);
const riotRepository = new RiotRepository();

// Service initializations
// todo remove this
const leagueMatchService = new LeagueMatchService();
const leagueOfLegendService = new LeagueOfLegendService(riotRepository, summonerRepository, leagueMatchService);

// Controller initializations
const leagueSummonerController = new LeagueOfLegendController(leagueOfLegendService);

// bind callbacks
autoBind(leagueSummonerController);

export { leagueMatchService, leagueOfLegendService, leagueSummonerController };
