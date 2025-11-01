import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const MESSAGES = {
  title: {
    en: 'Account Successfully Verified!',
    fr: 'Inscription validée avec succès !',
    es: '¡Cuenta verificada con éxito!',
    pt: 'Conta verificada com sucesso!',
    it: 'Account verificato con successo!',
    hu: 'Fiók sikeresen ellenőrizve!',
    pl: 'Konto pomyślnie zweryfikowane!'
  },
  message: {
    en: 'Your account has been activated. Welcome to Luxio!',
    fr: 'Votre compte a été activé. Bienvenue sur Luxio !',
    es: 'Su cuenta ha sido activada. ¡Bienvenido a Luxio!',
    pt: 'Sua conta foi ativada. Bem-vindo ao Luxio!',
    it: 'Il tuo account è stato attivato. Benvenuto su Luxio!',
    hu: 'Fiókja aktiválva lett. Üdvözöljük a Luxio-n!',
    pl: 'Twoje konto zostało aktywowane. Witamy w Luxio!'
  },
  redirecting: {
    en: 'Redirecting to Luxio in',
    fr: 'Redirection vers Luxio dans',
    es: 'Redirigiendo a Luxio en',
    pt: 'Redirecionando para Luxio em',
    it: 'Reindirizzamento a Luxio tra',
    hu: 'Átirányítás a Luxio-hoz',
    pl: 'Przekierowanie do Luxio za'
  },
  seconds: {
    en: 'seconds',
    fr: 'secondes',
    es: 'segundos',
    pt: 'segundos',
    it: 'secondi',
    hu: 'másodperc',
    pl: 'sekund'
  }
};

export default function VerifySuccess() {
  const [, setLocation] = useLocation();
  const { language } = useLanguage();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setLocation('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-3xl shadow-2xl p-12 text-center">
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-green-100 dark:bg-green-900/50 p-6 animate-bounce">
              <CheckCircle2 className="w-20 h-20 text-green-600 dark:text-green-400" data-testid="icon-success" />
            </div>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white" data-testid="text-title">
              {MESSAGES.title[language]}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300" data-testid="text-message">
              {MESSAGES.message[language]}
            </p>
          </div>

          <div className="pt-4">
            <p className="text-gray-500 dark:text-gray-400 text-sm" data-testid="text-countdown">
              {MESSAGES.redirecting[language]} <span className="font-bold text-green-600 dark:text-green-400">{countdown}</span> {MESSAGES.seconds[language]}...
            </p>
          </div>

          <div className="pt-4">
            <button
              onClick={() => setLocation('/')}
              className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg"
              data-testid="button-continue"
            >
              {language === 'fr' ? 'Continuer maintenant' : 
               language === 'es' ? 'Continuar ahora' : 
               language === 'pt' ? 'Continuar agora' : 
               language === 'it' ? 'Continua ora' : 
               language === 'hu' ? 'Folytatás most' : 
               language === 'pl' ? 'Kontynuuj teraz' : 
               'Continue now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
