

app.get('/', (req, res) => {
  
    res.render('dashboard');
});


app.post('/add-expense', async (req, res) => {
    const { category_id, amount } = req.body;
    try {
        await db.none('INSERT INTO expenses (category_id, amount) VALUES ($1, $2)', [category_id, amount]);
        res.redirect('/'); // Redirect to the dashboard or a success page
    } catch (error) {
        console.error('Error adding expense:', error);
        res.redirect('/'); // Redirect to an error page or show an error message
    }
});
