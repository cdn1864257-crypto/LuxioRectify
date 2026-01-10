import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import { Copy, Check, Building2, Mail } from 'lucide-react';
import { useState } from 'react';

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bankDetails?: {
    bankName: string;
    iban: string;
    bic: string;
    reference: string;
    orderReference: string;
    amount: number;
  } | null;
}

export function PaymentModal({ open, onOpenChange, bankDetails }: PaymentModalProps) {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const [copied, setCopied] = useState(false);
  const [copiedField, setCopiedField] = useState<string>('');

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setCopiedField(field);
    setTimeout(() => {
      setCopied(false);
      setCopiedField('');
    }, 2000);
  };

  const handleAlternativePayment = (method: string) => {
    window.location.href = 'mailto:infos@luxiomarket.shop?subject=' + encodeURIComponent(`Payment via ${method}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[95vw] sm:w-[90vw] sm:max-w-[90vw] md:w-full md:max-w-2xl mx-auto max-h-[90vh] overflow-y-auto" data-testid="dialog-payment-modal">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="text-2xl sm:text-3xl font-bold text-primary">Luxio</div>
          </div>
          <DialogTitle className="text-center text-lg sm:text-xl">{t.paymentModalTitle}</DialogTitle>
          <DialogDescription className="text-center text-sm sm:text-base">
            {t.choosePaymentMethod}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Bank Transfer Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b">
              <Building2 className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">{t.paymentModalBankTransferTitle}</h3>
            </div>
            
            <p className="text-sm text-muted-foreground">
              {t.paymentModalBankInstructions}
            </p>

            {bankDetails && (
              <div className="p-4 bg-background border-2 border-muted rounded-lg space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground">{t.beneficiary || t.name}</Label>
                  <p className="font-semibold break-words" data-testid="text-bank-name">{bankDetails.bankName}</p>
                </div>
                
                <div>
                  <Label className="text-xs text-muted-foreground">IBAN</Label>
                  <div className="flex items-center gap-2">
                    <p className="font-mono font-semibold flex-1 break-all text-sm" data-testid="text-iban">{bankDetails.iban}</p>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => copyToClipboard(bankDetails.iban, 'iban')}
                      data-testid="button-copy-iban"
                    >
                      {copied && copiedField === 'iban' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label className="text-xs text-muted-foreground">BIC</Label>
                  <div className="flex items-center gap-2">
                    <p className="font-mono font-semibold flex-1 break-all text-sm" data-testid="text-bic">{bankDetails.bic}</p>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => copyToClipboard(bankDetails.bic, 'bic')}
                      data-testid="button-copy-bic"
                    >
                      {copied && copiedField === 'bic' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label className="text-xs text-muted-foreground">{t.reference || t.orderReference}</Label>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-primary break-words flex-1" data-testid="text-reference">{bankDetails.reference}</p>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => copyToClipboard(bankDetails.reference, 'reference')}
                      data-testid="button-copy-reference"
                    >
                      {copied && copiedField === 'reference' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="pt-2 border-t">
                  <Label className="text-xs text-muted-foreground">{t.amount || t.total}</Label>
                  <p className="font-bold text-2xl text-primary" data-testid="text-amount">{bankDetails.amount.toFixed(2)} €</p>
                </div>
              </div>
            )}
          </div>

          {/* Alternative Payment Methods Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b">
              <Mail className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">{t.paymentModalOtherMethodsTitle}</h3>
            </div>
            
            <p className="text-sm text-muted-foreground">
              {t.paymentModalOtherMethodsMessage}
            </p>
            
            <div className="p-3 bg-accent rounded-lg text-center">
              <a 
                href="mailto:infos@luxiomarket.shop" 
                className="text-primary hover:underline font-semibold"
                data-testid="link-contact-email"
              >
                {t.paymentModalContactEmail}
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { name: t.paypal, icon: '💳', key: 'PayPal' },
                { name: t.westernUnion, icon: '💰', key: 'Western Union' },
                { name: t.moneyGram, icon: '💵', key: 'MoneyGram' },
                { name: t.ria, icon: '🏦', key: 'Ria' }
              ].map((method) => (
                <button
                  key={method.key}
                  type="button"
                  className="p-3 border rounded-lg bg-background hover:bg-accent transition-colors text-center"
                  onClick={() => handleAlternativePayment(method.key)}
                  data-testid={`button-${method.key.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="text-2xl mb-1">{method.icon}</div>
                  <div className="text-xs font-medium">{method.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Close Button */}
          <div className="pt-4">
            <Button 
              onClick={() => onOpenChange(false)} 
              className="w-full"
              data-testid="button-close-payment-modal"
            >
              {t.close || 'Close'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
