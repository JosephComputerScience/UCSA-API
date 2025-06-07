import type { FastifyReply, FastifyRequest } from "fastify";

export interface ILeagueSummonerController {
  getSummonerByNameAndTag(req: FastifyRequest, reply: FastifyReply): Promise<undefined>;
}
