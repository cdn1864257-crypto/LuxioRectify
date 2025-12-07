import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { getApiUrl, getCsrfToken, resetCsrfToken } from './config';
import { logger } from './logger';

export type LogoutHandler = () => void;
export type NavigateHandler = (path: string) => void;

let globalLogoutHandler: LogoutHandler | null = null;
let globalNavigateHandler: NavigateHandler | null = null;

export function setGlobalLogoutHandler(handler: LogoutHandler) {
  globalLogoutHandler = handler;
}

export function setGlobalNavigateHandler(handler: NavigateHandler) {
  globalNavigateHandler = handler;
}

const axiosInstance = axios.create({
  baseURL: getApiUrl(''),
  withCredentials: true,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const method = config.method?.toUpperCase();
    if (method && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      try {
        const csrfToken = await getCsrfToken();
        config.headers['X-CSRF-Token'] = csrfToken;
      } catch (error) {
        logger.warn('Failed to get CSRF token for request:', error);
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      const errorData = error.response.data as any;
      const errorCode = errorData?.error;

      logger.warn('[Axios] 401 Unauthorized response:', errorCode);

      if (errorCode === 'JWT_EXPIRED' || 
          errorCode === 'JWT_INVALID' || 
          errorCode === 'JWT_MISSING' ||
          errorCode === 'SESSION_EXPIRED' ||
          errorCode === 'SESSION_INVALID') {
        
        logger.log('[Axios] Session/Token expired, triggering auto-logout...');
        
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_token_expiration');
        resetCsrfToken();

        if (globalLogoutHandler) {
          try {
            globalLogoutHandler();
          } catch (logoutError) {
            logger.error('[Axios] Error during logout handler:', logoutError);
          }
        }

        if (globalNavigateHandler) {
          const currentPath = window.location.pathname;
          const langMatch = currentPath.match(/^\/(fr|en|es|pt|it|hu|pl)/);
          const langPrefix = langMatch ? langMatch[0] : '/fr';
          
          globalNavigateHandler(`${langPrefix}?login=true&expired=true`);
        } else {
          const currentPath = window.location.pathname;
          const langMatch = currentPath.match(/^\/(fr|en|es|pt|it|hu|pl)/);
          const langPrefix = langMatch ? langMatch[0] : '/fr';
          
          window.location.href = `${langPrefix}?login=true&expired=true`;
        }
      }
    }

    if (error.response?.status === 403) {
      const errorData = error.response.data as any;
      if (errorData?.error?.includes('CSRF') || errorData?.message?.includes('CSRF')) {
        logger.warn('[Axios] CSRF token invalid, will refresh on next request');
        resetCsrfToken();
      }
    }

    return Promise.reject(error);
  }
);

export function saveAuthToken(token: string, expiresIn?: number) {
  localStorage.setItem('auth_token', token);
  
  if (expiresIn) {
    const expirationTime = Date.now() + (expiresIn * 1000);
    localStorage.setItem('auth_token_expiration', expirationTime.toString());
  }
}

export function getStoredAuthToken(): string | null {
  const token = localStorage.getItem('auth_token');
  const expiration = localStorage.getItem('auth_token_expiration');

  if (!token) {
    return null;
  }

  if (expiration) {
    const expirationTime = parseInt(expiration, 10);
    if (Date.now() >= expirationTime) {
      clearAuthToken();
      return null;
    }
  }

  return token;
}

export function clearAuthToken() {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_token_expiration');
}

export function isTokenExpiringSoon(thresholdMinutes: number = 5): boolean {
  const expiration = localStorage.getItem('auth_token_expiration');
  if (!expiration) return false;

  const expirationTime = parseInt(expiration, 10);
  const thresholdMs = thresholdMinutes * 60 * 1000;
  
  return Date.now() >= (expirationTime - thresholdMs);
}

export { axiosInstance };
export default axiosInstance;
