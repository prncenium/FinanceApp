import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


import { register as apiRegister, login as apiLogin } from '../services/authService';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); //baar baar user, button pe click na kre, and meantime mei backend mei data inout kr du 

  const { login, token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {

      await apiRegister(username, email, password);
      const response = await apiLogin(email, password);
      
   
      const newToken = response.data.token;
      login(newToken);

      setLoading(false);
      navigate('/dashboard');

    } catch (err) {

      setLoading(false);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-900">
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-white">
          Create Your Account
        </h1>
        
        {/* Error message */}
        {error && (
          <div className="mb-4 rounded bg-red-800 p-3 text-center text-sm text-white">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          
          {/* --- USERNAME FIELD (NESTED) --- */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">
              Username
              {/* The input is now inside the label. 'htmlFor' and 'id' are removed. */}
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-2 w-full rounded-lg border-gray-600 bg-gray-700 p-3 text-white focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </label>
          </div>
          
          {/* --- EMAIL FIELD (NESTED + BUG FIX) --- */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">
              Email
              {/* The input is inside the label. */}
              <input
                type="email" // <-- BUG FIX: Changed from type={email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-lg border-gray-600 bg-gray-700 p-3 text-white focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </label>
          </div>
        
          {/* --- PASSWORD FIELD (NESTED) --- */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300">
              Password
              {/* The input is inside the label. */}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-lg border-gray-600 bg-gray-700 p-3 text-white focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </label>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-5 py-3 text-center font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;