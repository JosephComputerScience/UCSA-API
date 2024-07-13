import {
  FastifyRequest,
  FastifyReply,
  RequestGenericInterface,
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  RouteGenericInterface,
} from 'fastify';
import { ReplyGenericInterface } from 'fastify/types/reply';

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
export type UCSARequest<
  T extends RequestGenericInterface = RequestGenericInterface
> = FastifyRequest<T>;

/** UCSA Generic HTTP(S) Fastify Reply type */
export type UCSAReply<T extends ReplyGenericInterface = ReplyGenericInterface> =
  FastifyReply<
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    T
  >;
