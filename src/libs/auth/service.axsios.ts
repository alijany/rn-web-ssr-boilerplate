import axios from 'axios';
import {config as appConfig} from '../../../config';
import {refreshAccessToken} from './api';
import {deleteTokens, getTokens} from './service.storage';

export const axiosInstance = axios.create();

const version = appConfig.version.toString();

axiosInstance.interceptors.request.use(
  function (config) {
    config.headers.set('X-Version', version);
    const {[appConfig.accessTokenKey]: accessToken} = getTokens();
    if (accessToken) {
      config.headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const isTokenRefreshed = await refreshAccessToken();
      if (isTokenRefreshed) {
        return axiosInstance(originalRequest);
      }
    }
    if (originalRequest._retry) {
      deleteTokens();
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
