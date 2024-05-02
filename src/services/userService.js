import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'https://task-management-api-klht.onrender.com/api/auth/users';

// Creating Axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Adding a request interceptor to include the authorization token from cookies
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to fetch all users
export const getUsers = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users: ' + error.message);
  }
};

// Function to fetch a user by ID
export const getUserById = async (userId) => {
  try {
    const response = await axiosInstance.get(`/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user: ' + error.message);
  }
};

// Function to fetch users by role
export const getUsersByRole = async (role) => {
  try {
    const response = await axiosInstance.get(`/?role=${role}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users by role: ' + error.message);
  }
};



