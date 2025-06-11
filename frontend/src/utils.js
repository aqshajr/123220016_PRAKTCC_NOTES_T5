import axios from 'axios';

export const API_BASE_URL = 'https://tugas6-backend-749281711221.us-central1.run.app';

export const API_ENDPOINTS = {
    NOTES: `${API_BASE_URL}/notes`,
    NOTE_BY_ID: (id) => `${API_BASE_URL}/notes/${id}`,
    
    LOGIN: `${API_BASE_URL}/login`,
    LOGOUT: `${API_BASE_URL}/logout`,
    REFRESH_TOKEN: `${API_BASE_URL}/token`,
    
    USERS: `${API_BASE_URL}/users`,
    USER_BY_ID: (id) => `${API_BASE_URL}/users/${id}`,
};

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, 
});

apiClient.interceptors.request.use(
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

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        console.log(` API Error: ${error.config.method?.toUpperCase()} ${error.config.url} - Status: ${error.response?.status}`);

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            console.log(' Token expired, attempting refresh...');

            try {
                const response = await axios.get(API_ENDPOINTS.REFRESH_TOKEN, {
                    withCredentials: true
                });
                
                const newToken = response.data.accessToken;
                console.log(' Token refreshed successfully');
                localStorage.setItem('accessToken', newToken);
                
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                console.log(` Retrying original request: ${originalRequest.method?.toUpperCase()} ${originalRequest.url}`);
                return apiClient(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                console.log('Redirecting to login...');

                localStorage.removeItem('accessToken');
                localStorage.removeItem('userEmail');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        if (error.response?.status === 403) {
            console.error(' Access forbidden:', error.response.data);
            console.log(' Current token exists:', !!localStorage.getItem('accessToken'));
            

            const token = localStorage.getItem('accessToken');
            if (!token) {
                console.log(' No token found, redirecting to login...');
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const handleApiError = (error) => {
    if (error.response?.status === 401) {

        localStorage.removeItem('accessToken');
        window.location.href = '/login';
    }
    throw error;
}; 