import { useContext } from 'react';
import { AuthContext }  from "../context/AuthContext";
import {Navigate, Outlet} from 'react-router-dom';
import Navbar from '../components/layout/Navbar';




function ProtectedRoute(){
    const {token} = useContext(AuthContext);

    if(!token){
        return <Navigate to='/login' replace /> //dashboard and login kei loop sei niklne k liye h 
    }

    return (
        <>
            <Navbar />   {/* iski help sei jitne bhi protected routes h, sub par Navbar show hoga... baar baar individually show krne ki no need now */}
            <Outlet />  { /* basically this outlet will replace with either /dashboard or any route, where user wanna go */}
        </>
    )
}

export default ProtectedRoute;