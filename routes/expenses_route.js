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


    
// show-categories in add expenses
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
            const filterParams = {
                description: req.query.description,
                category: req.query.category,
                from_date: req.query.from_date,
                to_date: req.query.to_date
            };
    
            const expenses = await expenseService.getFilteredExpenses(filterParams);
            res.render('expenses', { expenses });
        } catch (error) {
            console.error('Error retrieving filtered expenses:', error);
            res.redirect('/');
        }
    });


    // autocomplete
    router.get('/descriptions', async (req, res) => {
        try {
            const search = req.query.search;
            const descriptions = await expenseService.getFilteredDescriptions(search); // Implement this method
            res.json(descriptions);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Server Error');
        }
    });
    
    


    router.get('/delete-expense/:id', async (req, res) => {
        try {
            const expenseId = req.params.id;
            await expenseService.deleteExpense(expenseId);
            res.redirect('/expenses');
        } catch (error) {
            console.error('Error deleting expense:', error);
            res.redirect('/expenses');
        }
    });

    return router;
}

export default expensesRouter;
