import { AlertCircle, XCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useLanguage } from '../contexts/LanguageContext';

interface SuspensionWarningProps {
  suspendedUntilFormatted?: string;
  unpaidOrdersCount: number;
  variant?: 'warning' | 'error';
}

const translations = {
  fr: {
    title: 'Compte temporairement suspendu',
    message: 'Votre compte est temporairement suspendu suite à plusieurs commandes non payées.',
    reactivation: 'Réactivation automatique prévue le',
    unpaidOrders: 'commandes non payées sur les 30 derniers jours',
    restrictions: 'Vous pouvez consulter vos commandes mais pas en passer de nouvelles.',
    contact: 'Si vous pensez qu\'il s\'agit d\'une erreur, contactez notre service client.'
  },
  en: {
    title: 'Account Temporarily Suspended',
    message: 'Your account has been temporarily suspended due to multiple unpaid orders.',
    reactivation: 'Automatic reactivation scheduled for',
    unpaidOrders: 'unpaid orders in the last 30 days',
    restrictions: 'You can view your orders but cannot place new ones.',
    contact: 'If you believe this is an error, please contact our customer service.'
  },
  es: {
    title: 'Cuenta Temporalmente Suspendida',
    message: 'Su cuenta ha sido temporalmente suspendida debido a múltiples pedidos no pagados.',
    reactivation: 'Reactivación automática prevista para el',
    unpaidOrders: 'pedidos no pagados en los últimos 30 días',
    restrictions: 'Puede consultar sus pedidos pero no realizar nuevos.',
    contact: 'Si cree que esto es un error, contacte nuestro servicio al cliente.'
  },
  pt: {
    title: 'Conta Temporariamente Suspensa',
    message: 'Sua conta foi temporariamente suspensa devido a vários pedidos não pagos.',
    reactivation: 'Reativação automática prevista para',
    unpaidOrders: 'pedidos não pagos nos últimos 30 dias',
    restrictions: 'Você pode visualizar seus pedidos mas não fazer novos.',
    contact: 'Se você acha que isso é um erro, entre em contato com nosso atendimento.'
  },
  pl: {
    title: 'Konto Tymczasowo Zawieszone',
    message: 'Twoje konto zostało tymczasowo zawieszone z powodu wielu niezapłaconych zamówień.',
    reactivation: 'Automatyczna reaktywacja zaplanowana na',
    unpaidOrders: 'niezapłaconych zamówień w ciągu ostatnich 30 dni',
    restrictions: 'Możesz przeglądać zamówienia ale nie składać nowych.',
    contact: 'Jeśli uważasz, że to błąd, skontaktuj się z obsługą klienta.'
  },
  hu: {
    title: 'Fiók Ideiglenesen Felfüggesztve',
    message: 'Fiókja ideiglenesen fel van függesztve több fizetetlen rendelés miatt.',
    reactivation: 'Automatikus újraaktiválás tervezve',
    unpaidOrders: 'fizetetlen rendelés az elmúlt 30 napban',
    restrictions: 'Megtekintheti rendeléseit, de nem adhat le újakat.',
    contact: 'Ha úgy gondolja, hogy ez hiba, lépjen kapcsolatba ügyfélszolgálatunkkal.'
  }
};

export function SuspensionWarning({ suspendedUntilFormatted, unpaidOrdersCount, variant = 'error' }: SuspensionWarningProps) {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <Alert variant="destructive" className="border-red-500 bg-red-50 dark:bg-red-950" data-testid="alert-suspension">
      <div className="flex items-start gap-3">
        {variant === 'error' ? (
          <XCircle className="h-5 w-5 text-red-600" data-testid="icon-error" />
        ) : (
          <AlertCircle className="h-5 w-5 text-red-600" data-testid="icon-warning" />
        )}
        <div className="flex-1">
          <AlertTitle className="text-red-900 dark:text-red-100 font-semibold mb-2" data-testid="text-title">
            ⚠️ {t.title}
          </AlertTitle>
          <AlertDescription className="text-red-800 dark:text-red-200 space-y-2" data-testid="text-description">
            <p>{t.message}</p>
            
            <div className="bg-red-100 dark:bg-red-900 p-3 rounded-md border border-red-200 dark:border-red-800">
              <p className="font-medium text-red-900 dark:text-red-100">
                {unpaidOrdersCount} {t.unpaidOrders}
              </p>
              {suspendedUntilFormatted && (
                <p className="mt-1 text-red-800 dark:text-red-200">
                  {t.reactivation}: <strong>{suspendedUntilFormatted}</strong>
                </p>
              )}
            </div>
            
            <p className="text-sm">{t.restrictions}</p>
            <p className="text-sm italic">{t.contact}</p>
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
}
