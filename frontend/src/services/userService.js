
import apiClient from './apiClient';
export const getBalance = () => {
  return apiClient.get('/user/balance');
};

export const addFunds = (amount)=>{
    return apiClient.post('/user/add-funds',{amount});
}

const userService = {getBalance, addFunds};
export default userService;