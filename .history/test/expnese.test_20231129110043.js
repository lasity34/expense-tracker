import assert from "assert";
import expenseService from "../services/expenseService";// Make sure the path is correct
import pgPromise from "pg-promise";
import dotenv from "dotenv";


dotenv.config();

// Database connection
const connectionOptions = {
  connectionString: process.env.Shoe_catalog_URL_test,
  ssl: { rejectUnauthorized: false },
};
const pgp = pgPromise();
const db = pgp(connectionOptions);