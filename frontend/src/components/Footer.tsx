import { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'legal' | 'privacy' | 'terms' | 'contact';
}

function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  const { t } = useLanguage();
  
  if (!isOpen) return null;

  const getContent = () => {
    switch (type) {
      case 'legal':
        return { title: t('legalNoticeTitle'), content: t('legalNoticeContent') };
      case 'privacy':
        return { title: t('privacyPolicyTitle'), content: t('privacyPolicyContent') };
      case 'terms':
        return { title: t('termsOfServiceTitle'), content: t('termsOfServiceContent') };
      case 'contact':
        return { title: t('contactTitle'), content: t('contactContent') };
      default:
        return { title: '', content: '' };
    }
  };

  const { title, content } = getContent();

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" 
      data-testid={`${type}-modal`}
      role="dialog"
      aria-labelledby={`${type}-modal-title`}
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-card rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 id={`${type}-modal-title`} className="text-2xl font-bold" data-testid={`${type}-title`}>{title}</h2>
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded-md p-1"
            data-testid={`button-close-${type}`}
            aria-label={`Close ${title}`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert" data-testid={`${type}-content`}>
          <p className="text-muted-foreground leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  const { t } = useLanguage();
  const [activeModal, setActiveModal] = useState<'legal' | 'privacy' | 'terms' | 'contact' | null>(null);

  const legalLinks = [
    { key: 'legalNotice', type: 'legal' as const },
    { key: 'privacyPolicy', type: 'privacy' as const },
    { key: 'termsOfService', type: 'terms' as const },
    { key: 'contact', type: 'contact' as const }
  ];

  return (
    <>
      <footer className="bg-primary text-primary-foreground py-8" data-testid="footer" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Logo */}
            <div className="text-2xl font-bold" data-testid="footer-logo" aria-label="Luxio Market">
              Luxio
            </div>
            
            {/* Legal Links */}
            <nav className="flex flex-wrap justify-center md:justify-end gap-6" aria-label="Legal information">
              {legalLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() => setActiveModal(link.type)}
                  className="text-primary-foreground/90 hover:text-primary-foreground hover:underline transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-accent rounded px-1"
                  data-testid={`link-${link.type}`}
                  aria-label={`View ${t(link.key as keyof typeof t)}`}
                >
                  {t(link.key as keyof typeof t)}
                </button>
              ))}
            </nav>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-primary-foreground/20 mt-6 pt-6 text-center text-primary-foreground/80 text-sm">
            <p>&copy; {new Date().getFullYear()} Luxio Market. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Legal Modals */}
      {activeModal && (
        <LegalModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          type={activeModal}
        />
      )}
    </>
  );
}
