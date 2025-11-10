
import { useState,useContext,useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import { login as apiLogin } from '../services/authService';


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { login, token } = useContext(AuthContext); 
  const navigate = useNavigate();

  // check if user is already logged in
  useEffect(() => {
    if (token) {
      navigate('/dashboard'); 
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {

    e.preventDefault(); // page baar baar refresh nhi hota
    setError(null); // Clear any old error

    try {
      const response = await apiLogin(email, password);
      const newToken = response.data.token;
      
      login(newToken);
      navigate('/dashboard'); 

    } catch (err) {
      setError('Invalid email or password. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900">
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-white">
          Welcome Back
        </h1>
        
        {/* {to display error } */}
        {error && (
          <div className="mb-4 rounded bg-red-800 p-3 text-center text-sm text-white">
            {error}
          </div>
        )}
        

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label 
              htmlFor="email" 
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border-gray-600 bg-gray-700 p-3 text-white focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          {/* ... (password input) ... */}
          <div className="mb-6">
            <label 
              htmlFor="password" 
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border-gray-600 bg-gray-700 p-3 text-white focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-5 py-3 text-center font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;