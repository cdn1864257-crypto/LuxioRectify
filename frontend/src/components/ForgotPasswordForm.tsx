import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2, ArrowLeft } from "lucide-react";
import { getApiUrl } from "@/lib/config";

interface ForgotPasswordFormProps {
  onBack?: () => void;
}

export function ForgotPasswordForm({ onBack }: ForgotPasswordFormProps) {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast({
        title: t('error'),
        description: t('emailRequired'),
        variant: "destructive"
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: t('error'),
        description: t('emailInvalid'),
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(getApiUrl('/api/auth/forgot-password'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        throw new Error(t('emailSendError'));
      }

      setSubmitted(true);
      toast({
        title: t('emailSent'),
        description: t('resetLinkSentDescription'),
      });
    } catch (error) {
      toast({
        title: t('error'),
        description: error instanceof Error ? error.message : t('errorOccurred'),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">{t('checkYourEmail')}</h3>
          <p className="text-gray-600 mb-4">
            {t('resetEmailSentMessage').replace('{email}', email)}
          </p>
          <p className="text-sm text-gray-500 mb-6">
            {t('resetLinkExpiry')}
          </p>
        </div>
        {onBack && (
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="w-full"
            data-testid="button-back-to-login"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('backToLogin')}
          </Button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-testid="form-forgot-password">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">{t('forgotPassword')}</h3>
        <p className="text-gray-600 text-sm">
          {t('forgotPasswordDescription')}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="forgot-email">{t('email')}</Label>
        <Input
          id="forgot-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('emailPlaceholder')}
          disabled={isLoading}
          data-testid="input-forgot-email"
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
        data-testid="button-submit-forgot"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t('sending')}
          </>
        ) : (
          t('sendResetLink')
        )}
      </Button>

      {onBack && (
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          className="w-full"
          disabled={isLoading}
          data-testid="button-cancel-forgot"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('backToLogin')}
        </Button>
      )}
    </form>
  );
}
