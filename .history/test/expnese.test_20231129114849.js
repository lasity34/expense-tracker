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
      //  reset table

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
      const category_id = 1; // Monthly
      const amount = 100.00;

      await service.addExpense(category_id, amount);
      const expenses = await service.getExpenses();
      const addedExpense = expenses[expenses.length - 1]; // Assuming this gets the last added expense
      assert.strictEqual(addedExpense.category_id, category_id, "Category ID should match");
      assert.strictEqual(addedExpense.amount, amount, "Amount should match");
      
  });
  
       // Test for adding a Weekly expense
    it('should add a Weekly expense', async () => {
      const category_id = 2; // Weekly
      const amount = 150;

      await service.addExpense(category_id, amount);

      const expenses = await service.getExpenses();
      const addedExpense = expenses.find(exp => exp.category_id === category_id && exp.amount === amount);
      assert(addedExpense, "Weekly expense should be added");
  });

  // Test for adding a Weekday expense
  it('should add a Weekday expense', async () => {
      const category_id = 3; // Weekday
      const amount = 50;

      await service.addExpense(category_id, amount);

      const expenses = await service.getExpenses();
      const addedExpense = expenses.find(exp => exp.category_id === category_id && exp.amount === amount);
      assert(addedExpense, "Weekday expense should be added");
  });

  // Test for adding a Weekend expense
  it('should add a Weekend expense', async () => {
      const category_id = 4; // Weekend
      const amount = 75;

      await service.addExpense(category_id, amount);

      const expenses = await service.getExpenses();
      const addedExpense = expenses.find(exp => exp.category_id === category_id && exp.amount === amount);
      assert(addedExpense, "Weekend expense should be added");
  });

  // Test for adding a Once-off expense
  it('should add a Once-off expense', async () => {
      const category_id = 5; // Once-off
      const amount = 200;

      await service.addExpense(category_id, amount);

      const expenses = await service.getExpenses();
      const addedExpense = expenses.find(exp => exp.category_id === category_id && exp.amount === amount);
      assert(addedExpense, "Once-off expense should be added");
  });

  // Test for adding a Daily expense
  it('should add a Daily expense', async () => {
    const category_id = 6; // Daily
    const amount = 15;

    await service.addExpense(category_id, amount);

   
    const expenses = await service.getExpenses();
    const addedExpense = expenses.find(exp => exp.category_id === category_id && exp.amount === amount);
    assert(addedExpense, "Expense should be added");
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
