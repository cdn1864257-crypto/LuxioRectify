import { useState } from 'react';
import { useAuth } from '../hooks/use-auth';
import { useLanguage } from '../hooks/use-language';
import { showToast } from './ToastNotifications';

interface AuthModalProps {
  open: boolean;
  mode: 'login' | 'signup';
  onClose: () => void;
  onSwitchMode: (mode: 'login' | 'signup') => void;
}

export function AuthModal({ open, mode, onClose, onSwitchMode }: AuthModalProps) {
  const { login, signup } = useAuth();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: ''
  });

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result;
      if (mode === 'login') {
        result = await login(formData.email, formData.password);
      } else {
        result = await signup(formData.email, formData.password, formData.fullName);
      }

      if (result.success) {
        onClose();
        setFormData({ email: '', password: '', fullName: '' });
        showToast(mode === 'login' ? 'Welcome back!' : 'Account created successfully!', 'success');
      } else {
        showToast(result.error || 'Authentication failed', 'error');
      }
    } catch (error) {
      showToast('An error occurred', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" data-testid="auth-modal">
      <div className="bg-card rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold" data-testid="auth-title">
            {mode === 'login' ? t('login') : t('signup')}
          </h2>
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
            data-testid="button-close-auth"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4" data-testid="auth-form">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium mb-2">{t('fullName')}</label>
              <input 
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                required
                data-testid="input-fullname"
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-2">{t('email')}</label>
            <input 
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              required
              data-testid="input-email"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">{t('password')}</label>
            <input 
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              required
              data-testid="input-password"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
            data-testid="button-submit-auth"
          >
            {loading ? 'Loading...' : (mode === 'login' ? t('login') : t('signup'))}
          </button>
          
          <p className="text-center text-sm text-muted-foreground">
            {mode === 'login' ? t('dontHaveAccount') : t('alreadyHaveAccount')} {' '}
            <button 
              type="button" 
              onClick={() => onSwitchMode(mode === 'login' ? 'signup' : 'login')}
              className="text-primary hover:underline"
              data-testid="button-switch-mode"
            >
              {mode === 'login' ? t('signup') : t('login')}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
