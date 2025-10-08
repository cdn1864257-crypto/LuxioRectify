import { useState } from 'react';
import { X } from 'lucide-react';
import { SignupForm } from './SignupForm';
import { LoginForm } from './LoginForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocation } from 'wouter';

interface AuthModalProps {
  open: boolean;
  mode: 'login' | 'signup';
  onClose: () => void;
  onSwitchMode: (mode: 'login' | 'signup') => void;
}

export function AuthModal({ open, mode, onClose, onSwitchMode }: AuthModalProps) {
  const { t } = useLanguage();
  const [, navigate] = useLocation();
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  if (!open) return null;

  const handleSuccess = () => {
    onClose();
    navigate('/dashboard');
  };

  const handleSwitchMode = () => {
    setShowForgotPassword(false);
    onSwitchMode(mode === 'login' ? 'signup' : 'login');
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
  };

  const getTitle = () => {
    if (showForgotPassword) return 'Mot de passe oublié';
    return mode === 'login' ? t('login') : t('signup');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" data-testid="auth-modal">
      <div className="bg-card rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold" data-testid="auth-title">
            {getTitle()}
          </h2>
          <button 
            onClick={() => {
              setShowForgotPassword(false);
              onClose();
            }}
            className="text-muted-foreground hover:text-foreground"
            data-testid="button-close-auth"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {showForgotPassword ? (
          <ForgotPasswordForm onBack={handleBackToLogin} />
        ) : mode === 'login' ? (
          <LoginForm 
            onSuccess={handleSuccess}
            onSwitchToSignup={handleSwitchMode}
            onForgotPassword={handleForgotPassword}
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
