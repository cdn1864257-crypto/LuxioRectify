import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useSuspensionStatus } from '../hooks/useSuspensionStatus';
import { useLanguage } from '../contexts/LanguageContext';

export function SuspensionAlert() {
  const { suspensionStatus, loading } = useSuspensionStatus();
  const { t } = useLanguage();

  if (loading || !suspensionStatus || !suspensionStatus.isSuspended) {
    return null;
  }

  return (
    <Alert variant="destructive" className="mb-6" data-testid="suspension-alert">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle data-testid="suspension-alert-title">
        {t('dashboard.accountSuspended')}
      </AlertTitle>
      <AlertDescription data-testid="suspension-alert-description">
        <div className="space-y-2">
          <p>
            {t('dashboard.suspensionMessage', {
              count: suspensionStatus.unpaidOrdersCount
            })}
          </p>
          {suspensionStatus.suspendedUntilFormatted && (
            <p className="font-semibold">
              {t('dashboard.reactivationDate')}: {suspensionStatus.suspendedUntilFormatted}
            </p>
          )}
          <p className="text-sm">
            {t('dashboard.suspensionRestrictions')}
          </p>
        </div>
      </AlertDescription>
    </Alert>
  );
}
