import { leagueSummonerController } from "@/config/container";
// import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import type { FastifyInstance, FastifyPluginOptions, HookHandlerDoneFunction } from "fastify";

// const userRoutes = (
//   fastify: FastifyInstance,
//   _: FastifyPluginOptions,
//   done: HookHandlerDoneFunction
// ) => {
//   fastify.get('/', getIndex);
//   done();
// };

/**
 * The router is actually just a Fastify plugin in which we use the instance passed
 * to register the routes with the matching summonerController calls
 * @param {FastifyInstance} instance
 * @param {FastifyPluginOptions} _
 * @param {HookHandlerDoneFunction} done fastify handler to signal that this is the end of the plugin
 */
const summonerRouter = async (instance: FastifyInstance, _: FastifyPluginOptions, done: HookHandlerDoneFunction) => {
  instance.get("/summoner", leagueSummonerController.getSummoner);
};

export default summonerRouter;
