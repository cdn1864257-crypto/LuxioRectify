// Configuration de l'API backend
// En développement, utiliser le backend local sur le port 3001
// En production, utiliser l'URL du backend déployé sur Render (api.luxiomarket.shop)
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

// CSRF Token Management
let csrfToken: string | null = null;

export async function getCsrfToken(forceRefresh: boolean = false): Promise<string> {
  if (csrfToken && !forceRefresh) {
    return csrfToken;
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
    
    if (!csrfToken) {
      throw new Error('Invalid CSRF token received');
    }
    
    return csrfToken;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    throw error;
  }
}

// Reset CSRF token (useful when session changes)
export function resetCsrfToken() {
  csrfToken = null;
}

export async function fetchWithCsrf(url: string, options: RequestInit = {}): Promise<Response> {
  // Get token (will fetch if not cached)
  const token = await getCsrfToken();
  
  const headers = new Headers(options.headers || {});
  
  // Add CSRF token for state-changing methods
  if (options.method && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(options.method.toUpperCase())) {
    headers.set('X-CSRF-Token', token);
  }
  
  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include'
  });

  // If we get a CSRF error, refresh the token and retry once
  if (response.status === 403) {
    try {
      const errorData = await response.clone().json();
      if (errorData.error === 'Invalid CSRF token') {
        console.warn('CSRF token expired, refreshing...');
        
        // Force refresh the token
        const newToken = await getCsrfToken(true);
        headers.set('X-CSRF-Token', newToken);
        
        // Retry the request with new token
        return fetch(url, {
          ...options,
          headers,
          credentials: 'include'
        });
      }
    } catch (e) {
      // If we can't parse the error, just return the original response
    }
  }
  
  return response;
}
