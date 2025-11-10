import apiClient from './apiClient';

export const getExpenses = () => {
  return apiClient.get('/expenses');
};

export const addExpense = (expenseData) => {
  return apiClient.post('/expenses', expenseData);
};

export const deleteExpense = (expenseId) => {
  return apiClient.delete(`/expenses/${expenseId}`);
};

export const updateExpense = (expenseId, expenseData) => {
  return apiClient.put(`/expenses/${expenseId}`, expenseData);
};