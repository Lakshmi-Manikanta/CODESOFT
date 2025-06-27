import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000',
});

export const fetchProjects = () => API.get('/api/projects');
export const createProject = (data) => API.post('/api/projects', data);
export const fetchProjectById = (id) => API.get(`/api/projects/${id}`);
export const updateProject = (id, data) => API.put(`/api/projects/${id}`, data);
export const deleteProject = (id) => API.delete(`/api/projects/${id}`);
