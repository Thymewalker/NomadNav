import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Prices API
export const pricesAPI = {
  getAll: async (filters = {}) => {
    const response = await api.get('/prices', { params: filters });
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/prices/${id}`);
    return response.data;
  },
  create: async (priceData) => {
    const response = await api.post('/prices', priceData);
    return response.data;
  },
  update: async (id, priceData) => {
    const response = await api.patch(`/prices/${id}`, priceData);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/prices/${id}`);
    return response.data;
  },
};

// Countries API
export const countriesAPI = {
  getAll: async () => {
    const response = await api.get('/countries');
    return response.data;
  },
  getByCode: async (code) => {
    const response = await api.get(`/countries/${code}`);
    return response.data;
  },
  create: async (countryData) => {
    const response = await api.post('/countries', countryData);
    return response.data;
  },
  update: async (code, countryData) => {
    const response = await api.patch(`/countries/${code}`, countryData);
    return response.data;
  },
  delete: async (code) => {
    const response = await api.delete(`/countries/${code}`);
    return response.data;
  },
};

export default api; 