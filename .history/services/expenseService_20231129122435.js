function expenseService(db) {

    async function addExpense(category_id, amount, description) {
        try {
            const result = await db.one('INSERT INTO expenses (category_id, amount, description) VALUES ($1, $2, $3) RETURNING *', 
                                        [category_id, amount, description]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    

    async function getExpenses() {
        try {
            const expenses = await db.any('SELECT * FROM expenses ORDER BY id DESC');
            return expenses;
        } catch (error) {
            throw error;
        }
    }

    async function getCategories() {
        try {
            const categories = await db.any('SELECT * FROM categories ORDER BY id');
            console.log(categories); // Temporary log to check output
            return categories;
        } catch (error) {
            throw error;
        }
    }
    

    return {
        addExpense,
        getExpenses,
        getCategories
    }
}

export default expenseService;
