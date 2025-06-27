import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000',
});

export const fetchTasks = (projectId) => {
  return API.get(`/api/tasks/project/${projectId}`);
};

export const createTask = (data) => {
  return API.post('/api/tasks', data);
};

export const updateTaskStatus = (taskId, data) => {
  return API.put(`/api/tasks/${taskId}/status`, data);
};

export const deleteTask = (taskId) => {
  return API.delete(`/api/tasks/${taskId}`);
};
