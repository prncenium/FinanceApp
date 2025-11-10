import apiClient from './apiClient';

export const getBudgets = () => {

  return apiClient.get('/budgets');
};

export const createBudget = (budgetData) => {
  return apiClient.post('/budgets', budgetData);
};

export const deleteBudget = (budgetId) => {
  return apiClient.delete(`/budgets/${budgetId}`);
};

export const updateBudget = (budgetId, budgetData) => {
  return apiClient.put(`/budgets/${budgetId}`, budgetData);
};