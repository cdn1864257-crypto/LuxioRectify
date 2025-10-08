import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle } from "lucide-react";
import { getApiUrl } from "@/lib/config";

interface ResetPasswordFormProps {
  token: string;
  onSuccess?: () => void;
}

export function ResetPasswordForm({ token, onSuccess }: ResetPasswordFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive"
      });
      return;
    }

    if (password.length < 8) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 8 caractères",
        variant: "destructive"
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(getApiUrl('/api/auth/reset-password'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === 'INVALID_OR_EXPIRED_TOKEN') {
          throw new Error('Le lien de réinitialisation est invalide ou expiré');
        }
        throw new Error(data.error || 'Erreur lors de la réinitialisation');
      }

      setSuccess(true);
      toast({
        title: "Mot de passe réinitialisé",
        description: "Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter.",
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
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
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
        <h3 className="text-lg font-semibold">Mot de passe réinitialisé !</h3>
        <p className="text-gray-600">
          Votre mot de passe a été modifié avec succès. Redirection en cours...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-testid="form-reset-password">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">Nouveau mot de passe</h3>
        <p className="text-gray-600 text-sm">
          Entrez votre nouveau mot de passe ci-dessous
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="new-password">Nouveau mot de passe</Label>
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
          Minimum 8 caractères
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm-new-password">Confirmer le mot de passe</Label>
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
            Réinitialisation...
          </>
        ) : (
          "Réinitialiser le mot de passe"
        )}
      </Button>
    </form>
  );
}
