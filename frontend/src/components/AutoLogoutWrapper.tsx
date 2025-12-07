import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth, IDLE_TIMEOUT } from '@/contexts/AuthContext';
import { useAutoLogout } from '@/hooks/useAutoLogout';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface AutoLogoutWrapperProps {
  children: React.ReactNode;
}

const WARNING_TIME = 5 * 60 * 1000;

const sessionMessages: Record<string, { 
  expired: string; 
  expiredDesc: string; 
  warning: string; 
  warningDesc: string;
  pleaseLogin: string;
}> = {
  fr: {
    expired: 'Session expirée',
    expiredDesc: 'Vous avez été déconnecté pour inactivité.',
    warning: 'Attention',
    warningDesc: 'Votre session va expirer dans 5 minutes.',
    pleaseLogin: 'Votre session a expiré. Veuillez vous reconnecter.',
  },
  en: {
    expired: 'Session Expired',
    expiredDesc: 'You have been logged out due to inactivity.',
    warning: 'Warning',
    warningDesc: 'Your session will expire in 5 minutes.',
    pleaseLogin: 'Your session has expired. Please log in again.',
  },
  es: {
    expired: 'Sesión expirada',
    expiredDesc: 'Ha sido desconectado por inactividad.',
    warning: 'Atención',
    warningDesc: 'Su sesión expirará en 5 minutos.',
    pleaseLogin: 'Su sesión ha expirado. Por favor, inicie sesión nuevamente.',
  },
  pt: {
    expired: 'Sessão expirada',
    expiredDesc: 'Você foi desconectado por inatividade.',
    warning: 'Atenção',
    warningDesc: 'Sua sessão expirará em 5 minutos.',
    pleaseLogin: 'Sua sessão expirou. Por favor, faça login novamente.',
  },
  it: {
    expired: 'Sessione scaduta',
    expiredDesc: 'Sei stato disconnesso per inattività.',
    warning: 'Attenzione',
    warningDesc: 'La tua sessione scadrà tra 5 minuti.',
    pleaseLogin: 'La tua sessione è scaduta. Effettua nuovamente il login.',
  },
  hu: {
    expired: 'Munkamenet lejárt',
    expiredDesc: 'Inaktivitás miatt kijelentkeztettünk.',
    warning: 'Figyelem',
    warningDesc: 'A munkamenet 5 percen belül lejár.',
    pleaseLogin: 'A munkamenet lejárt. Kérjük, jelentkezzen be újra.',
  },
  pl: {
    expired: 'Sesja wygasła',
    expiredDesc: 'Zostałeś wylogowany z powodu braku aktywności.',
    warning: 'Uwaga',
    warningDesc: 'Twoja sesja wygaśnie za 5 minut.',
    pleaseLogin: 'Twoja sesja wygasła. Zaloguj się ponownie.',
  },
};

export function AutoLogoutWrapper({ children }: AutoLogoutWrapperProps) {
  const { logout, sessionExpired, clearSessionExpired, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const { language } = useLanguage();
  const [, setLocation] = useLocation();

  const messages = sessionMessages[language] || sessionMessages.en;

  const handleAutoLogout = async () => {
    console.log('[AutoLogout] Performing auto-logout due to inactivity');
    
    toast({
      title: messages.expired,
      description: messages.expiredDesc,
      variant: 'destructive',
    });

    await logout();

    const langPrefix = `/${language}`;
    setLocation(`${langPrefix}?login=true&expired=true`);
  };

  const handleWarning = () => {
    console.log('[AutoLogout] Warning: Session will expire soon');
    
    toast({
      title: messages.warning,
      description: messages.warningDesc,
      variant: 'default',
    });
  };

  useAutoLogout({
    timeout: IDLE_TIMEOUT,
    onLogout: handleAutoLogout,
    enabled: isAuthenticated,
    warningTime: WARNING_TIME,
    onWarning: handleWarning,
  });

  useEffect(() => {
    if (sessionExpired && !isAuthenticated) {
      toast({
        title: messages.expired,
        description: messages.pleaseLogin,
        variant: 'destructive',
      });
      clearSessionExpired();
    }
  }, [sessionExpired, isAuthenticated, toast, messages, clearSessionExpired]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('expired') === 'true') {
      toast({
        title: messages.expired,
        description: messages.pleaseLogin,
        variant: 'destructive',
      });

      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('expired');
      window.history.replaceState({}, '', newUrl.toString());
    }
  }, [toast, messages]);

  return <>{children}</>;
}

export default AutoLogoutWrapper;
