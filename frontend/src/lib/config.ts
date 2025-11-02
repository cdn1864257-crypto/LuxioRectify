// Configuration de l'API backend
// En développement, utiliser le backend local sur le port 3001
// En production, utiliser l'URL du backend déployé sur Render (api.luxiomarket.shop)
import { logger } from './logger';

const isDevelopment = import.meta.env.DEV;
const DEFAULT_BACKEND_URL = isDevelopment ? 'http://localhost:3001' : 'https://api.luxiomarket.shop';

// VITE_API_URL peut être configuré pour override (staging, tests, Replit, etc.)
// Valeur de production recommandée: https://api.luxiomarket.shop
export const API_BASE_URL = import.meta.env.VITE_API_URL || DEFAULT_BACKEND_URL;

// Helper pour construire les URLs d'API
export function getApiUrl(path: string): string {
  // Si VITE_API_URL est défini, l'utiliser (pour staging/tests)
  // Sinon utiliser l'URL du backend Render par défaut
  // car le backend et le frontend sont déployés séparément
  return `${API_BASE_URL}${path}`;
}

// CSRF Token Management with rotation and persistence
const CSRF_STORAGE_KEY = 'luxio_csrf_token';
const CSRF_TIMESTAMP_KEY = 'luxio_csrf_timestamp';
const CSRF_ROTATION_INTERVAL = 15 * 60 * 1000;

let csrfToken: string | null = null;
let csrfTokenTimestamp: number | null = null;

function shouldRotateToken(): boolean {
  const stored = loadTokenFromStorage();
  const timestamp = csrfTokenTimestamp || stored.timestamp;
  if (!timestamp) return true;
  return Date.now() - timestamp >= CSRF_ROTATION_INTERVAL;
}

function loadTokenFromStorage(): { token: string | null; timestamp: number | null } {
  try {
    const token = localStorage.getItem(CSRF_STORAGE_KEY);
    const timestamp = localStorage.getItem(CSRF_TIMESTAMP_KEY);
    return {
      token,
      timestamp: timestamp ? parseInt(timestamp, 10) : null
    };
  } catch (e) {
    return { token: null, timestamp: null };
  }
}

function saveTokenToStorage(token: string, timestamp: number): void {
  try {
    localStorage.setItem(CSRF_STORAGE_KEY, token);
    localStorage.setItem(CSRF_TIMESTAMP_KEY, timestamp.toString());
  } catch (e) {
    logger.warn('Failed to save CSRF token to localStorage:', e);
  }
}

function clearTokenFromStorage(): void {
  try {
    localStorage.removeItem(CSRF_STORAGE_KEY);
    localStorage.removeItem(CSRF_TIMESTAMP_KEY);
  } catch (e) {}
}

export async function getCsrfToken(forceRefresh: boolean = false): Promise<string> {
  if (!forceRefresh && csrfToken && !shouldRotateToken()) {
    return csrfToken;
  }

  const stored = loadTokenFromStorage();
  if (!forceRefresh && stored.token && stored.timestamp && !shouldRotateToken()) {
    csrfToken = stored.token;
    csrfTokenTimestamp = stored.timestamp;
    return stored.token;
  }

  try {
    const response = await fetch(getApiUrl('/api/csrf-token'), {
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch CSRF token');
    }

    const data = await response.json();
    csrfToken = data.csrfToken;
    csrfTokenTimestamp = Date.now();
    
    if (!csrfToken) {
      throw new Error('Invalid CSRF token received');
    }
    
    saveTokenToStorage(csrfToken, csrfTokenTimestamp);
    
    return csrfToken;
  } catch (error) {
    logger.error('Error fetching CSRF token:', error);
    throw error;
  }
}

export function resetCsrfToken() {
  csrfToken = null;
  csrfTokenTimestamp = null;
  clearTokenFromStorage();
}

const MAX_CSRF_RETRIES = 1;

export async function fetchWithCsrf(url: string, options: RequestInit = {}, retryCount: number = 0): Promise<Response> {
  const token = await getCsrfToken();
  
  const headers = new Headers(options.headers || {});
  
  if (options.method && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(options.method.toUpperCase())) {
    headers.set('X-CSRF-Token', token);
  }
  
  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include'
  });

  if (response.status === 403 && retryCount < MAX_CSRF_RETRIES) {
    try {
      const errorData = await response.clone().json();
      if (errorData.error === 'Invalid CSRF token' || errorData.error?.includes('CSRF')) {
        logger.warn(`CSRF token invalid, refreshing... (attempt ${retryCount + 1}/${MAX_CSRF_RETRIES})`);
        
        const newToken = await getCsrfToken(true);
        headers.set('X-CSRF-Token', newToken);
        
        return fetchWithCsrf(url, { ...options, headers }, retryCount + 1);
      }
    } catch (e) {
      logger.error('Failed to parse CSRF error response:', e);
    }
  }
  
  return response;
}
