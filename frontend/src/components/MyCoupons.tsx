import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { apiPost } from '@/lib/api';
import { Tag, Copy, Check, Clock, X, Loader2, Ticket } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Coupon {
  code: string;
  discount: number;
  expirationDate: string;
  used: boolean;
  isExpired: boolean;
  isValid: boolean;
  createdAt: string;
}

interface MyCouponsProps {
  customerEmail: string;
  className?: string;
}

export function MyCoupons({ customerEmail, className = '' }: MyCouponsProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    if (customerEmail) {
      fetchCoupons();
    }
  }, [customerEmail]);

  const fetchCoupons = async () => {
    setIsLoading(true);
    try {
      const response = await apiPost('/api/coupons/my-coupons', {
        customerEmail
      });

      const data = await response.json();

      if (data.success && data.coupons) {
        setCoupons(data.coupons);
      }
    } catch (error) {
      console.error('Error fetching coupons:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      toast({
        title: t('codeCopied'),
      });
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCouponStatus = (coupon: Coupon) => {
    if (coupon.used) {
      return {
        label: t('couponUsed'),
        variant: 'secondary' as const,
        icon: Check,
        color: 'text-muted-foreground'
      };
    }
    if (coupon.isExpired) {
      return {
        label: t('couponExpired'),
        variant: 'destructive' as const,
        icon: X,
        color: 'text-destructive'
      };
    }
    return {
      label: t('couponValid'),
      variant: 'default' as const,
      icon: Check,
      color: 'text-green-600 dark:text-green-400'
    };
  };

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ticket className="w-5 h-5" />
            {t('myCoupons')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (coupons.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ticket className="w-5 h-5" />
            {t('myCoupons')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Tag className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground font-medium">{t('noCoupons')}</p>
            <p className="text-sm text-muted-foreground mt-2">{t('noCouponsDescription')}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Ticket className="w-5 h-5" />
          {t('myCoupons')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {coupons.map((coupon) => {
            const status = getCouponStatus(coupon);
            const StatusIcon = status.icon;

            return (
              <div
                key={coupon.code}
                className={`p-4 rounded-md border ${
                  coupon.isValid 
                    ? 'bg-muted/30 border-muted' 
                    : 'bg-muted/10 border-muted/50 opacity-70'
                }`}
                data-testid={`card-coupon-${coupon.code}`}
              >
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <code 
                        className="font-mono font-semibold text-sm bg-background px-2 py-1 rounded"
                        data-testid={`text-coupon-code-${coupon.code}`}
                      >
                        {coupon.code}
                      </code>
                      <Badge variant={status.variant} className="text-xs">
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {status.label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                      <span className="font-medium text-foreground">
                        {coupon.discount}% {t('couponDiscount')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {t('couponExpires')}: {formatDate(coupon.expirationDate)}
                      </span>
                    </div>
                  </div>
                  {coupon.isValid && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopyCode(coupon.code)}
                      disabled={copiedCode === coupon.code}
                      data-testid={`button-copy-coupon-${coupon.code}`}
                    >
                      {copiedCode === coupon.code ? (
                        <>
                          <Check className="w-4 h-4 mr-1" />
                          {t('codeCopied')}
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-1" />
                          {t('copyCode')}
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
