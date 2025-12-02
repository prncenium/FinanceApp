import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import React from "react";
import { getBalance, addFunds } from "../services/userService";
import { getExpenses } from "../services/expenseService"; // Import getExpenses for recent history

function DashboardPage() {
  // --- State Variables ---
  const [balance, setBalance] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]); // Store recent history
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [fundAmount, setFundAmount] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  // --- Data Fetching Logic ---
  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        // 1. Fetch Balance
        const balanceRes = await getBalance();
        setBalance(balanceRes.data.balance);

        // 2. Fetch Expenses for Recent History
        const expenseRes = await getExpenses();
        
        // Sort by date (newest first) and take the top 5
        const sortedExpenses = expenseRes.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setRecentTransactions(sortedExpenses.slice(0, 5)); 

        setError("");
      } catch (err) {
        setError("Failed to load dashboard data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // --- Add Funds Logic ---
  const handleAddFunds = async (e) => {
    e.preventDefault();
    const amount = Number(fundAmount);
    if (amount <= 0 || !amount) {
      setStatusMsg("Amount must be positive.");
      return;
    }

    try {
      const response = await addFunds(amount);
      setBalance(response.data.balance);
      setFundAmount("");
      setStatusMsg("Funds added successfully!");
    } catch (err) {
      setStatusMsg(err.response?.data?.msg || "Error adding funds.");
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* 1. Account Summary */}
        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-green-500">
          <h2 className="text-lg font-semibold mb-2">Current Balance</h2>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <p className="text-4xl font-bold text-green-600">
              ${balance !== null ? balance.toFixed(2) : "0.00"}
            </p>
          )}
        </div>

        {/* 2. Add Funds Form */}
        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-indigo-500">
          <h2 className="text-lg font-semibold mb-2">Add Funds</h2>

          {statusMsg && (
            <p
              className={`mb-2 text-sm ${
                statusMsg.includes("success") ? "text-green-600" : "text-red-600"
              }`}
            >
              {statusMsg}
            </p>
          )}

          <form onSubmit={handleAddFunds} className="flex space-x-2">
            <input
              type="number"
              placeholder="Amount"
              value={fundAmount}
              onChange={(e) => setFundAmount(e.target.value)}
              className="flex-grow border p-2 rounded-md"
              min="0.01"
              step="0.01"
              required
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Add
            </button>
          </form>
        </div>

        {/* 3. Spending Insights (Link) */}
        <Link to="/expenses" className="block bg-white shadow rounded-lg p-6 border-l-4 border-red-500 hover:bg-gray-50 transition">
          <h2 className="text-lg font-semibold mb-2">Spending Insights</h2>
          <p className="text-gray-600">
             You have made <span className="font-bold text-black">{recentTransactions.length}</span> transactions recently.
          </p>
          <p className="text-blue-500 mt-2 text-sm font-bold">View all expenses →</p>
        </Link>

        {/* 4. Budget Overview (Link) */}
        <Link to="/budgets" className="block bg-white shadow rounded-lg p-6 border-l-4 border-yellow-500 hover:bg-gray-50 transition">
          <h2 className="text-lg font-semibold mb-2">Budget Overview</h2>
          <p className="text-gray-600">Check your monthly limits.</p>
          <p className="text-blue-500 mt-2 text-sm font-bold">Manage Budgets →</p>
        </Link>

        {/* 5. Goals Progress (Link) */}
        <Link to="/goals" className="block bg-white shadow rounded-lg p-6 border-l-4 border-purple-500 hover:bg-gray-50 transition">
          <h2 className="text-lg font-semibold mb-2">Goals Progress</h2>
          <p className="text-gray-600">Track your savings targets.</p>
          <p className="text-blue-500 mt-2 text-sm font-bold">View Goals →</p>
        </Link>

        {/* 6. Recent Transactions List */}
        <div className="bg-white shadow rounded-lg p-6 col-span-1 md:col-span-2 lg:col-span-3 border-t-4 border-gray-500">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Recent Activity</h2>
          
          {recentTransactions.length === 0 ? (
            <p className="text-gray-500">No recent transactions.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {recentTransactions.map((tx) => (
                <li key={tx._id} className="py-3 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-800">{tx.category?.name || 'Uncategorized'}</p>
                    <p className="text-sm text-gray-500">{new Date(tx.date).toLocaleDateString()}</p>
                  </div>
                  <span className={`font-bold ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {tx.type === 'income' ? '+' : '-'}${tx.amount}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <Link to="/expenses" className="block text-center mt-4 text-blue-600 font-bold hover:underline">View Full History</Link>
        </div>

      </div>
    </div>
  );
}

export default DashboardPage;