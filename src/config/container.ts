import { SummonerController } from "../controllers/summonerController";
import { SummonerDAO } from "../dao/SummonerDAO";
import { SummonerRepository } from "../repository/SummonerRepository";
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
const leagueOfLegendService = new LeagueOfLegendService(riotService, summonerRepository);

// Controller initializations

export { riotService, leagueOfLegendService };
