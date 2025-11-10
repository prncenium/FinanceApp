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
    <nav className="bg-blue-400 p-5 border-b-4 border-red-500">
      <Link to="/dashboard" className="text-4xl font-bold text-yellow-900">
        My Finance App
      </Link>

      <div className="p-2">

        <Link to="/dashboard" className="mr-5 text-lg text-blue-800 hover:text-purple-700" >
          My Dashboard
        </Link>

        <Link to="/expenses" className="mr-5 text-lg text-blue-800 hover:text-purple-700" >
          My Expenses
        </Link>

        <Link to="/categories" className="mr-5 text-lg text-blue-800 hover:text-purple-700">
            Categories
        </Link>

        <Link to="/budgets"  className="mr-5 text-lg text-blue-800 hover:text-purple-700">
            My Budgets
        </Link>

        <Link to="/goals" className="mr-5 text-lg text-blue-800 hover:text-purple-700">
            Goals
        </Link>

        <Link to="/transfer"  className="mr-5 text-lg text-blue-800 hover:text-purple-700">
            Transfer Money
        </Link>

      </div>

      <button
        onClick={handleLogout}
        className="border border-black bg-gray-200 p-2 text-black hover:bg-red-500 hover:text-white"
      >
        Log Out
      </button>

    </nav>
  );
}

export default Navbar;