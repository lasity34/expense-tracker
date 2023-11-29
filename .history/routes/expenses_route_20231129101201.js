import express from 'express';
const router = express.Router();



// dashboard
router.get('/', (req, res) => {
  
    res.render('dashboard');
});


// load add expense page
router.get('/add-expense', (req, res) => {
    res.render('add-expense');
});



router.post('/add-expense', async (req, res) => {
    const { category_id, amount } = req.body;
    try {
        await db.none('INSERT INTO expenses (category_id, amount) VALUES ($1, $2)', [category_id, amount]);
        res.redirect('/'); // Redirect to the dashboard or a success page
    } catch (error) {
        console.error('Error adding expense:', error);
        res.redirect('/'); // Redirect to an error page or show an error message
    }
});


router.get('/expenses', async (req, res) => {
    try {
        const expenses = await db.any('SELECT * FROM expenses');
        res.render('expenses', { expenses }); // Render a view with the expenses data
    } catch (error) {
        console.error('Error retrieving expenses:', error);
        res.redirect('/');
    }
});




export default router;
