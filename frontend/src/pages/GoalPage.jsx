import { useState, useEffect } from 'react';
import { getGoals, createGoal, addSavingsToGoal } from '../services/goalService';

function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [newGoalName, setNewGoalName] = useState('');
  const [newTargetAmount, setNewTargetAmount] = useState('');

  const fetchGoals = async () => {
    try {
      const response = await getGoals();
      setGoals(response.data);
    } catch (err) {
      setError('Failed to fetch goals.');
      console.error(err)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleAddGoal = async (e) => {
    e.preventDefault();
    setError(null);
    if (!newGoalName || !newTargetAmount) {
      setError('Please fill in both name and target amount.');
      return;
    }

    try {
      const response = await createGoal({
        name: newGoalName,
        targetAmount: Number(newTargetAmount),
      });
      setGoals([...goals, response.data]);
      setNewGoalName('');
      setNewTargetAmount('');
    } catch (err) {
      setError('Failed to create goal.');
      console.error(err)
    }
  };

  const handleAddSavings = async (goalId) => {
    const amount = 10; 
    try {
      const response = await addSavingsToGoal(goalId, amount);
    
      setGoals(goals.map(g => (g._id === goalId ? response.data : g)));
    } catch (err) {
      setError('Failed to add savings.');
      console.error(err)
    }
  };
  
  const formatProgress = (current, target) => {
    if (target === 0) return 0;
    return Math.min(100, (current / target) * 100).toFixed(0);
  };
  
  if (loading) return <div className="p-6 text-center text-blue-600 font-semibold">Loading Goals...</div>;
  if (error) return <div className="p-6 text-center text-red-700 border border-red-500 bg-red-200 font-bold">{error}</div>;

  return (
    
    <div  className="w-full bg-gray-200 p-6 min-h-screen"> 
      <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-700">Financial Goals Tracker</h1>

      <form onSubmit={handleAddGoal} className="bg-white p-6 mb-8 border-4 border-indigo-400 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Set a New Goal</h2>
        <div className="flex space-x-4 items-center">
          <input
            type="text"
            placeholder="Goal Name (e.g., Vacation Fund)"
            value={newGoalName}
            onChange={(e) => setNewGoalName(e.target.value)}
            className="flex-grow p-3 border-2 border-gray-400 rounded-md"
            required
          />
          <input
            type="number"
            placeholder="Target Amount"
            value={newTargetAmount}
            onChange={(e) => setNewTargetAmount(e.target.value)}
            className="p-3 border-2 border-gray-400 rounded-md w-40"
            required
          />
          <button type="submit" className="bg-green-600 text-white font-bold px-6 py-3 rounded-md hover:bg-green-700">
            CREATE
          </button>
        </div>
      </form>

      <div className="space-y-6">
        {goals.length === 0 ? (
          <p className="text-center text-gray-700 bg-white p-6 border border-gray-400 rounded-lg font-medium">You haven't set any savings goals yet.</p>
        ) : (
          goals.map((goal) => {
            const progressPercent = formatProgress(goal.currentAmount, goal.targetAmount);
            
            return (
         
              <div key={goal._id} className="bg-white p-6 border-4 border-gray-400 rounded-xl">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-2xl font-extrabold text-blue-800">
                    {goal.name}
                  </div>
                  <div className="text-lg font-bold text-gray-700">
                    {progressPercent}% Complete
                  </div>
                </div>

         
                <div className="w-full bg-gray-300 rounded-full h-4 mb-3">
                  <div 
          
                    className={`h-4 rounded-full ${progressPercent < 100 ? 'bg-orange-500' : 'bg-green-700'}`}
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>

                <div className="flex justify-between text-xl font-bold mt-4">
                  <span className="text-gray-900">SAVED: ${goal.currentAmount.toFixed(2)}</span>
                  <span className="text-red-600">TARGET: ${goal.targetAmount.toFixed(2)}</span>
                </div>
                
                <button 
                  onClick={() => handleAddSavings(goal._id)}
                  className="mt-4 bg-indigo-600 text-white font-medium px-4 py-2 text-base rounded-md hover:bg-indigo-700"
                >
                  Add ₹10 Savings
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default GoalsPage;