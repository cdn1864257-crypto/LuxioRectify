import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getApiUrl, getCsrfToken, resetCsrfToken } from '@/lib/config';

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  initials: string;
  country?: string;
  city?: string;
  address?: string;
  postalCode?: string;
  phone?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (userData: SignupData) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<{ success: boolean; error?: string }>;
  refreshUser: () => Promise<void>;
}

interface SignupData {
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  address: string;
  postalCode?: string;
  phone: string;
  email: string;
  password: string;
  language?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Initialize CSRF token with retry logic
      let csrfInitialized = false;
      try {
        await getCsrfToken();
        console.log('CSRF token initialized successfully');
        csrfInitialized = true;
      } catch (csrfError) {
        console.error('Failed to initialize CSRF token:', csrfError);
        // Try one more time after a brief delay
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          await getCsrfToken(true);
          console.log('CSRF token initialized on retry');
          csrfInitialized = true;
        } catch (retryError) {
          console.error('CSRF token retry also failed:', retryError);
          // Continue anyway - CSRF will be fetched on first protected request
        }
      }

      if (!csrfInitialized) {
        console.warn('Proceeding without CSRF token - will fetch on first protected request');
      }

      const response = await fetch(getApiUrl('/api/auth/me'), {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        const userData = data.user;
        
        const displayName = `${userData.firstName} ${userData.lastName}`;
        const initials = `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase();
        
        setUser({
          id: userData.id,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          displayName,
          initials,
          country: userData.country,
          city: userData.city,
          address: userData.address,
          postalCode: userData.postalCode,
          phone: userData.phone,
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    await checkAuth();
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(getApiUrl('/api/auth/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Erreur de connexion' };
      }

      const userData = data.user;
      const displayName = `${userData.firstName} ${userData.lastName}`;
      const initials = `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase();
      
      setUser({
        id: userData.id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        displayName,
        initials,
        country: userData.country,
        city: userData.city,
        address: userData.address,
        postalCode: userData.postalCode,
        phone: userData.phone,
      });

      // Refresh CSRF token for new session
      try {
        await getCsrfToken();
        console.log('CSRF token refreshed after login');
      } catch (csrfError) {
        console.error('Failed to refresh CSRF token after login:', csrfError);
      }

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || 'Erreur de connexion' };
    }
  };

  const signup = async (userData: SignupData) => {
    try {
      console.log('🚀 Tentative d\'inscription:', { email: userData.email, firstName: userData.firstName });
      
      const response = await fetch(getApiUrl('/api/auth/signup'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData),
      });

      console.log('📡 Réponse reçue:', response.status, response.statusText);

      const data = await response.json();
      console.log('📦 Données:', data);

      if (!response.ok) {
        console.error('❌ Erreur d\'inscription:', data.error);
        return { success: false, error: data.error || "Erreur lors de l'inscription" };
      }

      console.log('✅ Inscription réussie!');
      return { success: true };
    } catch (error: any) {
      console.error('❌ Erreur fetch inscription:', error);
      return { success: false, error: error.message || "Erreur de connexion au serveur" };
    }
  };

  const logout = async () => {
    try {
      await fetch(getApiUrl('/api/auth/logout'), {
        method: 'POST',
        credentials: 'include',
      });

      // Vider le cache local et session storage
      localStorage.clear();
      sessionStorage.clear();
      
      // Reset CSRF token since session is destroyed
      resetCsrfToken();
      
      setUser(null);
      return { success: true };
    } catch (error: any) {
      // Vider le cache même en cas d'erreur
      localStorage.clear();
      sessionStorage.clear();
      
      // Reset CSRF token
      resetCsrfToken();
      
      setUser(null);
      return { success: false, error: error.message || 'Erreur lors de la déconnexion' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
