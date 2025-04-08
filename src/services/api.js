import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const userService = {
  register: async (userData) => {
    const response = await api.post('/users/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/users/login', credentials);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await api.put('/users/profile', profileData);
    return response.data;
  },

  updatePreferences: async (preferences) => {
    const response = await api.put('/users/preferences', preferences);
    return response.data;
  },

  updateHealthGoals: async (goals) => {
    const response = await api.put('/users/health-goals', goals);
    return response.data;
  },
};

export const recipeService = {
  getAll: async () => {
    const response = await api.get('/recipes');
    return response.data;
  },

  search: async (query) => {
    const response = await api.get('/recipes/search', { params: query });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/recipes/${id}`);
    return response.data;
  },
};

export const mealPlanService = {
  generate: async (preferences) => {
    const response = await api.post('/meal-plan/generate', preferences);
    return response.data;
  },

  getCurrent: async () => {
    const response = await api.get('/meal-plan/current');
    return response.data;
  },
};

export default api; 