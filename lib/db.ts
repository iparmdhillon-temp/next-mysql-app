const path = require('path');
const envPath = path.resolve(process.cwd(), '.env.local');

console.log({ envPath });

require('dotenv').config({ path: envPath });

import mysql from 'serverless-mysql';

export const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    port: parseInt(process.env.MYSQL_PORT),
    ssl: {
      ca: process.env.MYSQL_CRT.replace(/\\n/g, '\n'),
    },
  },
});

export async function query(
  q: string,
  values: (string | number)[] | string | number = []
) {
  try {
    const results = await db.query(q, values);
    await db.end();
    return results;
  } catch (e) {
    throw Error(e.message);
  }
}
