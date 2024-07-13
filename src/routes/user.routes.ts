// import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import {
  FastifyInstance,
  FastifyPluginOptions,
  HookHandlerDoneFunction,
} from 'fastify';
import { getIndex } from '../controllers/user.controller';

const userRoutes = (
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  done: HookHandlerDoneFunction
) => {
  fastify.get('/', getIndex);
  done();
};

export default userRoutes;
