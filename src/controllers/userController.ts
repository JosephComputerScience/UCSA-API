import type { FastifyReply, FastifyRequest } from "fastify";

export class UserController {
  getIndex = (req: FastifyRequest, reply: FastifyReply) => {
    return reply.send({ success: true });
  };
}
export const getIndex = (req: FastifyRequest, reply: FastifyReply) => {
  return reply.send({ success: true });
};
