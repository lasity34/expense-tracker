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

describe('Expense Service', function ()  {

    before(async function () {
      //  reset table
      this.timeout(5000)
        await db.none('TRUNCATE TABLE categories RESTART IDENTITY CASCADE');

        await db.none('INSERT INTO categories (id, name) VALUES ($1, $2), ($3, $4), ($5, $6), ($7, $8), ($9, $10), ($11, $12)',
        [1, 'Monthly', 2, 'Weekly', 3, 'Weekday', 4, 'Weekend', 5, 'Once-off', 6, 'Daily']);
});

    beforeEach(async function () {
        // Truncate tables and reset sequences before each test
        await db.none('TRUNCATE TABLE expenses RESTART IDENTITY CASCADE');
    });

    // Test for addExpense
    describe('Expense Service - Different Categories', function ()  {

   
    // Test for adding a Monthly expense
    it('should add a Monthly expense', async function () {
      const category_id = 1; // Monthly
      const amount = 100.00;
    
      await service.addExpense(category_id, amount);
      const expenses = await service.getExpenses();
    
      console.log(expenses); // Log the expenses for debugging
    
      // Assert the length of expenses to ensure an expense was added
      assert(expenses.length > 0, "An expense should have been added");
    
      // Find an expense that matches the criteria
      const addedExpense = expenses.find(exp => exp.category_id === category_id && exp.amount === Number(amount));
      
      assert(addedExpense, "Monthly expense should be added");
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
