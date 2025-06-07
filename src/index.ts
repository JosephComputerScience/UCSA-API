import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { type FastifyListenOptions, type HookHandlerDoneFunction, type RequestGenericInterface, fastify } from "fastify";
import type { ReplyGenericInterface } from "fastify/types/reply";
import { UserController } from "./controllers/userController";
import summonerRouter from "./routes/leagueOfLegends/summonerRoute";
import userRouter from "./routes/userRoute";
import { User } from "./schemas/userSchema";
import type { UCSAReply, UCSARequest, UCSARoute } from "./types";

interface IQuerystring {
  username: string;
  password: string;
}

interface IHeaders {
  "h-Custom": string;
}

interface IReply {
  200: { success: boolean };
  302: { url: string };
  "4xx": { error: string };
}

const server = fastify().withTypeProvider<TypeBoxTypeProvider>();

/**
 * example request
 */
server.get("/ping", async (request, reply) => {
  return "pong\n";
});

interface FastifyDemo extends UCSARoute {
  Querystring: IQuerystring;
  Headers: IHeaders;
  Reply: IReply;
}
interface FastifyDemoRequest extends RequestGenericInterface {
  Querystring: IQuerystring;
  Headers: IHeaders;
}
interface FastifyDemoReply extends ReplyGenericInterface {
  Reply: IReply;
}

/**
 * example of setting up a schema up for prevalidation
 */
// server.post(
//   "/",
//   {
//     schema: {
//       body: User,
//       response: {
//         200: User,
//       },
//     },
//   },
//   (req, reply) => {
//     const { name, mail } = req.body;
//     reply.status(200).send({ name, mail });
//   },
// );

/**
 * sample of request completely typed
 */
// server.get<FastifyDemo>(
//   "/auth",
//   {
//     preValidation: (req: UCSARequest<FastifyDemoRequest>, reply: UCSAReply<FastifyDemoReply>, done: HookHandlerDoneFunction) => {
//       const { username, password } = req.query;
//       done(username !== "admin" ? new Error("Must be admin") : undefined); // if an error is passed middleware throws
//     },
//   },
//   async (req: UCSARequest<FastifyDemoRequest>, reply: UCSAReply<FastifyDemoReply>) => {
//     const { username, password } = req.query;
//     const customHeader = req.headers["h-Custom"];
//     reply.code(302).send({ url: "holyshit" });
//     reply.code(200).send({ success: true });
//     reply.code(404).send({ error: "Not found" });
//   },
// );

// /** example of using a plugin to bundle routes with a prefix */
// server.register(userRouter, { prefix: '/users' });

/** DI EXAMPLE START */
// create a service
// old example start
// const userController = new UserController();
// server.register(userRouter(userController), { prefix: "/users" });
// old example end

// updated example start
server.register(summonerRouter);
// updated example end
/** DI EXAMPLE END */

/** starting the fastify server */
const listenOpts: FastifyListenOptions = { port: 8080 };
server.listen(listenOpts, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
