import { Client } from "pg";
import dotenv from "dotenv";
// this script for creating a databse for testing to make the tests then drop the database through the script in package.json
dotenv.config();

const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_TEST_DB } =
  process.env;

const createTestDB = async () => {
  const client = new Client({
    host: POSTGRES_HOST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: "postgres", 
  });

  try {
    await client.connect();
    const checkDB = await client.query(
      `SELECT 1 FROM pg_database WHERE datname='${POSTGRES_TEST_DB}'`,
    );

    if (checkDB.rowCount === 0) {
      await client.query(`CREATE DATABASE "${POSTGRES_TEST_DB}"`);
      console.log(`Database "${POSTGRES_TEST_DB}" created successfully.`);
    } else {
      console.log(`Database "${POSTGRES_TEST_DB}" already exists.`);
    }
  } catch (err: unknown) {
    console.log(err)
    process.exit(1);
  } finally {
    await client.end();
  }
};

createTestDB();
