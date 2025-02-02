/** TODO: delete me Example of IQuerystring for fastify */
export interface IQuerystring {
  username: string;
  password: string;
}

/** TODO: delete me Example of IHeaders for fastify */
export interface IHeaders {
  "h-Custom": string;
}

/** TODO: delete me Example of IReply  */
export interface IReply {
  200: { success: boolean };
  302: { url: string };
  "4xx": { error: string };
}
