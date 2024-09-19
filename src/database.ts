import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();
const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  ENV,
} = process.env;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let client: any;
console.log(ENV);

if (ENV === "dev") {
  client = new Pool({
    // here the pool is the postgre Database Connection tool
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

if (ENV === "test") {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB, // here we going to use another database (a copy) for testing it
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

export default client;

// # psql -h 127.0.0.1 -U saleh postgres
