import { LeagueOfLegendController } from "@/controllers/leagueOfLegendController/leagueOfLegendController";
import { LeagueMatchDAO } from "@/dao/LeagueMatchDAO";
import { SummonerDAO } from "@/dao/SummonerDAO";
import { LolUserMatch } from "@/orchestrator/lolUserMatch/LolUserMatch";
import { LeagueMatchRepository } from "@/repository/LeagueMatchRepository";
import { SummonerRepository } from "@/repository/SummonerRepository";
import { RiotRepository } from "@/repository/riot/riotRepository";
import { LeagueOfLegendMatchService } from "@/services/leagueOfLegendMatch/LeagueOfLegendMatchService";
import { LeagueOfLegendUserService } from "@/services/leagueOfLegendUser/LeagueOfLegendUserService";
import { MatchAggregateService } from "@/services/matchAggregateService/matchAggregateService";
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
const leagueofLegendMatchService = new LeagueOfLegendMatchService(leagueMatchRepository, riotRepository);
const leagueOfLegendUserService = new LeagueOfLegendUserService(riotRepository, summonerRepository);
const matchAggregateService = new MatchAggregateService();

// Orchestrator service
const lolUserMatchOrchestrator = new LolUserMatch(leagueofLegendMatchService, leagueOfLegendUserService);

// Controller initializations
const leagueSummonerController = new LeagueOfLegendController(lolUserMatchOrchestrator, leagueofLegendMatchService, matchAggregateService);

// bind callbacks
autoBind(leagueSummonerController);

export { leagueSummonerController };
