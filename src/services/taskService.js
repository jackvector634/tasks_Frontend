import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'https://task-management-api-klht.onrender.com/api/task';

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

// Function to fetch all tasks
export const getTasks = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch tasks: ' + error.message);
  }
};

// Function to fetch a task by ID
export const getTaskById = async (taskId) => {
  try {
    const response = await axiosInstance.get(`/${taskId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch task: ' + error.message);
  }
};

// Function to create a new task
export const createTask = async (taskData) => {
  try {
    const response = await axiosInstance.post('/', taskData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create task: ' + error.message);
  }
};

// Function to update a task by ID
export const updateTaskById = async (taskId, taskData) => {
  try {
    const response = await axiosInstance.put(`/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update task: ' + error.message);
  }
};

// Function to delete a task by ID
export const deleteTaskById = async (taskId) => {
  try {
    const response = await axiosInstance.delete(`/${taskId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete task: ' + error.message);
  }
};

// Function to assign a task to a user
export const assignTaskToUser = async (taskId, assigneeId) => {
  try {
    const response = await axiosInstance.post(`/${taskId}/assign`, { assigneeId });
    return response.data;
  } catch (error) {
    throw new Error('Failed to assign task to user: ' + error.message);
  }
};

// Function to update task status by ID
export const updateTaskStatusById = async (taskId, status) => {
  try {
    const response = await axiosInstance.put(`/${taskId}/status`, { status });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update task status: ' + error.message);
  }
};

// Function to calculate task metrics
export const calculateTaskMetrics = async () => {
  try {
    const response = await axiosInstance.get('/metrics');
    return response.data;
  } catch (error) {
    throw new Error('Failed to calculate task metrics: ' + error.message);
  }
};
