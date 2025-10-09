// Configuration de l'API backend
// En développement, utiliser le backend local sur le port 3001
// En production, utiliser l'URL du backend déployé
const isDevelopment = import.meta.env.DEV;
const DEFAULT_BACKEND_URL = isDevelopment ? 'http://localhost:3001' : 'https://luxio.onrender.com';

// VITE_API_URL peut être configuré pour override (staging, tests, etc.)
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

export async function getCsrfToken(): Promise<string> {
  if (csrfToken) {
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

export async function fetchWithCsrf(url: string, options: RequestInit = {}): Promise<Response> {
  const token = await getCsrfToken();
  
  const headers = new Headers(options.headers || {});
  
  // Add CSRF token for state-changing methods
  if (options.method && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(options.method.toUpperCase())) {
    headers.set('X-CSRF-Token', token);
  }
  
  return fetch(url, {
    ...options,
    headers,
    credentials: 'include'
  });
}
