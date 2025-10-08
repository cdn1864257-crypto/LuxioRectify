// Configuration de l'API backend
export const API_BASE_URL = import.meta.env.VITE_API_URL || '';

// Helper pour construire les URLs d'API
export function getApiUrl(path: string): string {
  // En développement, utiliser le proxy Vite (pas de préfixe)
  if (import.meta.env.DEV) {
    return path;
  }
  
  // En production, utiliser l'URL complète du backend
  if (API_BASE_URL) {
    return `${API_BASE_URL}${path}`;
  }
  
  // Fallback : utiliser le même domaine (ne fonctionnera pas avec Vercel)
  return path;
}
