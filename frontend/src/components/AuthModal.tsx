import { X } from 'lucide-react';
import { SignupForm } from './SignupForm';
import { LoginForm } from './LoginForm';
import { useLanguage } from '../contexts/LanguageContext';

interface AuthModalProps {
  open: boolean;
  mode: 'login' | 'signup';
  onClose: () => void;
  onSwitchMode: (mode: 'login' | 'signup') => void;
}

export function AuthModal({ open, mode, onClose, onSwitchMode }: AuthModalProps) {
  const { t } = useLanguage();

  if (!open) return null;

  const handleSuccess = () => {
    onClose();
  };

  const handleSwitchMode = () => {
    onSwitchMode(mode === 'login' ? 'signup' : 'login');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" data-testid="auth-modal">
      <div className="bg-card rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold" data-testid="auth-title">
            {mode === 'login' ? t('login') : t('signup')}
          </h2>
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
            data-testid="button-close-auth"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {mode === 'login' ? (
          <LoginForm 
            onSuccess={handleSuccess}
            onSwitchToSignup={handleSwitchMode}
          />
        ) : (
          <SignupForm 
            onSuccess={handleSuccess}
            onSwitchToLogin={handleSwitchMode}
          />
        )}
      </div>
    </div>
  );
}
