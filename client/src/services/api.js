import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE
});

export const userAPI = {
  register: (data) => api.post('/users/register', data),
  login: (data) => api.post('/users/login', data)
};

export const healthAPI = {
  addData: (data) => api.post('/health/add', data),
  getData: (userId) => api.get(`/health/${userId}`),
  updateData: (id, data) => api.put(`/health/${id}`, data)
};

export default api;