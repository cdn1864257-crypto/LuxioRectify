import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '../hooks/use-auth';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import { AuthModal } from './AuthModal';
import { LanguageSelector } from './LanguageSelector';
import { ChevronDown, Search, ShoppingCart as ShoppingCartIcon, Menu } from 'lucide-react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

interface HeaderProps {
  onToggleCart: () => void;
  onToggleProfile: () => void;
}

export function Header({ onToggleCart, onToggleProfile }: HeaderProps) {
  const { user } = useAuth();
  const { itemCount } = useCart();
  const { t } = useLanguage();
  const [location, navigate] = useLocation();
  const [authModal, setAuthModal] = useState<{ open: boolean; mode: 'login' | 'signup' }>({
    open: false,
    mode: 'login'
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    
    // If we're not on the home page, navigate to home first
    if (location !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-card border-b border-border shadow-sm" data-testid="header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Left Section: Logo + Desktop Nav */}
            <div className="flex items-center gap-4 xl:gap-6 flex-1 min-w-0">
              {/* Mobile Menu - Visible on small and medium screens (up to lg breakpoint) */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden shrink-0"
                    data-testid="button-mobile-menu"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] sm:w-[320px]">
                  <SheetHeader>
                    <SheetTitle className="text-left">Navigation</SheetTitle>
                    <SheetDescription className="text-left">
                      Accédez aux différentes sections du site
                    </SheetDescription>
                  </SheetHeader>
                  <nav className="flex flex-col gap-4 mt-6">
                    <Link 
                      href="/" 
                      className="text-base font-medium text-foreground hover:text-primary transition-colors py-2"
                      data-testid="mobile-nav-home"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Accueil
                    </Link>
                    <Link 
                      href="/premium"
                      className="text-base font-medium text-foreground hover:text-primary transition-colors py-2"
                      data-testid="mobile-nav-premium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Premium
                    </Link>
                    <button 
                      onClick={() => scrollToSection('watches')}
                      className="text-base font-medium text-foreground hover:text-primary transition-colors py-2 text-left"
                      data-testid="mobile-nav-watches"
                    >
                      {t('watches')}
                    </button>
                    <button 
                      onClick={() => scrollToSection('sneakers')}
                      className="text-base font-medium text-foreground hover:text-primary transition-colors py-2 text-left"
                      data-testid="mobile-nav-sneakers"
                    >
                      {t('sneakers')}
                    </button>
                    <button 
                      onClick={() => scrollToSection('gadgets')}
                      className="text-base font-medium text-foreground hover:text-primary transition-colors py-2 text-left"
                      data-testid="mobile-nav-gadgets"
                    >
                      {t('gadgets')}
                    </button>
                    <button 
                      onClick={() => scrollToSection('mobility')}
                      className="text-base font-medium text-foreground hover:text-primary transition-colors py-2 text-left"
                      data-testid="mobile-nav-mobility"
                    >
                      {t('mobility')}
                    </button>
                    <div className="border-t border-border pt-4 mt-2">
                      <LanguageSelector />
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>

              {/* Logo */}
              <Link href="/" className="text-xl sm:text-2xl font-bold text-primary shrink-0" data-testid="logo">
                Luxio
              </Link>

              {/* Desktop Navigation - Hidden on mobile and tablet, visible from lg breakpoint */}
              <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
                <Link 
                  href="/"
                  className="text-sm xl:text-base text-muted-foreground hover:text-primary transition-colors whitespace-nowrap"
                  data-testid="nav-home"
                >
                  Accueil
                </Link>
                <Link 
                  href="/premium"
                  className="text-sm xl:text-base text-muted-foreground hover:text-primary transition-colors whitespace-nowrap"
                  data-testid="nav-premium"
                >
                  Premium
                </Link>
                <button 
                  onClick={() => scrollToSection('watches')}
                  className="text-sm xl:text-base text-muted-foreground hover:text-primary transition-colors whitespace-nowrap"
                  data-testid="nav-watches"
                >
                  {t('watches')}
                </button>
                <button 
                  onClick={() => scrollToSection('sneakers')}
                  className="text-sm xl:text-base text-muted-foreground hover:text-primary transition-colors whitespace-nowrap"
                  data-testid="nav-sneakers"
                >
                  {t('sneakers')}
                </button>
                <button 
                  onClick={() => scrollToSection('gadgets')}
                  className="text-sm xl:text-base text-muted-foreground hover:text-primary transition-colors whitespace-nowrap"
                  data-testid="nav-gadgets"
                >
                  {t('gadgets')}
                </button>
                <button 
                  onClick={() => scrollToSection('mobility')}
                  className="text-sm xl:text-base text-muted-foreground hover:text-primary transition-colors whitespace-nowrap"
                  data-testid="nav-mobility"
                >
                  {t('mobility')}
                </button>
              </nav>
            </div>

            {/* Search Bar - Hidden on mobile/tablet, visible on large screens */}
            <div className="hidden xl:flex flex-1 max-w-md">
              <div className="relative w-full">
                <input 
                  type="text" 
                  placeholder={t('searchPlaceholder')} 
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                  data-testid="search-input"
                />
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
            
            {/* Right Section: Actions */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Language Selector - Hidden on mobile and tablet, visible from lg breakpoint */}
              <div className="hidden lg:block">
                <LanguageSelector />
              </div>
              
              {/* User Menu - Always visible */}
              {!user ? (
                <button 
                  onClick={() => setAuthModal({ open: true, mode: 'login' })}
                  className="bg-primary text-primary-foreground px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
                  data-testid="button-login"
                >
                  {t('login')}
                </button>
              ) : (
                <button
                  onClick={onToggleProfile}
                  className="flex items-center gap-2 hover:bg-muted rounded-lg px-2 sm:px-3 py-2 transition-colors"
                  data-testid="button-profile"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs sm:text-sm font-medium">
                    <span data-testid="user-initials">{user.initials}</span>
                  </div>
                  <span className="hidden lg:inline text-sm" data-testid="user-name">{user.displayName || user.email}</span>
                  <ChevronDown className="h-3 w-3 hidden lg:block" />
                </button>
              )}
              
              {/* Cart - Always visible */}
              <button 
                onClick={onToggleCart}
                className="relative p-2 hover:bg-muted rounded-full transition-colors shrink-0"
                data-testid="button-cart"
              >
                <ShoppingCartIcon className="h-5 w-5" />
                {itemCount > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
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
