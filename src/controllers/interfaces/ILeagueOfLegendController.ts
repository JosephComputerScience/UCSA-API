import type { FastifyReply, FastifyRequest } from "fastify";

export interface ILeagueOfLegendController {
  getSummoner(req: FastifyRequest, reply: FastifyReply): Promise<undefined>;
}
