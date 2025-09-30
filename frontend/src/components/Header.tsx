import { useState } from 'react';
import { Link } from 'wouter';
import { useAuth } from '../hooks/use-auth';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import { AuthModal } from './AuthModal';
import { LanguageSelector } from './LanguageSelector';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

interface HeaderProps {
  onToggleCart: () => void;
  onToggleProfile: () => void;
}

export function Header({ onToggleCart, onToggleProfile }: HeaderProps) {
  const { user } = useAuth();
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
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link href="/" className="text-xl sm:text-2xl font-bold text-primary" data-testid="logo">
                Luxio
              </Link>
              <nav className="hidden md:flex space-x-4 lg:space-x-8">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button 
                      className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                      data-testid="nav-smartphones"
                    >
                      {t('smartphones')}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem asChild>
                      <button 
                        onClick={() => scrollToSection('smartphones')}
                        className="w-full text-left cursor-pointer"
                        data-testid="nav-smartphones-all"
                      >
                        {t('smartphones')}
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/premium" className="cursor-pointer" data-testid="nav-premium">
                        Premium
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
            <div className="hidden xl:flex flex-1 max-w-lg mx-4 lg:mx-8">
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
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
              {/* Language Selector */}
              <div className="hidden sm:block">
                <LanguageSelector />
              </div>
              
              {/* User Menu */}
              <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                {!user ? (
                  <button 
                    onClick={() => setAuthModal({ open: true, mode: 'login' })}
                    className="bg-primary text-primary-foreground px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm hover:bg-primary/90 transition-colors whitespace-nowrap"
                    data-testid="button-login"
                  >
                    {t('login')}
                  </button>
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
                className="relative p-1.5 sm:p-2 hover:bg-muted rounded-full transition-colors"
                data-testid="button-cart"
              >
                <i className="fas fa-shopping-cart text-base sm:text-lg"></i>
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
