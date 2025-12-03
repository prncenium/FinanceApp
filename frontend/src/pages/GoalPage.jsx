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
  
  if (loading) return <div className="p-10 text-center text-slate-500 font-medium text-lg">Loading Goals...</div>;
  if (error) return <div className="p-10 text-center text-red-600 font-semibold">{error}</div>;

  return (
    <div className="w-full bg-slate-50 p-6 min-h-screen"> 
      
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-slate-800 tracking-tight">
          Financial Goals
        </h1>

        {/* --- Create Goal Form --- */}
        <form onSubmit={handleAddGoal} className="bg-white p-8 mb-10 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-6 text-slate-700 flex items-center gap-2">
            🚀 Set a New Target
          </h2>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center">
            
            {/* Name Input */}
            <div className="relative flex-grow w-full md:w-auto">
              <input
                type="text"
                placeholder="Goal Name (e.g., Dream Vacation)"
                value={newGoalName}
                onChange={(e) => setNewGoalName(e.target.value)}
                className="w-full p-3 pl-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition shadow-sm placeholder-slate-400"
                required
              />
            </div>

            {/* Amount Input */}
            <div className="relative w-full md:w-48">
              <span className="absolute left-3 top-3 text-slate-400">$</span>
              <input
                type="number"
                placeholder="Target Amount"
                value={newTargetAmount}
                onChange={(e) => setNewTargetAmount(e.target.value)}
                className="w-full p-3 pl-7 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition shadow-sm placeholder-slate-400"
                required
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full md:w-auto bg-slate-900 text-white font-semibold px-8 py-3 rounded-lg hover:bg-slate-800 shadow-md transition-all duration-200 active:scale-95">
              Create Goal
            </button>
          </div>
        </form>

        {/* --- Goals Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
              <p className="text-slate-500 text-lg">You haven't set any savings goals yet.</p>
              <p className="text-slate-400 text-sm mt-1">Use the form above to start saving!</p>
            </div>
          ) : (
            goals.map((goal) => {
              const progressPercent = formatProgress(goal.currentAmount, goal.targetAmount);
              const isCompleted = Number(progressPercent) >= 100;
              
              return (
                <div key={goal._id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
                  
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-5">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 truncate pr-2 tracking-tight">
                        {goal.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 uppercase font-semibold tracking-wider">Savings Goal</p>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${isCompleted ? 'bg-green-100 text-green-700' : 'bg-emerald-50 text-emerald-700'}`}>
                      {progressPercent}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 rounded-full h-3 mb-4 overflow-hidden">
                    <div 
                      className={`h-3 rounded-full transition-all duration-700 ease-out ${isCompleted ? 'bg-green-500' : 'bg-emerald-500'}`}
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>

                  {/* Numbers */}
                  <div className="flex justify-between text-sm mb-6 bg-slate-50 p-3 rounded-lg">
                    <div className="flex flex-col">
                      <span className="text-slate-400 text-xs font-medium">SAVED</span>
                      <span className="text-emerald-600 font-bold text-lg">${goal.currentAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-slate-400 text-xs font-medium">TARGET</span>
                      <span className="text-slate-700 font-bold text-lg">${goal.targetAmount.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  {/* Add Savings Button */}
                  <button 
                    onClick={() => handleAddSavings(goal._id)}
                    className="w-full bg-emerald-600 text-white font-medium px-4 py-3 rounded-xl hover:bg-emerald-700 transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm active:bg-emerald-800"
                  >
                    <span>+</span> Add $10 Savings
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default GoalsPage;