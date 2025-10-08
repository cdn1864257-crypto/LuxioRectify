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
  
  // IMPORTANT: En production, VITE_API_URL doit être configuré sur Vercel
  // pour pointer vers l'URL du backend Render (ex: https://luxio-backend.onrender.com)
  console.error('❌ ERREUR: VITE_API_URL non configuré en production!');
  console.error('Configure VITE_API_URL sur Vercel avec l\'URL de ton backend Render');
  
  // Fallback : utiliser le même domaine (ne fonctionnera PAS avec un backend séparé)
  return path;
}
