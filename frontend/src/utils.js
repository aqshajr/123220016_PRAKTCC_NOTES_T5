// API Configuration
export const API_BASE_URL = 'https://tugas6-backend-749281711221.us-central1.run.app';

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

// Helper function untuk menambahkan auth header
export const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Helper function untuk handle API responses
export const handleApiError = (error) => {
    if (error.response?.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
    }
    throw error;
}; 