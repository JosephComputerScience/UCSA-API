// import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import type { FastifyInstance, FastifyPluginOptions, HookHandlerDoneFunction } from "fastify";
// import { getIndex } from '../controllers/userController';
import type { UserController } from "../controllers/userController";

// const userRoutes = (
//   fastify: FastifyInstance,
//   _: FastifyPluginOptions,
//   done: HookHandlerDoneFunction
// ) => {
//   fastify.get('/', getIndex);
//   done();
// };

/** DI example user routes */
const userRoutes =
  (userController: UserController) => (fastify: FastifyInstance, _: FastifyPluginOptions, done: HookHandlerDoneFunction) => {
    fastify.get("/", userController.getIndex);

    done();
  };

export default userRoutes;
