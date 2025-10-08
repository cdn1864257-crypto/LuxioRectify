// Configuration de l'API backend
// Backend hébergé sur Render par défaut
const DEFAULT_BACKEND_URL = 'https://luxio.onrender.com';

// VITE_API_URL peut être configuré pour override (staging, tests, etc.)
export const API_BASE_URL = import.meta.env.VITE_API_URL || DEFAULT_BACKEND_URL;

// Helper pour construire les URLs d'API
export function getApiUrl(path: string): string {
  // Si VITE_API_URL est défini, l'utiliser (pour staging/tests)
  // Sinon utiliser l'URL du backend Render par défaut
  // car le backend et le frontend sont déployés séparément
  return `${API_BASE_URL}${path}`;
}
