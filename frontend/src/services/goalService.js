import apiClient from './apiClient';

export const getGoals = () => {
  return apiClient.get('/goals');
};

export const createGoal = (goalData) => {
  return apiClient.post('/goals', goalData);
};

export const addSavingsToGoal = (goalId, amount) => {
  return apiClient.post(`/goals/${goalId}/add`, { amount });
};

export const deleteGoal = (goalId) => {
  return apiClient.delete(`/goals/${goalId}`);
};