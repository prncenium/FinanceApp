import { AuthContext } from '../context/AuthContext';


function DashboardPage() {
  
  return (
    <>
  
    <div className="bg-blue-800  text-center">
      <h1 className="p-8 text-3xl font-bold text-yellow-200">
        DASHBOARD
      </h1>
      
      <p className="p-4 text-white">You are logged in!</p>
      
    </div>
    </>
  );
}

export default DashboardPage;