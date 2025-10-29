import type { Knex } from "knex";

export const dbConf: Knex.Config  = {
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST || "sh-cynosdbmysql-grp-jrm87l8a.sql.tencentcdb.com",
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 24397,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "CcQjBv7z",
    database: process.env.DB_NAME || "coin_market_dev",
    timezone: 'UTC'
  }
};