import express from 'express';

function expensesRouter(expenseService) {
    const router = express.Router();

    // Dashboard route
    router.get('/', (req, res) => {
        res.render('dashboard');
    });



    // Add expense
    router.post('/add-expense', async (req, res) => {
        const { category_id, amount, description } = req.body;
        try {
            await expenseService.addExpense(category_id, amount, description);
            res.redirect('/');
        } catch (error) {
            console.error('Error adding expense:', error);
            res.redirect('/');
        }
    });


    router.get('/add-expense', async (req, res) => {
        try {
            const categories = await expenseService.getCategories();
            res.render('add-expense', { categories });
        } catch (error) {
            console.error('Error fetching categories:', error);
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
