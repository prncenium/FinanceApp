import { useState, useEffect, useContext } from 'react';
import { getExpenses, addExpense } from '../services/expenseService'; // Import addExpense
import { getCategories } from '../services/CategoryService'; // Import getCategories
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]); // State for categories
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Form State ---
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const { token } = useContext(AuthContext);

  // --- Fetch Data (Expenses + Categories) ---
  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      try {
        setLoading(true);
        const [expRes, catRes] = await Promise.all([
          getExpenses(),
          getCategories()
        ]);
        
        setExpenses(expRes.data);
        setCategories(catRes.data);
        
        // Set default category for the dropdown
        if (catRes.data.length > 0) setCategory(catRes.data[0]._id);
        
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  // --- Handle Add Expense ---
  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!amount || !category) {
      alert('Please fill in Amount and Category.');
      return;
    }

    try {
      const response = await addExpense({
        amount: Number(amount),
        type,
        category,
        description,
        date: date || new Date(),
      });
      
      // Add new expense to the top of the list
      setExpenses([response.data, ...expenses]); 
      
      // Reset form
      setAmount('');
      setDescription('');
      setDate('');
    } catch (err) {
      console.error(err);
      alert('Failed to add expense.');
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-500">Loading...</div>;
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

  return (
    <div className="w-full bg-gray-50 p-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Your Expenses</h1>

        {/* --- ADD EXPENSE FORM --- */}
        <form onSubmit={handleAddExpense} className="bg-white p-6 mb-8 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Transaction</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Type Selector */}
            <select 
              value={type} 
              onChange={(e) => setType(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            {/* Category Selector */}
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              {categories.length === 0 ? (
                <option value="" disabled>No Categories</option>
              ) : (
                categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))
              )}
            </select>

            {/* Amount */}
            <input 
              type="number" 
              placeholder="Amount" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

            {/* Description */}
            <input 
              type="text" 
              placeholder="Description" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* Date */}
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button type="submit" className="mt-6 w-full bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-200">
            Add Transaction
          </button>
        </form>

        {/* --- EXPENSE LIST --- */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <ul className="divide-y divide-gray-100">
            {expenses.length === 0 ? (
              <li className="p-8 text-center text-gray-500">You have no expenses logged. Add one above!</li>
            ) : (
              expenses.map((expense) => (
                <li key={expense._id} className="flex items-center justify-between p-5 hover:bg-gray-50 transition">
                  <div>
                    <div className="text-lg font-bold text-gray-800">
                      {/* Added ?. to prevent crashes if category is deleted */}
                      {expense.category?.name || 'Uncategorized'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {expense.description || 'No description'}
                    </div>
                  </div>
                  <div className="text-right">
                    <div 
                      className={`text-xl font-bold ${
                        expense.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {expense.type === 'income' ? '+' : '-'}${expense.amount}
                    </div>
                    <div className="text-sm text-gray-400">
                      {new Date(expense.date).toLocaleDateString()}
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ExpensesPage;