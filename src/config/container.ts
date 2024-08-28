import { SummonerController } from '../controllers/summonerController';
import { SummonerDAO } from '../dao/SummonerDAO';
import { SummonerRepository } from '../repository/SummonerRepository';
import { RiotAccountService } from '../services/riotAccountService';
import { RiotSummonerService } from '../services/riotSummonerService';
import { SummonerService } from '../services/summonerService';
import { db } from '../utils/db';

const knex = db();
// Dao initializations
const summonerDAO = new SummonerDAO(knex);
// Repository initializations
const summonerRepository = new SummonerRepository(summonerDAO);
// Service initializations
const riotAccountService = new RiotAccountService();
const riotSummonerService = new RiotSummonerService();
const summonerService = new SummonerService(
  summonerRepository,
  riotAccountService,
  riotSummonerService
);

const summonerController = new SummonerController(summonerService);

export {
  summonerService,
  riotAccountService,
  riotSummonerService,
  summonerController,
};
