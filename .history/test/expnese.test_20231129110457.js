import assert from "assert";
import expenseService from "../services/expenseService"; // Adjust the path as needed
import pgPromise from "pg-promise";
import dotenv from "dotenv";

dotenv.config();

// Setup database connection for testing
const pgp = pgPromise();
const db = pgp({
    connectionString: process.env.expense_tracker_URL_test,
    ssl: { rejectUnauthorized: false },
});

const service = expenseService(db);

describe('Expense Service', () => {

    // Test for addExpense
    describe('addExpense', () => {
        it('should add an expense', async () => {
            // Example test - adjust based on your implementation
            const category_id = 1; // Example category id
            const amount = 100; // Example amount

            await service.addExpense(category_id, amount);
            // Since addExpense may not return a value, you might want to fetch the added expense
            // and assert that it has been added correctly.
        });
    });

    // Test for getExpenses
    describe('getExpenses', () => {
        it('should retrieve expenses', async () => {
            const expenses = await service.getExpenses();
            assert(Array.isArray(expenses), "Expected to receive an array of expenses");
        });
    });

    // Add more tests as needed for other service functions

});