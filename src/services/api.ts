import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  userType: 'FARMER' | 'LABOUR' | 'ADMIN';
  isActive: boolean;
  createdAt: string;
  bio?: string;
  location?: string;
  skills?: string[];
  experienceYears?: number;
  hourlyRate?: number;
  availabilityStatus?: 'AVAILABLE' | 'BUSY' | 'UNAVAILABLE';
  profileImageUrl?: string;
}

export interface UserRegistrationRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  userType: 'FARMER' | 'LABOUR' | 'ADMIN';
  bio?: string;
  location?: string;
  skills?: string[];
  experienceYears?: number;
  hourlyRate?: number;
}

export interface Task {
  id: number;
  farmerId: number;
  title: string;
  description?: string;
  taskType: string;
  location: string;
  startDate: string;
  endDate?: string;
  estimatedHours?: number;
  hourlyRate?: number;
  totalBudget?: number;
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  requiredSkills?: string[];
  maxLabourers: number;
  createdAt: string;
  updatedAt: string;
}

export interface TaskCreateRequest {
  title: string;
  description?: string;
  taskType: string;
  location: string;
  startDate: string;
  endDate?: string;
  estimatedHours?: number;
  hourlyRate?: number;
  totalBudget?: number;
  requiredSkills?: string[];
  maxLabourers?: number;
}

export interface ChatMessage {
  id: string;
  message: string;
  sender: 'USER' | 'AI';
  timestamp: string;
}

// User API
export const userApi = {
  register: (data: UserRegistrationRequest) => api.post<User>('/api/users/register', data),
  getById: (id: number) => api.get<User>(`/api/users/${id}`),
  getByEmail: (email: string) => api.get<User>(`/api/users/email/${email}`),
  getByType: (userType: 'FARMER' | 'LABOUR' | 'ADMIN') => api.get<User[]>(`/api/users/type/${userType}`),
  getByLocationAndType: (location: string, userType: 'FARMER' | 'LABOUR' | 'ADMIN') => 
    api.get<User[]>(`/api/users/location/${location}/type/${userType}`),
  updateProfile: (id: number, data: Partial<UserRegistrationRequest>) => 
    api.put<User>(`/api/users/${id}/profile`, data),
  deactivate: (id: number) => api.delete(`/api/users/${id}`),
};

// Task API
export const taskApi = {
  create: (data: TaskCreateRequest) => api.post<Task>('/api/tasks', data),
  getAll: () => api.get<Task[]>('/api/tasks'),
  getById: (id: number) => api.get<Task>(`/api/tasks/${id}`),
  getByFarmer: (farmerId: number) => api.get<Task[]>(`/api/tasks/farmer/${farmerId}`),
  update: (id: number, data: Partial<TaskCreateRequest>) => api.put<Task>(`/api/tasks/${id}`, data),
  delete: (id: number) => api.delete(`/api/tasks/${id}`),
};

// AI API
export const aiApi = {
  chat: (message: string) => api.post<{ response: string }>('/api/ai/chat', { message }),
  getRecommendations: (userId: number) => api.get<any[]>(`/api/ai/recommendations/${userId}`),
};

// Notification API
export const notificationApi = {
  getAll: () => api.get<any[]>('/api/notifications'),
  markAsRead: (id: number) => api.put(`/api/notifications/${id}/read`),
  delete: (id: number) => api.delete(`/api/notifications/${id}`),
};

export default api;
