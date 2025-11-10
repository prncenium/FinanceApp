/* eslint-disable react-refresh/only-export-components */  //this part is only for removing tahta import error isue, sirf mere personal help k liye, not imp tho 
import { createContext, useState, useEffect } from "react";
import apiClient from "../services/apiClient";


export const AuthContext = createContext();

export const AuthProvider =({children})=>{
    const [token, setToken] = useState(localStorage.getItem('token'));
    
    // It runs when 'token' changes,
    useEffect(()=>{
        if(token){
            localStorage.setItem('token',token);
            //this is for apiClinet.js wala part
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        else{
            // If token is null, clear it from localStorage
            localStorage.removeItem('token');
            // Remove token from all future API requests
            delete apiClient.defaults.headers.common['Authorization'];
        }
    },[token]);
    
    //actual login
    const login = (newToken)=>{
        setToken(newToken);
    };

    const logout = ()=>{
        setToken(null);
    }

    return(
        <AuthContext.Provider value={{token,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
};


