import { useState, useEffect } from 'react';
import { transferMoney, getTransactionHistory } from '../services/transferService';

function TransferPage() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusMsg, setStatusMsg] = useState(null); 

  const fetchHistory = async () => {
    try {
      const response = await getTransactionHistory();
      setHistory(response.data);
    } catch (err) {
      setError('Failed to load transaction history.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleTransfer = async (e) => {
    e.preventDefault();
    setError(null);
    setStatusMsg(null);

    const transferAmount = Number(amount);
    if (!recipient || transferAmount <= 0) {
      setError('Please provide a valid recipient and amount.');
      return;
    }

    try {
      await transferMoney(recipient, transferAmount);
      
      setStatusMsg('Transfer successful! Updating balance...');
      setRecipient('');
      setAmount('');
    
      await fetchHistory(); 
    } catch (err) {
      setStatusMsg(`Transfer failed: ${err.response?.data?.msg || 'Server error.'}`);
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-500 font-medium text-lg">Loading Transfer System...</div>;
  if (error) return <div className="p-10 text-center text-red-600 font-semibold">{error}</div>;

  return (
    <div className="w-full bg-gray-50 p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        P2P Money Transfer
      </h1>

      {/* Transfer Form - Clean Card Style */}
      <form onSubmit={handleTransfer} className="bg-white p-8 mb-10 rounded-xl shadow-lg max-w-lg mx-auto border border-gray-100">
        <h2 className="text-xl font-semibold mb-6 text-gray-700 border-b pb-2">Send Money Instantly</h2>
        
        {statusMsg && (
          <div className={`mb-6 p-4 rounded-lg text-sm font-medium ${statusMsg.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {statusMsg}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">Recipient Username</label>
          <input
            type="text"
            placeholder="e.g. john_doe"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">Amount</label>
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            required
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg text-lg hover:bg-blue-700 shadow-md transition-all duration-200">
          Send Money
        </button>
      </form>

      {/* Transaction History - Clean List Style */}
      <div className="max-w-3xl mx-auto mt-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Recent Transactions</h2>
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <ul className="divide-y divide-gray-100"> 
            {history.length === 0 ? (
              <li className="p-8 text-center text-gray-500">No transactions recorded yet.</li>
            ) : (
              history.map((tx) => (
                <li key={tx._id} className="flex justify-between items-center p-5 hover:bg-gray-50 transition duration-150">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 text-lg">
                      {tx.sender.username === 'You' ? `Sent to ${tx.receiver.username}` : `Received from ${tx.sender.username}`}
                    </span>
                    <span className="text-sm text-gray-500">
                       {/* You could add a date here later */}
                       Transfer
                    </span>
                  </div>
                  <div className={`text-xl font-bold ${tx.sender.username === 'You' ? 'text-red-600' : 'text-green-600'}`}>
                    {tx.sender.username === 'You' ? '-' : '+'}${tx.amount.toFixed(2)}
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

export default TransferPage;