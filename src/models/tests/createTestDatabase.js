"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
// this script for creating a databse for testing to make the tests then drop the database through the script in package.json
dotenv_1.default.config();
const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_TEST_DB } = process.env;
const createTestDB = async () => {
    const client = new pg_1.Client({
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: "postgres",
    });
    try {
        await client.connect();
        const checkDB = await client.query(`SELECT 1 FROM pg_database WHERE datname='${POSTGRES_TEST_DB}'`);
        if (checkDB.rowCount === 0) {
            await client.query(`CREATE DATABASE "${POSTGRES_TEST_DB}"`);
            console.log(`Database "${POSTGRES_TEST_DB}" created successfully.`);
        }
        else {
            console.log(`Database "${POSTGRES_TEST_DB}" already exists.`);
        }
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
    finally {
        await client.end();
    }
};
createTestDB();
