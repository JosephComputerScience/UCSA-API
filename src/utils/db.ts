import knex, { Knex } from 'knex';

export const db = () => {
  const config: Knex.Config = {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST ?? 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      user: process.env.DB_USER ?? 'ucsa-db',
      password: process.env.DB_PW ?? '',
      database: process.env.DB_NAME ?? 'ucsa-db',
    },
  };

  return knex(config);
};
