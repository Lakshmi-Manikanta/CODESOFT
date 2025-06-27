import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Or use process.env.REACT_APP_API_URL
});

export default axiosInstance;
