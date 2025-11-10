import { BrowserRouter,Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ProtectedRoute from "./routes/protectedRoute";
import DashboardPage from "./pages/DashboardPage";
import Navbar from "./components/layout/Navbar";


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
          </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
