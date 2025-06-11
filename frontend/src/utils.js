import axios from 'axios';

// API Configuration
export const API_BASE_URL = 'https://tugas6-backend-749281711221.us-central1.run.app';

// Configure axios defaults
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Add axios request interceptor to automatically add auth headers
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add axios response interceptor to handle common errors
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        
        return Promise.reject(error);
    }
);

// API Endpoints
export const API_ENDPOINTS = {
    // Notes endpoints
    NOTES: `${API_BASE_URL}/notes`,
    NOTE_BY_ID: (id) => `${API_BASE_URL}/notes/${id}`,
    
    // Authentication endpoints
    LOGIN: `${API_BASE_URL}/login`,
    LOGOUT: `${API_BASE_URL}/logout`,
    REFRESH_TOKEN: `${API_BASE_URL}/token`,
    
    // User endpoints
    USERS: `${API_BASE_URL}/users`,
    USER_BY_ID: (id) => `${API_BASE_URL}/users/${id}`,
};

// Helper function untuk menambahkan auth header (deprecated - now handled by interceptor)
export const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Helper function untuk handle API responses (deprecated - now handled by interceptor)
export const handleApiError = (error) => {
    if (error.response?.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
    }
    throw error;
};

// Check if user is authenticated
export const isAuthenticated = () => {
    return !!localStorage.getItem('accessToken');
};

// Logout helper
export const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
}; 