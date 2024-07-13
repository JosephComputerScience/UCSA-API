import { fastify, FastifyReply, FastifyRequest } from 'fastify';

export const getIndex = (req: FastifyRequest, reply: FastifyReply) => {
  return reply.send({ success: true });
};
