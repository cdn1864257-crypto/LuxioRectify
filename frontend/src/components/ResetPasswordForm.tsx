import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2, CheckCircle } from "lucide-react";
import { getApiUrl } from "@/lib/config";

interface ResetPasswordFormProps {
  token: string;
  onSuccess?: () => void;
}

export function ResetPasswordForm({ token, onSuccess }: ResetPasswordFormProps) {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast({
        title: t('error'),
        description: t('fillAllFieldsError'),
        variant: "destructive"
      });
      return;
    }

    if (password.length < 8) {
      toast({
        title: t('error'),
        description: t('passwordMinLength8'),
        variant: "destructive"
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: t('error'),
        description: t('passwordsDontMatch'),
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(getApiUrl('/api/auth/reset-password'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ token, password })
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === 'INVALID_OR_EXPIRED_TOKEN') {
          throw new Error(t('resetLinkInvalidOrExpired'));
        }
        throw new Error(data.error || t('errorOccurred'));
      }

      setSuccess(true);
      toast({
        title: t('passwordResetSuccess'),
        description: t('passwordResetSuccessMessage'),
      });

      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        } else {
          window.location.href = '/';
        }
      }, 2000);

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

  if (success) {
    return (
      <div className="text-center space-y-4">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
        <h3 className="text-lg font-semibold">{t('passwordResetSuccess')}</h3>
        <p className="text-gray-600">
          {t('passwordResetSuccessMessage')}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-testid="form-reset-password">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">{t('newPassword')}</h3>
        <p className="text-gray-600 text-sm">
          {t('enterNewPasswordBelow')}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="new-password">{t('newPassword')}</Label>
        <Input
          id="new-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          disabled={isLoading}
          data-testid="input-new-password"
        />
        <p className="text-xs text-gray-500">
          {t('passwordMinLength8')}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm-new-password">{t('confirmNewPassword')}</Label>
        <Input
          id="confirm-new-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          disabled={isLoading}
          data-testid="input-confirm-new-password"
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
        data-testid="button-submit-reset"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t('resettingPassword')}
          </>
        ) : (
          t('resetPasswordButton')
        )}
      </Button>
    </form>
  );
}
