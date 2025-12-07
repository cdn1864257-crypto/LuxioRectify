import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useLocation } from 'wouter';
import { getApiUrl, getCsrfToken, resetCsrfToken } from '@/lib/config';
import { 
  setGlobalLogoutHandler, 
  setGlobalNavigateHandler, 
  saveAuthToken, 
  clearAuthToken,
  getStoredAuthToken 
} from '@/lib/axiosConfig';

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
  isAuthenticated: boolean;
  sessionExpired: boolean;
  clearSessionExpired: () => void;
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

const IDLE_TIMEOUT = 30 * 60 * 1000;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [, setLocation] = useLocation();

  const clearSessionExpired = useCallback(() => {
    setSessionExpired(false);
  }, []);

  const performLogout = useCallback(async (showExpiredMessage: boolean = false) => {
    try {
      await fetch(getApiUrl('/api/auth/logout'), {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Error during logout request:', error);
    }

    clearAuthToken();
    localStorage.removeItem('luxio_csrf_token');
    localStorage.removeItem('luxio_csrf_timestamp');
    sessionStorage.clear();
    
    resetCsrfToken();
    
    setUser(null);
    
    if (showExpiredMessage) {
      setSessionExpired(true);
    }
  }, []);

  const handleGlobalLogout = useCallback(() => {
    console.log('[AuthContext] Global logout triggered (401 response)');
    performLogout(true);
  }, [performLogout]);

  const handleGlobalNavigate = useCallback((path: string) => {
    console.log('[AuthContext] Global navigate to:', path);
    setLocation(path);
  }, [setLocation]);

  useEffect(() => {
    setGlobalLogoutHandler(handleGlobalLogout);
    setGlobalNavigateHandler(handleGlobalNavigate);
  }, [handleGlobalLogout, handleGlobalNavigate]);

  const checkAuth = async () => {
    try {
      let csrfInitialized = false;
      try {
        await getCsrfToken();
        console.log('CSRF token initialized successfully');
        csrfInitialized = true;
      } catch (csrfError) {
        console.error('Failed to initialize CSRF token:', csrfError);
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          await getCsrfToken(true);
          console.log('CSRF token initialized on retry');
          csrfInitialized = true;
        } catch (retryError) {
          console.error('CSRF token retry also failed:', retryError);
        }
      }

      if (!csrfInitialized) {
        console.warn('Proceeding without CSRF token - will fetch on first protected request');
      }

      const storedToken = getStoredAuthToken();
      const headers: HeadersInit = {};
      
      if (storedToken) {
        headers['Authorization'] = `Bearer ${storedToken}`;
      }

      const response = await fetch(getApiUrl('/api/auth/me'), {
        credentials: 'include',
        headers,
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

        if (data.token) {
          saveAuthToken(data.token, data.expiresIn);
        }
      } else {
        if (response.status === 401) {
          clearAuthToken();
        }
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

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

      if (data.token) {
        saveAuthToken(data.token, data.expiresIn);
        console.log('[Auth] JWT token saved, expires in:', data.expiresIn, 'seconds');
      }

      setSessionExpired(false);

      try {
        await getCsrfToken(true);
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
      console.log('Tentative d\'inscription:', { email: userData.email, firstName: userData.firstName });
      
      const response = await fetch(getApiUrl('/api/auth/signup'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData),
      });

      console.log('Réponse reçue:', response.status, response.statusText);

      const data = await response.json();
      console.log('Données:', data);

      if (!response.ok) {
        console.error('Erreur d\'inscription:', data.error);
        return { success: false, error: data.error || "Erreur lors de l'inscription" };
      }

      console.log('Inscription réussie!');
      return { success: true };
    } catch (error: any) {
      console.error('Erreur fetch inscription:', error);
      return { success: false, error: error.message || "Erreur de connexion au serveur" };
    }
  };

  const logout = async () => {
    await performLogout(false);
    return { success: true };
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      signup, 
      logout, 
      refreshUser,
      isAuthenticated,
      sessionExpired,
      clearSessionExpired
    }}>
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

export { IDLE_TIMEOUT };
