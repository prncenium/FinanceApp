import axios from 'axios';

// mene yhha pe instance of axios, taaki axios ka code baar baar repeat na krna pde
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;