import apiClient from './apiClient';

export const getCategories = () => {
  return apiClient.get('/categories');
};

export const createCategory = (categoryData) => {
  return apiClient.post('/categories', categoryData);
};

export const deleteCategory = (categoryId) => {
  return apiClient.delete(`/categories/${categoryId}`);
};


export const updateCategory = (categoryId, categoryData) => {
  return apiClient.put(`/categories/${categoryId}`, categoryData);
};