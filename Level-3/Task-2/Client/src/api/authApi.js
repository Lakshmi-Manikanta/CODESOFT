import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000',
});

export const loginUser = async (credentials) => {
  const response = await API.post('/api/auth/login', credentials); // 👈 include full route
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await API.post('/api/auth/register', userData);
  return response.data;
};
