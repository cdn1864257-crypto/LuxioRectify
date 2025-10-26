import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { CheckCircle2, XCircle, Loader2, Mail } from 'lucide-react';
import { getApiUrl } from '@/lib/config';

export default function VerifyEmailPage() {
  const [, setLocation] = useLocation();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'already-verified'>('loading');
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');

      if (!token) {
        setStatus('error');
        setMessage('Token de vérification manquant');
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
          if (data.alreadyVerified) {
            setStatus('already-verified');
            setMessage(data.message || 'Votre email est déjà vérifié');
          } else {
            setStatus('success');
            setMessage(data.message || 'Email vérifié avec succès !');
            if (data.user) {
              setUserName(data.user.firstName);
            }
          }
        } else {
          setStatus('error');
          setMessage(data.error || 'Erreur lors de la vérification');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Erreur de connexion au serveur');
      }
    };

    verifyEmail();
  }, []);

  const redirectToLogin = () => {
    setLocation('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
        <div className="text-center">
          {status === 'loading' && (
            <>
              <div className="flex justify-center mb-6">
                <Loader2 className="w-16 h-16 text-blue-600 dark:text-blue-400 animate-spin" data-testid="icon-loading" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4" data-testid="text-title">
                Vérification en cours...
              </h1>
              <p className="text-gray-600 dark:text-gray-300" data-testid="text-message">
                Veuillez patienter pendant que nous vérifions votre adresse email.
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="flex justify-center mb-6">
                <div className="rounded-full bg-green-100 dark:bg-green-900 p-4">
                  <CheckCircle2 className="w-16 h-16 text-green-600 dark:text-green-400" data-testid="icon-success" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4" data-testid="text-title">
                Email vérifié avec succès ! 🎉
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6" data-testid="text-message">
                {userName ? `Bienvenue ${userName} ! ` : ''}
                {message}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6" data-testid="text-welcome-email">
                <Mail className="inline w-4 h-4 mr-1" />
                Un email de bienvenue vous a été envoyé avec plus d'informations.
              </p>
              <button
                onClick={redirectToLogin}
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                data-testid="button-login"
              >
                Se connecter
              </button>
            </>
          )}

          {status === 'already-verified' && (
            <>
              <div className="flex justify-center mb-6">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-4">
                  <CheckCircle2 className="w-16 h-16 text-blue-600 dark:text-blue-400" data-testid="icon-already-verified" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4" data-testid="text-title">
                Email déjà vérifié
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6" data-testid="text-message">
                {message}
              </p>
              <button
                onClick={redirectToLogin}
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                data-testid="button-login"
              >
                Se connecter
              </button>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="flex justify-center mb-6">
                <div className="rounded-full bg-red-100 dark:bg-red-900 p-4">
                  <XCircle className="w-16 h-16 text-red-600 dark:text-red-400" data-testid="icon-error" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4" data-testid="text-title">
                Erreur de vérification
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6" data-testid="text-message">
                {message}
              </p>
              <div className="space-y-3">
                <p className="text-sm text-gray-500 dark:text-gray-400" data-testid="text-help">
                  Le lien de vérification peut avoir expiré ou être invalide. Veuillez vous inscrire à nouveau ou contacter le support.
                </p>
                <button
                  onClick={redirectToLogin}
                  className="w-full bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  data-testid="button-back"
                >
                  Retour à l'accueil
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
