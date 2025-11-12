import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); 
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* App Title/Logo */}
        <Link to="/dashboard" className="text-2xl font-bold text-white hover:text-gray-300 transition-colors duration-200">
          FinanceApp
        </Link>
      

      {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-2">
          <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors duration-200">
            Dashboard
          </Link>
          <Link to="/expenses" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors duration-200">
            Expenses
          </Link>
          <Link to="/categories" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors duration-200">
            Categories
          </Link>
          <Link to="/budgets" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors duration-200">
            Budgets
          </Link>
          <Link to="/goals" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors duration-200">
            Goals
          </Link>
          <Link to="/transfer" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors duration-200">
            Transfer
          </Link>
        </div>

        {/* Logout Button */}
        <button onClick={handleLogout} className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;