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

  if (loading) return <div className="p-6 text-center text-gray-700">Loading Transfer System...</div>;
  if (error) return <div className="p-6 text-center text-red-700 border border-red-500 bg-red-200">{error}</div>;

  return (
    <div className="w-full bg-blue-200 p-6 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-blue-900 border-b-4 border-black pb-2">P2P Money Transfer</h1> {/* Strong, bold header */}

      <form onSubmit={handleTransfer} className="bg-white p-8 mb-10 border-4 border-pink-600 rounded-lg max-w-xl mx-auto shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Send Money Instantly</h2>
        
        {statusMsg && (
          <div className={`mb-4 p-3 rounded font-medium border ${statusMsg.includes('successful') ? 'bg-green-300 text-green-800 border-green-500' : 'bg-red-300 text-red-800 border-red-500'}`}>
            {statusMsg}
          </div>
        )}

        <input
          type="text"
          placeholder="Recipient Username"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full p-3 mb-4 border-2 border-gray-500 rounded-lg text-lg"
          required
        />
        <input
          type="number"
          placeholder="Amount (e.g., 25.00)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 mb-8 border-2 border-gray-500 rounded-lg text-lg"
          required
        />
        <button type="submit" className="w-full bg-blue-700 text-white font-extrabold px-6 py-3 rounded-lg text-xl hover:bg-blue-800">
          SEND MONEY NOW
        </button>
      </form>

      <div className="max-w-3xl mx-auto mt-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Transaction History</h2>
        <div className="bg-white border-4 border-purple-500 rounded-lg">
          <ul className="divide-y divide-gray-400"> 
            {history.length === 0 ? (
              <li className="p-4 text-center text-gray-600 font-medium">No transactions recorded yet.</li>
            ) : (
              history.map((tx) => (
                <li key={tx._id} className="flex justify-between items-center p-4">
                  <div className="font-medium text-gray-900 text-lg">
               
                    {tx.sender.username === 'You' ? 'Sent to' : 'Received from'} {tx.sender.username === 'You' ? tx.receiver.username : tx.sender.username}
                  </div>
                  <div className={`text-xl font-extrabold ${tx.sender.username === 'You' ? 'text-red-700' : 'text-green-700'}`}>
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