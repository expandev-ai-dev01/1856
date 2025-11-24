import axios from 'axios';

export const apiConfig = {
  baseUrl: import.meta.env.VITE_API_URL,
  version: import.meta.env.VITE_API_VERSION || 'v1',
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  get externalUrl() {
    return `${this.baseUrl}/api/${this.version}/external`;
  },
  get internalUrl() {
    return `${this.baseUrl}/api/${this.version}/internal`;
  },
};

export const publicClient = axios.create({
  baseURL: apiConfig.externalUrl,
  timeout: apiConfig.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authenticatedClient = axios.create({
  baseURL: apiConfig.internalUrl,
  timeout: apiConfig.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

authenticatedClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

authenticatedClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
