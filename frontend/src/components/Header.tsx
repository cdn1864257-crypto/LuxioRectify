import { useState } from 'react';
import { useAuth } from '../hooks/use-auth';
import { useCart } from '../hooks/use-cart';
import { useLanguage } from '../hooks/use-language';
import { AuthModal } from './AuthModal';
import { LanguageSelector } from './LanguageSelector';
import { showToast } from './ToastNotifications';

interface HeaderProps {
  onToggleCart: () => void;
  onToggleProfile: () => void;
}

export function Header({ onToggleCart, onToggleProfile }: HeaderProps) {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const { t } = useLanguage();
  const [authModal, setAuthModal] = useState<{ open: boolean; mode: 'login' | 'signup' }>({
    open: false,
    mode: 'login'
  });


  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-card border-b border-border shadow-sm" data-testid="header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-primary" data-testid="logo">Luxio</div>
              <nav className="hidden md:flex space-x-8">
                <button 
                  onClick={() => scrollToSection('smartphones')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="nav-smartphones"
                >
                  {t('smartphones')}
                </button>
                <button 
                  onClick={() => scrollToSection('watches')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="nav-watches"
                >
                  {t('watches')}
                </button>
                <button 
                  onClick={() => scrollToSection('sneakers')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="nav-sneakers"
                >
                  {t('sneakers')}
                </button>
                <button 
                  onClick={() => scrollToSection('gadgets')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="nav-gadgets"
                >
                  {t('gadgets')}
                </button>
                <button 
                  onClick={() => scrollToSection('mobility')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="nav-mobility"
                >
                  {t('mobility')}
                </button>
              </nav>
            </div>
            
            {/* Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <input 
                  type="text" 
                  placeholder={t('searchPlaceholder')} 
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  data-testid="search-input"
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"></i>
              </div>
            </div>
            
            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <LanguageSelector />
              
              {/* User Menu */}
              <div className="flex items-center space-x-4">
                {!user ? (
                  <div className="flex space-x-2" data-testid="auth-buttons">
                    <button 
                      onClick={() => setAuthModal({ open: true, mode: 'login' })}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      data-testid="button-login"
                    >
                      {t('login')}
                    </button>
                    <button 
                      onClick={() => setAuthModal({ open: true, mode: 'signup' })}
                      className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm hover:bg-primary/90 transition-colors"
                      data-testid="button-signup"
                    >
                      {t('signup')}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4" data-testid="user-profile">
                    <button
                      onClick={onToggleProfile}
                      className="flex items-center space-x-2 hover:bg-muted rounded-lg px-3 py-2 transition-colors"
                      data-testid="button-profile"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                        <span data-testid="user-initials">{user.initials}</span>
                      </div>
                      <span className="hidden md:inline text-sm" data-testid="user-name">{user.displayName || user.email}</span>
                      <i className="fas fa-chevron-down text-xs"></i>
                    </button>
                  </div>
                )}
              </div>
              
              {/* Cart */}
              <button 
                onClick={onToggleCart}
                className="relative p-2 hover:bg-muted rounded-full transition-colors"
                data-testid="button-cart"
              >
                <i className="fas fa-shopping-cart text-lg"></i>
                {itemCount > 0 && (
                  <span 
                    className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center cart-badge"
                    data-testid="cart-badge"
                  >
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AuthModal 
        open={authModal.open}
        mode={authModal.mode}
        onClose={() => setAuthModal(prev => ({ ...prev, open: false }))}
        onSwitchMode={(mode: 'login' | 'signup') => setAuthModal(prev => ({ ...prev, mode }))}
      />
    </>
  );
}
