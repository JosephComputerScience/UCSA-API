// import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import {
  FastifyInstance,
  FastifyPluginOptions,
  HookHandlerDoneFunction,
} from 'fastify';
// import { getIndex } from '../controllers/userController';
import { UserController } from '../controllers/userController';
import { summonerController } from '../config/container';

// const userRoutes = (
//   fastify: FastifyInstance,
//   _: FastifyPluginOptions,
//   done: HookHandlerDoneFunction
// ) => {
//   fastify.get('/', getIndex);
//   done();
// };

/** DI example user routes */
/**
 * The router is actually just a Fastify plugin in which we use the instance passed
 * to register the routes with the matching summonerController calls
 * @param {FastifyInstance} instance 
 * @param {FastifyPluginOptions} _ 
 * @param {HookHandlerDoneFunction} done fastify handler to signal that this is the end of the plugin
 */
const summonerRouter = (
  instance: FastifyInstance,
  _: FastifyPluginOptions,
  done: HookHandlerDoneFunction
) => {
  instance.get('/:summonerName/:tagLine', summonerController.getSummonerByNameAndTag);
  instance.get('/:puuid', summonerController.getSummonerByPuuid)
  done();
};

export default summonerRouter;
