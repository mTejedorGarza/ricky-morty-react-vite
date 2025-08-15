import axios, { type AxiosInstance } from 'axios';

export const createAxiosClient = (baseURL: string): AxiosInstance => {
  const client = axios.create({
    baseURL,
    timeout: 10000
  });

  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      console.log('[Request]', config.method?.toUpperCase(), config.url);
      return config;
    },
    (error) => Promise.reject(error)
  );

  client.interceptors.response.use(
    (response) => {
      console.log('[Response]', response.status, response.config.url);
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        console.warn('Token expirado o no autorizado');
      }
      return Promise.reject(error);
    }
  );

  return client;
};