import { useState, useEffect } from 'react';
import { getApiUrl } from '@/lib/config';

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

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
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
        phone: userData.phone,
      });

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || 'Erreur de connexion' };
    }
  };

  const signup = async (email: string, password: string, fullName: string) => {
    const [firstName, ...lastNameParts] = fullName.split(' ');
    const lastName = lastNameParts.join(' ') || firstName;

    try {
      const response = await fetch(getApiUrl('/api/auth/signup'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          country: '',
          city: '',
          address: '',
          phone: '',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Erreur lors de l\'inscription' };
      }

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || 'Erreur lors de l\'inscription' };
    }
  };

  const logout = async () => {
    try {
      await fetch(getApiUrl('/api/auth/logout'), {
        method: 'POST',
        credentials: 'include',
      });

      setUser(null);
      return { success: true };
    } catch (error: any) {
      setUser(null);
      return { success: false, error: error.message || 'Erreur lors de la déconnexion' };
    }
  };

  return {
    user,
    loading,
    login,
    signup,
    logout,
  };
}
