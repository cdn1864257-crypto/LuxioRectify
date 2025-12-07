import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { ResetPasswordForm } from '@/components/ResetPasswordForm';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft } from 'lucide-react';

export default function ResetPassword() {
  const [, navigate] = useLocation();
  const { t, language } = useLanguage();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenParam = params.get('token');
    if (!tokenParam) {
      navigate(`/${language}`);
    } else {
      setToken(tokenParam);
    }
  }, [navigate, language]);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4">{t('invalidResetLink')}</h2>
          <p className="text-gray-600 mb-6">
            {t('resetLinkInvalidOrExpired')}
          </p>
          <Button onClick={() => navigate(`/${language}`)} data-testid="button-back-home">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('backToHome')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Luxio</h1>
        </div>
        <ResetPasswordForm 
          token={token} 
          onSuccess={() => navigate(`/${language}`)}
        />
      </div>
    </div>
  );
}
