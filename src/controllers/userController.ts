import { FastifyReply, FastifyRequest } from 'fastify';

export class UserController {
  constructor() {}

  getIndex = (req: FastifyRequest, reply: FastifyReply) => {
    return reply.send({ success: true });
  };
}
export const getIndex = (req: FastifyRequest, reply: FastifyReply) => {
  return reply.send({ success: true });
};
