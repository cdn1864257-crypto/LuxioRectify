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
        throw new Error('Erreur lors de l\'envoi de l\'email');
      }

      setSubmitted(true);
      toast({
        title: "Email envoyé",
        description: "Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
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
          <h3 className="text-lg font-semibold mb-2">Vérifiez votre email</h3>
          <p className="text-gray-600 mb-4">
            Si un compte existe avec l'adresse <strong>{email}</strong>, vous recevrez un email avec des instructions pour réinitialiser votre mot de passe.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Le lien expirera dans 1 heure pour des raisons de sécurité.
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
            Retour à la connexion
          </Button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-testid="form-forgot-password">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">Mot de passe oublié ?</h3>
        <p className="text-gray-600 text-sm">
          Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
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
            Envoi en cours...
          </>
        ) : (
          "Envoyer le lien de réinitialisation"
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
          Retour à la connexion
        </Button>
      )}
    </form>
  );
}
