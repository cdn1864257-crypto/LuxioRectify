import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { apiPost } from '@/lib/api';
import { X, Tag, Check, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ApplyCouponProps {
  customerEmail: string;
  onCouponApplied: (discountPercent: number, couponCode: string) => void;
  onCouponRemoved: () => void;
  appliedCoupon?: { code: string; discountPercent: number } | null;
  disabled?: boolean;
}

export function ApplyCoupon({ 
  customerEmail, 
  onCouponApplied, 
  onCouponRemoved,
  appliedCoupon,
  disabled = false 
}: ApplyCouponProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [couponCode, setCouponCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const handleValidateCoupon = async () => {
    if (!couponCode.trim()) return;

    setIsValidating(true);
    try {
      const response = await apiPost('/api/coupons/validate', {
        code: couponCode.trim().toUpperCase(),
        customerEmail
      });

      const data = await response.json();

      if (data.valid) {
        onCouponApplied(data.discountPercent, data.code);
        setCouponCode('');
        toast({
          title: t('couponApplied'),
          description: `${data.discountPercent}% ${t('couponDiscount')}`,
        });
      } else {
        let errorMessage = t('couponInvalid');
        if (data.error === 'expired') {
          errorMessage = t('couponExpired');
        } else if (data.error === 'already_used') {
          errorMessage = t('couponAlreadyUsed');
        }
        toast({
          title: errorMessage,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: t('couponInvalid'),
        variant: 'destructive',
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleRemoveCoupon = () => {
    onCouponRemoved();
    toast({
      title: t('removeCoupon'),
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleValidateCoupon();
    }
  };

  if (appliedCoupon) {
    return (
      <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50 border border-muted">
        <Tag className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-sm truncate" data-testid="text-applied-coupon-code">
              {appliedCoupon.code}
            </span>
            <Badge variant="secondary" className="text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30">
              <Check className="w-3 h-3 mr-1" />
              {appliedCoupon.discountPercent}% {t('couponDiscount')}
            </Badge>
          </div>
        </div>
        <Button
          size="icon"
          variant="ghost"
          onClick={handleRemoveCoupon}
          disabled={disabled}
          data-testid="button-remove-coupon"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium" htmlFor="coupon-input">
        {t('couponCode')}
      </label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="coupon-input"
            type="text"
            placeholder={t('enterCouponCode')}
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            onKeyPress={handleKeyPress}
            disabled={disabled || isValidating}
            className="pl-10"
            data-testid="input-coupon-code"
          />
        </div>
        <Button
          onClick={handleValidateCoupon}
          disabled={disabled || isValidating || !couponCode.trim()}
          data-testid="button-apply-coupon"
        >
          {isValidating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {t('validatingCoupon')}
            </>
          ) : (
            t('applyCoupon')
          )}
        </Button>
      </div>
    </div>
  );
}
