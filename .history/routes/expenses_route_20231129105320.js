import express from 'express';

function expensesRouter(expenseService) {
    const router = express.Router();

    // Dashboard route
    router.get('/', (req, res) => {
        res.render('dashboard');
    });

    // Load add expense page
    router.get('/add-expense', (req, res) => {
        res.render('add-expense');
    });

    // Add expense
    router.post('/add-expense', async (req, res) => {
        const { category_id, amount } = req.body;
        try {
            await expenseService.addExpense(category_id, amount);
            res.redirect('/');
        } catch (error) {
            console.error('Error adding expense:', error);
            res.redirect('/');
        }
    });

    // View expenses
    router.get('/expenses', async (req, res) => {
        try {
            const expenses = await expenseService.getExpenses();
            res.render('expenses', { expenses });
        } catch (error) {
            console.error('Error retrieving expenses:', error);
            res.redirect('/');
        }
    });

    return router;
}

export default expensesRouter;
