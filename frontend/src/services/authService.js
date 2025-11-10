//We could have done same in login.jsx as well, but messy na ho... isliye logic of(getting the data only) yha and files showing and veryfing wha krunga
import apiClient from "./apiClient";

export const login = (email, password)=>{
    return apiClient.post('/auth/login', {email,password})
};

export const register = (username,email,password)=>{
    return apiClient.post('/auth/register', {username,email,password});
};

