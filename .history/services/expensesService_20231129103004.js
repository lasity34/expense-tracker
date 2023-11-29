

// services/expensesService.js

export async function addExpense(db, category_id, amount) {
    try {
        await db.none('INSERT INTO expenses (category_id, amount) VALUES ($1, $2)', [category_id, amount]);
    } catch (error) {
        throw error;
    }
}
