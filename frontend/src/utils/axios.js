import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // adjust this if your backend is deployed elsewhere
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // or sessionStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default instance;
