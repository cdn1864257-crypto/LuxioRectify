import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { getApiUrl } from '@/lib/config';
import { useAuth } from '@/contexts/AuthContext';

const MESSAGES: Record<string, Record<string, string>> = {
  verifying: {
    en: 'Verifying your email...',
    fr: 'Vérification de votre email...',
    es: 'Verificando su correo electrónico...',
    pt: 'Verificando seu e-mail...',
    it: 'Verifica della tua email...',
    hu: 'Az e-mail ellenőrzése...',
    pl: 'Weryfikacja e-maila...'
  },
  success: {
    en: 'Your account has been successfully verified!',
    fr: 'Votre compte a été validé avec succès !',
    es: '¡Su cuenta ha sido verificada con éxito!',
    pt: 'Sua conta foi verificada com sucesso!',
    it: 'Il tuo account è stato verificato con successo!',
    hu: 'Fiókja sikeresen ellenőrizve!',
    pl: 'Twoje konto zostało pomyślnie zweryfikowane!'
  },
  redirecting: {
    en: 'You are being redirected to your Luxio account...',
    fr: 'Vous êtes redirigé vers votre compte Luxio...',
    es: 'Está siendo redirigido a su cuenta Luxio...',
    pt: 'Você está sendo redirecionado para sua conta Luxio...',
    it: 'Verrai reindirizzato al tuo account Luxio...',
    hu: 'Átirányítás a Luxio fiókjához...',
    pl: 'Przekierowanie do konta Luxio...'
  },
  alreadyVerified: {
    en: 'Your email is already verified',
    fr: 'Votre email est déjà vérifié',
    es: 'Su correo electrónico ya está verificado',
    pt: 'Seu e-mail já está verificado',
    it: 'La tua email è già verificata',
    hu: 'Az e-mail címe már ellenőrzött',
    pl: 'Twój e-mail jest już zweryfikowany'
  },
  error: {
    en: 'Verification failed',
    fr: 'Échec de la vérification',
    es: 'Verificación fallida',
    pt: 'Falha na verificação',
    it: 'Verifica non riuscita',
    hu: 'Az ellenőrzés sikertelen',
    pl: 'Weryfikacja nie powiodła się'
  }
};

export default function VerifyEmailPage() {
  const [, setLocation] = useLocation();
  const { refreshUser } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'already-verified'>('loading');
  const [message, setMessage] = useState('');
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const verifyEmail = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');

      if (!token) {
        setStatus('error');
        setMessage('Verification token is missing');
        return;
      }

      try {
        const response = await fetch(getApiUrl('/api/auth/verify-email'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok) {
          const userLang = data.language || 'en';
          setLanguage(userLang);

          if (data.alreadyVerified) {
            setStatus('already-verified');
            setMessage(data.message || MESSAGES.alreadyVerified[userLang]);
            setTimeout(() => setLocation('/'), 3000);
          } else {
            setStatus('success');
            setMessage(data.message || MESSAGES.success[userLang]);
            
            if (data.autoLogin && data.user) {
              await refreshUser();
            }
            
            setTimeout(() => setLocation('/'), 3000);
          }
        } else {
          setStatus('error');
          setMessage(data.message || 'Verification failed');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Connection error');
      }
    };

    verifyEmail();
  }, [refreshUser, setLocation]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 text-center">
        {status === 'loading' && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <Loader2 className="w-20 h-20 text-blue-600 dark:text-blue-400 animate-spin" data-testid="icon-loading" />
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-200" data-testid="text-message">
              {MESSAGES.verifying[language]}
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 dark:bg-green-900/50 p-6">
                <CheckCircle2 className="w-20 h-20 text-green-600 dark:text-green-400" data-testid="icon-success" />
              </div>
            </div>
            <div className="space-y-3">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white" data-testid="text-title">
                {MESSAGES.success[language]}
              </h1>
              <p className="text-gray-600 dark:text-gray-300" data-testid="text-redirect">
                {MESSAGES.redirecting[language]}
              </p>
            </div>
          </div>
        )}

        {status === 'already-verified' && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/50 p-6">
                <CheckCircle2 className="w-20 h-20 text-blue-600 dark:text-blue-400" data-testid="icon-already-verified" />
              </div>
            </div>
            <div className="space-y-3">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white" data-testid="text-title">
                {MESSAGES.alreadyVerified[language]}
              </h1>
              <p className="text-gray-600 dark:text-gray-300" data-testid="text-redirect">
                {MESSAGES.redirecting[language]}
              </p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="rounded-full bg-red-100 dark:bg-red-900/50 p-6">
                <XCircle className="w-20 h-20 text-red-600 dark:text-red-400" data-testid="icon-error" />
              </div>
            </div>
            <div className="space-y-3">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white" data-testid="text-title">
                {MESSAGES.error[language]}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6" data-testid="text-message">
                {message}
              </p>
              <button
                onClick={() => setLocation('/')}
                className="mt-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
                data-testid="button-back"
              >
                {language === 'fr' ? 'Retour' : language === 'es' ? 'Volver' : language === 'pt' ? 'Voltar' : language === 'it' ? 'Torna' : language === 'hu' ? 'Vissza' : language === 'pl' ? 'Wróć' : 'Go back'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
