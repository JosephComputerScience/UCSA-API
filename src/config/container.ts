import { SummonerController } from '../controllers/summonerController';
import { SummonerDAO } from '../dao/SummonerDAO';
import { SummonerRepository } from '../repository/SummonerRepository';
import { LeagueOfLegendService } from '../services/legacy.matchService';
import { RiotService } from '../services/riotService';
import { SummonerService } from '../services/summonerService';
import { db } from '../utils/db';

const knex = db();
// Dao initializations
const summonerDAO = new SummonerDAO(knex);

// Repository initializations
const summonerRepository = new SummonerRepository(summonerDAO);

// Service initializations
const riotService = new RiotService();
const summonerService = new SummonerService(summonerRepository, riotService);
const leagueOfLegendService = new LeagueOfLegendService(riotService);

// Controller initializations
const summonerController = new SummonerController(summonerService);

export { riotService, summonerService, summonerController };
