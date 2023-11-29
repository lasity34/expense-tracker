function expenseService(db) {

    async function addExpense(category_id, amount) {
        try {
            const result = await db.one('INSERT INTO expenses (category_id, amount) VALUES ($1, $2) RETURNING *', [category_id, amount]);
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

    return {
        addExpense,
        getExpenses
    }
}

export default expenseService;
