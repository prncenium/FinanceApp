import apiClient from './apiClient';

export const transferMoney = (receiverUsername, amount) => {
  return apiClient.post('/transfers', { receiverUsername, amount });
};

export const getTransactionHistory = () => {
  return apiClient.get('/transfers');
};