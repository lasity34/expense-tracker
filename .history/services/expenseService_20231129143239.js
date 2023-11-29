import moment from 'moment';


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
            const expenses = await db.any(`
                SELECT expenses.id, expenses.amount, expenses.date_added, expenses.description, categories.name AS category_name
                FROM expenses
                JOIN categories ON expenses.category_id = categories.id
                ORDER BY expenses.id DESC`);
    
            // Format date for each expense using moment.js
            expenses.forEach(expense => {
                expense.date_added = moment().format('YYYY-MM-DD HH:mm:ss');
                ;
            });
    
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

    async function deleteExpense(expenseId) {
        try {
            await db.none('DELETE FROM expenses WHERE id = $1', expenseId);
        } catch (error) {
            throw error;
        }
    }

    async function getFilteredExpenses(filterParams) {
        try {
            let query = 'SELECT expenses.*, categories.name AS category_name FROM expenses JOIN categories ON expenses.category_id = categories.id WHERE 1=1';
        const queryParams = [];
    
            if (filterParams.description) {
                query += ' AND description ILIKE $1';
                queryParams.push(`%${filterParams.description}%`);
            }
            if (filterParams.category) {
                query += ' AND category_id = $1';
                queryParams.push(filterParams.category);
            }
           
    
            const expenses = await db.any(query, queryParams);
            return expenses;
        } catch (error) {
            throw error;
        }
    }

// autocomplete filter
    async function getDescriptionsLike(search) {
        try {
            return await db.any('SELECT DISTINCT description FROM expenses WHERE description ILIKE $1', [`%${search}%`]);
        } catch (error) {
            throw error;
        }
    }
    
    
    

    return {
        addExpense,
        getExpenses,
        getCategories,
        deleteExpense,
        getFilteredExpenses,
        getDescriptionsLike
    }
}

export default expenseService;
