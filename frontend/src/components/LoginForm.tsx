import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2 } from "lucide-react";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSuccess?: (user: any) => void;
  onSwitchToSignup?: () => void;
}

export function LoginForm({ onSuccess, onSwitchToSignup }: LoginFormProps) {
  const { toast } = useToast();
  const { login, user } = useAuth();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof LoginFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof LoginFormData, string>> = {};

    if (!formData.email.trim()) {
      newErrors.email = t('emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('emailInvalid');
    }

    if (!formData.password) {
      newErrors.password = t('passwordRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(formData.email, formData.password);

      if (!result.success) {
        throw new Error(result.error || t('loginError'));
      }

      toast({
        title: t('loginSuccess'),
        description: user ? `${t('welcomeBack')} ${user.firstName}!` : t('welcomeBack'),
      });

      setFormData({
        email: "",
        password: ""
      });

      if (onSuccess) {
        onSuccess(user);
      }

    } catch (error) {
      toast({
        title: t('loginError'),
        description: error instanceof Error ? error.message : t('loginError'),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-testid="form-login">
      <div className="space-y-2">
        <Label htmlFor="login-email">{t('email')}</Label>
        <Input
          id="login-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t('emailPlaceholder')}
          disabled={isLoading}
          data-testid="input-login-email"
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="login-password">{t('password')}</Label>
        <Input
          id="login-password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          disabled={isLoading}
          data-testid="input-login-password"
          className={errors.password ? "border-red-500" : ""}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
        data-testid="button-submit-login"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t('loggingIn')}
          </>
        ) : (
          t('login')
        )}
      </Button>

      {onSwitchToSignup && (
        <div className="text-center text-sm">
          <span className="text-gray-600">{t('dontHaveAccount')} </span>
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="text-blue-600 hover:underline font-medium"
            disabled={isLoading}
            data-testid="button-switch-signup"
          >
            {t('signup')}
          </button>
        </div>
      )}
    </form>
  );
}
