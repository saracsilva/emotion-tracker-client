import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const signup = (userData) => {
  return axios.post(`${API_URL}/auth/signup`, userData);
};

export const login = (userData) => {
  return axios.post(`${API_URL}/auth/login`, userData);
};

export const verify = (token) => {
  return axios.get(`${API_URL}/auth/verify`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
