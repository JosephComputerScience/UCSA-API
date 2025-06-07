import type {
  ContextConfigDefault,
  FastifyReply,
  FastifyRequest,
  FastifySchema,
  FastifyTypeProviderDefault,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RequestGenericInterface,
  RouteGenericInterface,
} from "fastify";
import type { ReplyGenericInterface } from "fastify/types/reply";

/**
 * Generic HTTP(S) Overrides
 * Overridable options
 * Body
 * Querystring
 * Params
 * Headers
 */
export interface UCSARoute extends RouteGenericInterface {}

/** UCSA Generic HTTP(S) Fastify Request type*/
export type UCSARequest<T extends RouteGenericInterface = RouteGenericInterface> = FastifyRequest<T>;

/** UCSA Generic HTTP(S) Fastify Reply type */
export type UCSAReply<T extends RouteGenericInterface = RouteGenericInterface> = FastifyReply<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  T
>;
