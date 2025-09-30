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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" data-testid={`${type}-modal`}>
      <div className="bg-card rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold" data-testid={`${type}-title`}>{title}</h2>
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
            data-testid={`button-close-${type}`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="prose prose-sm max-w-none" data-testid={`${type}-content`}>
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
      <footer className="bg-primary text-primary-foreground py-8" data-testid="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Logo */}
            <div className="text-2xl font-bold" data-testid="footer-logo">
              Luxio
            </div>
            
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-end space-x-6">
              {legalLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() => setActiveModal(link.type)}
                  className="text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                  data-testid={`link-${link.type}`}
                >
                  {t(link.key as keyof typeof t)}
                </button>
              ))}
            </div>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-primary-foreground/20 mt-6 pt-6 text-center text-primary-foreground/60 text-sm">
            <p>&copy; 2024 Luxio. All rights reserved.</p>
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
