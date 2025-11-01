import { useLocation } from 'wouter';
import { XCircle, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const MESSAGES = {
  title: {
    en: 'Verification Failed',
    fr: 'Échec de la vérification',
    es: 'Verificación fallida',
    pt: 'Falha na verificação',
    it: 'Verifica fallita',
    hu: 'Az ellenőrzés sikertelen',
    pl: 'Weryfikacja nie powiodła się'
  },
  message: {
    en: 'The verification link is invalid or has already been used.',
    fr: 'Le lien de vérification est invalide ou a déjà été utilisé.',
    es: 'El enlace de verificación no es válido o ya ha sido utilizado.',
    pt: 'O link de verificação é inválido ou já foi usado.',
    it: 'Il link di verifica non è valido o è già stato utilizzato.',
    hu: 'Az ellenőrző link érvénytelen vagy már felhasználták.',
    pl: 'Link weryfikacyjny jest nieprawidłowy lub został już użyty.'
  },
  suggestion: {
    en: 'You can log in directly if your account is already active.',
    fr: 'Vous pouvez vous connecter directement si votre compte est déjà actif.',
    es: 'Puede iniciar sesión directamente si su cuenta ya está activa.',
    pt: 'Você pode fazer login diretamente se sua conta já estiver ativa.',
    it: 'Puoi accedere direttamente se il tuo account è già attivo.',
    hu: 'Közvetlenül bejelentkezhet, ha fiókja már aktív.',
    pl: 'Możesz zalogować się bezpośrednio, jeśli Twoje konto jest już aktywne.'
  },
  backButton: {
    en: 'Back to Home',
    fr: 'Retour à l\'accueil',
    es: 'Volver al inicio',
    pt: 'Voltar para o início',
    it: 'Torna alla home',
    hu: 'Vissza a főoldalra',
    pl: 'Powrót do strony głównej'
  }
};

export default function VerifyFailed() {
  const [, setLocation] = useLocation();
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-3xl shadow-2xl p-12 text-center">
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-red-100 dark:bg-red-900/50 p-6">
              <XCircle className="w-20 h-20 text-red-600 dark:text-red-400" data-testid="icon-error" />
            </div>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white" data-testid="text-title">
              {MESSAGES.title[language]}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300" data-testid="text-message">
              {MESSAGES.message[language]}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 pt-2" data-testid="text-suggestion">
              {MESSAGES.suggestion[language]}
            </p>
          </div>

          <div className="pt-4">
            <button
              onClick={() => setLocation('/')}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg"
              data-testid="button-back"
            >
              <ArrowLeft className="w-5 h-5" />
              {MESSAGES.backButton[language]}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
