import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const signup = (userData: SignupData) => {
  return axios.post(`${API_URL}/auth/signup`, userData);
};

export const login = (userData: LoginData) => {
  return axios.post(`${API_URL}/auth/login`, userData);
};

export const verify = (token: string) => {
  return axios.get(`${API_URL}/auth/verify`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
