import { LeagueOfLegendController } from "@/controllers/leagueOfLegendController";
import { LeagueMatchDAO } from "@/dao/LeagueMatchDAO";
import { SummonerDAO } from "@/dao/SummonerDAO";
import { LeagueMatchRepository } from "@/repository/LeagueMatchRepository";
import { SummonerRepository } from "@/repository/SummonerRepository";
import { RiotRepository } from "@/repository/riot/riotRepository";
import { LeagueMatchService } from "@/services/leagueMatchService";
import { LeagueOfLegendService } from "@/services/leagueOfLegendService";
import { autoBind } from "@/utils/autoBind";
import { db } from "@/utils/db";

const knex = db();
// Dao initializations
const summonerDAO = new SummonerDAO(knex);
const leagueMatchDAO = new LeagueMatchDAO(knex);

// Repository initializations
const summonerRepository = new SummonerRepository(summonerDAO);
const riotRepository = new RiotRepository();
const leagueMatchRepository = new LeagueMatchRepository(leagueMatchDAO);

// Service initializations
// todo remove this
const leagueMatchService = new LeagueMatchService(leagueMatchRepository);
const leagueOfLegendService = new LeagueOfLegendService(riotRepository, summonerRepository, leagueMatchService);

// Controller initializations
const leagueSummonerController = new LeagueOfLegendController(leagueOfLegendService);

// bind callbacks
autoBind(leagueSummonerController);

export { leagueMatchService, leagueOfLegendService, leagueSummonerController };
