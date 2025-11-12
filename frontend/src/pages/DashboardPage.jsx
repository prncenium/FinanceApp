import { AuthContext } from '../context/AuthContext';
import React from 'react';

function DashboardPage() {
  
  return (
    <>
  
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Account Summary */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Account Summary</h2>
          {/* ... (Display account information here) */}
        </div>

        {/* Spending Insights */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Spending Insights</h2>
          {/* ... (Display spending charts and data here) */}
        </div>

        {/* Budget Overview */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Budget Overview</h2>
          {/* ... (Display budget information here) */}
        </div>

        {/* Goals Progress */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Goals Progress</h2>
          {/* ... (Display goals progress here) */}
        </div>

        {/* Recent Transactions */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
          {/* ... (Display recent transactions here) */}
        </div>
      </div>
    </div>
    </>
  );
}

export default DashboardPage;