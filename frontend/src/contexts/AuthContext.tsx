import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  phone: string;
  email: string;
  password: string;
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
      const response = await fetch('/api/auth/me', {
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
      const response = await fetch('/api/auth/login', {
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
        phone: userData.phone,
      });

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || 'Erreur de connexion' };
    }
  };

  const signup = async (userData: SignupData) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || "Erreur lors de l'inscription" };
      }

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || "Erreur lors de l'inscription" };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      // Vider le cache local et session storage
      localStorage.clear();
      sessionStorage.clear();
      
      setUser(null);
      return { success: true };
    } catch (error: any) {
      // Vider le cache même en cas d'erreur
      localStorage.clear();
      sessionStorage.clear();
      
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
