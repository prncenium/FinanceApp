import { useState, useEffect } from 'react';
import { getExpenses } from '../services/expenseService';

function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        const response = await getExpenses();

        setExpenses(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch expenses.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []); 


  if (loading) {
    return <div className="p-4 text-center">Loading expenses...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  return (
    
    <div className="w-full bg-gray-100 p-4">

      <h1 className="mb-4 text-2xl font-bold">Your Expenses</h1>

      <div className="border border-gray-300 bg-white">
        <ul>
          {expenses.length === 0 ? (
            <li className="p-4 text-black">You have no expenses logged.</li>
          ) : (
            expenses.map((expense) => (
             
              <li 
                key={expense._id} 
                className="flex items-center justify-between border-b border-gray-200 p-4"
              >
                <div>
                  <div className="text-lg font-medium">
                
                    {expense.category.name}
                  </div>
                  <div className="text-sm text-gray-700">
                    {expense.description || 'No description'}
                  </div>
                </div>
                <div className="text-right">
                  <div 
                   
                    className={`text-lg font-semibold ${
                      expense.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {expense.type === 'income' ? '+' : '-'}${expense.amount}
                  </div>
                  <div className="text-sm text-gray-700">
                
                    {new Date(expense.date).toLocaleDateString()}
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default ExpensesPage;