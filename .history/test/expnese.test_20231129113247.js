import assert from "assert";
import expenseService from "../services/expenseService.js"; // Adjust the path as needed
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

    before(async () => {
        // Insert necessary data before any tests run

        await db.none('TRUNCATE TABLE categories RESTART IDENTITY CASCADE');

        await db.none('INSERT INTO categories (id, name) VALUES ($1, $2), ($3, $4), ($5, $6), ($7, $8), ($9, $10), ($11, $12)',
        [1, 'Monthly', 2, 'Weekly', 3, 'Weekday', 4, 'Weekend', 5, 'Once-off', 6, 'Daily']);
});

    beforeEach(async () => {
        // Truncate tables and reset sequences before each test
        await db.none('TRUNCATE TABLE expenses RESTART IDENTITY CASCADE');
    });

    // Test for addExpense
    describe('Expense Service - Different Categories', () => {

      // Test for adding a Monthly expense
      it('should add a Monthly expense', async () => {
          const category_id = 1; // ID for Monthly
          const amount = 200;
  
          await service.addExpense(category_id, amount);
          // Add assertions as needed, such as checking if the expense was added correctly
      });
  
      // Test for adding a Weekly expense
      it('should add a Weekly expense', async () => {
          const category_id = 2; // ID for Weekly
          const amount = 150;
  
          await service.addExpense(category_id, amount);
          // Add assertions as needed
      });
  
      // Repeat for other categories...
  
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
