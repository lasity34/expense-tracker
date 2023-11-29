

// services/expensesService.js
function expenseService(db) {

 async function addExpense(category_id, amount) {
    try {
        await db.none('INSERT INTO expenses (category_id, amount) VALUES ($1, $2)', [category_id, amount]);
    } catch (error) {
        throw error;
    }
}


 async function getExpenses() {
    try {
        const expenses = await db.any('SELECT * FROM expenses');
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