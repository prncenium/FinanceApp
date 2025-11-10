import { useState, useEffect, useContext } from 'react';
import { getBudgets, createBudget } from '../services/budgetService';
import { AuthContext } from '../context/AuthContext';
import { getCategories } from '../services/CategoryService';

function BudgetsPage() {
  const [budgets, setBudgets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newBudgetAmount, setNewBudgetAmount] = useState('');
  const [newBudgetCategory, setNewBudgetCategory] = useState('');
  const [newBudgetPeriod, setNewBudgetPeriod] = useState('monthly');

  const {token}  =useContext(AuthContext);
  

  useEffect(() => {
    const fetchBudgetsAndCategories = async () => {
     if (!token) return;
     try{
        const [budgetResponse, categoryResponse] = await Promise.all([getBudgets(), getCategories() ]);
        setBudgets(budgetResponse.data);
        setCategories(categoryResponse.data); 
        
        if (categoryResponse.data.length > 0) {
          setNewBudgetCategory(categoryResponse.data[0]._id);
        }
        setError(null);
      }
       catch (err) {
        setError('Failed to fetch data.');
        console.error(err);
      }
      finally {
        setLoading(false);
      }
    };
    fetchBudgetsAndCategories();
  }, [token]);

 
  const calculateProgress = (spent, amount) => {
    if (amount === 0) return 0;
    return Math.min(100, (spent / amount) * 100);
  };

  const handleAddBudget = async (e) => {
    e.preventDefault();
    setError(null);
    
    
    if (!newBudgetCategory || !newBudgetAmount || Number(newBudgetAmount) <= 0) {
        setError('Please select a category and enter a valid amount.');
        return;
    }

    try {
        const response = await createBudget({
            categoryId: newBudgetCategory, 
            amount: Number(newBudgetAmount),
            period: newBudgetPeriod,
        });
        
        setBudgets([...budgets, response.data]);
        setNewBudgetAmount('');

    } catch (err) {
        setError(err.response?.data?.msg || 'Failed to create budget.');
    }
  };
  
  if (loading) return <div className="p-6 text-center text-gray-700">Loading budgets...</div>;
  if (error) return <div className="p-6 text-center text-red-700 border border-red-300 bg-red-100">{error}</div>;

  return (

    <div className="w-full bg-gray-100 p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Monthly Budgets</h1>

      <form onSubmit={handleAddBudget} className="bg-white p-6 mb-6 border border-gray-300 rounded-md">
      <h2 className="text-xl font-semibold mb-3">Set New Budget</h2>
      <div className="flex space-x-4 items-center">
        
        <select
          value={newBudgetCategory}
          onChange={(e) => setNewBudgetCategory(e.target.value)}
          className="p-2 border border-gray-400 rounded-md flex-grow"
          required
        >
          {categories.length === 0 ? (
            <option disabled value="">No Categories Available</option>
          ) : (
         
            categories.map(cat => (
              <option key={cat._id} value={cat._id}>
                {cat.name} ({cat.type})
              </option>
            ))
          )}
        </select>

        <input
          type="number"
          placeholder="Budget Amount ($)"
          value={newBudgetAmount} 
          onChange={(e) => setNewBudgetAmount(e.target.value)}
          className="p-2 border border-gray-400 rounded-md w-32"
          required
        />
        
        
        <select
          value={newBudgetPeriod}
          onChange={(e) => setNewBudgetPeriod(e.target.value)}
          className="p-2 border border-gray-400 rounded-md w-32"
        >
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
        
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Set Budget
        </button>
      </div>
    </form>

      <div className="space-y-4">
        {budgets.length === 0 ? (
          <p className="text-center text-gray-500 bg-white p-4 rounded-md border border-gray-300">You have not set any budgets yet.</p>
        ) : (
          budgets.map((budget) => {
            
            const spent = budget.spent || 0; 
            const progress = calculateProgress(spent, budget.amount);
            
            return (
              
              <div key={budget._id} className="bg-white p-4 border border-gray-300 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-xl font-semibold text-blue-800">
                    
                    {budget.category?.name || 'Uncategorized'}
                  </div>
                  <div className="text-sm text-gray-600">
                    {new Date(budget.startDate).toLocaleDateString()} - {new Date(budget.endDate).toLocaleDateString()}
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div 
                    className={`h-3 rounded-full ${progress < 80 ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <div className="flex justify-between text-lg font-medium">
                  <span className="text-gray-900">${spent.toFixed(2)} SPENT</span>
                  <span className="text-gray-700">of ${budget.amount.toFixed(2)}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default BudgetsPage;