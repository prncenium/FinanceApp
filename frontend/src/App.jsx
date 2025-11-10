import { BrowserRouter,Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ProtectedRoute from "./routes/protectedRoute";
import DashboardPage from "./pages/DashboardPage";
import Navbar from "./components/layout/Navbar";
import ExpensesPage from "./pages/ExpensesPage";
import CategoriesPage from "./pages/CategoriesPage";
import BudgetsPage from "./pages/BudgetPage";
import GoalsPage from "./pages/GoalPage";
import TransferPage from "./pages/TransferPage";


function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <LoginPage/> } />
          <Route path='/login' element ={ <LoginPage/> } />
          <Route path='/register' element={<RegisterPage/>} />

          {/* {protected routes yha pe } */}
          <Route element={<ProtectedRoute/>}>
            
            <Route path="/dashboard" element={<DashboardPage/>} />
            <Route path='/expenses' element={<ExpensesPage/>} />
            <Route path='/categories' element={<CategoriesPage/>} />
            <Route path="/budgets" element={<BudgetsPage/>} />
            <Route path="/goals" element={<GoalsPage/>} />
            <Route path="/transfer" element={<TransferPage/>} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
