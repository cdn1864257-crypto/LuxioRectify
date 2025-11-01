import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { getApiUrl } from '@/lib/config';
import { SEO } from '@/components/SEO';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useToast } from '@/hooks/use-toast';
import { deleteOrder as deleteOrderFromStorage } from '@/lib/cart';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Package, 
  ShoppingBag,
  Clock,
  CreditCard,
  Loader2,
  AlertCircle,
  CheckCircle2,
  HourglassIcon,
  Truck,
  ChevronDown,
  ChevronUp,
  Home,
  Sparkles,
  LogOut,
  XCircle,
  RefreshCw
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useState, useEffect } from 'react';
import { CartSidebar } from '@/components/CartSidebar';
import { useQuery } from '@tanstack/react-query';
import { format, differenceInMinutes, differenceInHours, differenceInDays } from 'date-fns';
import { fr, es, pt, pl, it, hu, enUS } from 'date-fns/locale';
import { useLocation } from 'wouter';

const localeMap = {
  en: enUS,
  fr: fr,
  es: es,
  pt: pt,
  pl: pl,
  it: it,
  hu: hu,
};

interface OrderStats {
  totalOrders: number;
  pendingOrders: number;
  deliveredOrders: number;
  totalSpent: number;
}

interface Order {
  orderId: string;
  orderReference: string;
  paymentMethod: 'bank_transfer' | 'oxapay' | 'pcs_transcash';
  status: string;
  totalAmount: number;
  createdAt: string;
  items?: any[];
  itemCount?: number;
  productInfo?: string;
  payLink?: string;
}

interface OrdersResponse {
  success: boolean;
  stats: OrderStats;
  orders: Order[];
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { t, language } = useLanguage();
  const [cartOpen, setCartOpen] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(true);
  const [, navigate] = useLocation();
  const [instructionsModal, setInstructionsModal] = useState<{ open: boolean; order: Order | null }>({
    open: false,
    order: null
  });
  const [cancelModal, setCancelModal] = useState<{ open: boolean; order: Order | null }>({
    open: false,
    order: null
  });
  const [cancellingOrder, setCancellingOrder] = useState(false);

  const { data: ordersData, isLoading, refetch } = useQuery<OrdersResponse>({
    queryKey: ['/api/orders'],
    enabled: !!user,
    refetchOnWindowFocus: true,
    refetchInterval: 30000,
    staleTime: 0,
  });

  useEffect(() => {
    if (user) {
      fetch(getApiUrl('/api/orders/check-status'), {
        method: 'GET',
        credentials: 'include',
      }).then(() => {
        refetch();
      }).catch((error) => {
        console.error('Error checking order status:', error);
      });
    }
  }, [user]);

  const stats = ordersData?.stats || {
    totalOrders: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    totalSpent: 0,
  };

  const orders = ordersData?.orders || [];

  const unpaidOrders = orders.filter(order => 
    order.status === 'awaiting_payment' || order.status === 'pending'
  );

  const getTimeAgo = (createdAt: string) => {
    const now = new Date();
    const created = new Date(createdAt);
    
    const minutes = differenceInMinutes(now, created);
    const hours = differenceInHours(now, created);
    const days = differenceInDays(now, created);

    if (days > 0) {
      return t('createdDaysAgo').replace('{days}', days.toString());
    } else if (hours > 0) {
      return t('createdHoursAgo').replace('{hours}', hours.toString());
    } else {
      return t('createdMinutesAgo').replace('{minutes}', Math.max(1, minutes).toString());
    }
  };

  const isOrderExpired = (order: Order): boolean => {
    const now = new Date();
    const created = new Date(order.createdAt);
    const minutesElapsed = differenceInMinutes(now, created);

    if (order.paymentMethod === 'oxapay') {
      return minutesElapsed >= 30;
    } else if (order.paymentMethod === 'bank_transfer') {
      return minutesElapsed >= 1440;
    }
    return false;
  };

  const getTimeRemaining = (order: Order) => {
    const now = new Date();
    const created = new Date(order.createdAt);
    const minutesElapsed = differenceInMinutes(now, created);

    if (order.paymentMethod === 'oxapay' && order.status === 'pending') {
      const remaining = 30 - minutesElapsed;
      if (remaining <= 0) return null;
      return {
        minutes: Math.floor(remaining),
        label: remaining < 1 ? 'Expirant...' : `${Math.floor(remaining)} min restantes`
      };
    } else if (order.paymentMethod === 'bank_transfer' && order.status === 'pending') {
      const remaining = 1440 - minutesElapsed;
      if (remaining <= 0) return null;
      const hours = Math.floor(remaining / 60);
      const mins = Math.floor(remaining % 60);
      return {
        minutes: remaining,
        label: hours > 0 ? `${hours}h ${mins}min restantes` : `${mins} min restantes`
      };
    }
    return null;
  };

  const getActionRequiredMessage = (order: Order): string => {
    const expired = isOrderExpired(order);
    
    if (expired) {
      return language === 'fr' 
        ? 'Commande expirée – paiement non reçu.' 
        : 'Order expired – payment not received.';
    }
    
    if (order.paymentMethod === 'oxapay') {
      const timeRemaining = getTimeRemaining(order);
      if (timeRemaining) {
        return language === 'fr'
          ? `Payer via OxaPay dans ${timeRemaining.label} pour confirmer votre commande.`
          : `Pay via OxaPay within ${timeRemaining.label} to confirm your order.`;
      }
      return language === 'fr'
        ? 'Commande expirée – paiement non reçu.'
        : 'Order expired – payment not received.';
    } else if (order.paymentMethod === 'bank_transfer') {
      return language === 'fr'
        ? 'Effectuez votre virement bancaire dans le délai indiqué pour confirmer votre commande.'
        : 'Complete your bank transfer within the indicated time to confirm your order.';
    }
    
    return language === 'fr'
      ? 'Payez sous 24h pour réserver le stock'
      : 'Pay within 24h to reserve stock';
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { 
      variant: 'default' | 'secondary' | 'destructive' | 'outline', 
      label: string,
      icon: React.ReactNode,
      className?: string
    }> = {
      pending: { 
        variant: 'outline', 
        label: t('awaitingPayment'),
        icon: <AlertCircle className="h-3 w-3" />,
        className: 'border-yellow-500 text-yellow-700 dark:text-yellow-400'
      },
      awaiting_payment: { 
        variant: 'outline', 
        label: t('awaitingPayment'),
        icon: <AlertCircle className="h-3 w-3" />,
        className: 'border-yellow-500 text-yellow-700 dark:text-yellow-400'
      },
      payment_review: { 
        variant: 'secondary', 
        label: t('paymentReview'),
        icon: <HourglassIcon className="h-3 w-3" />,
        className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200'
      },
      paid: { 
        variant: 'secondary', 
        label: t('processingOrder'),
        icon: <Package className="h-3 w-3" />,
        className: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
      },
      shipped: { 
        variant: 'secondary', 
        label: t('processingOrder'),
        icon: <Truck className="h-3 w-3" />,
        className: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
      },
      delivered: { 
        variant: 'default', 
        label: t('fulfilled'),
        icon: <CheckCircle2 className="h-3 w-3" />,
        className: 'bg-green-500 text-white'
      },
      completed: { 
        variant: 'default', 
        label: t('fulfilled'),
        icon: <CheckCircle2 className="h-3 w-3" />,
        className: 'bg-green-500 text-white'
      },
      success: { 
        variant: 'default', 
        label: 'Payé',
        icon: <CheckCircle2 className="h-3 w-3" />,
        className: 'bg-green-500 text-white'
      },
      expired: { 
        variant: 'destructive', 
        label: 'Expiré',
        icon: <AlertCircle className="h-3 w-3" />,
        className: 'bg-red-500 text-white'
      },
      cancelled: { 
        variant: 'outline', 
        label: 'Annulé',
        icon: <XCircle className="h-3 w-3" />,
        className: 'border-gray-500 text-gray-700 dark:text-gray-400'
      },
    };

    const statusInfo = statusMap[status] || { 
      variant: 'outline' as const, 
      label: status,
      icon: <Clock className="h-3 w-3" />
    };
    
    return (
      <Badge 
        variant={statusInfo.variant} 
        className={`flex items-center gap-1 ${statusInfo.className || ''}`}
      >
        {statusInfo.icon}
        {statusInfo.label}
      </Badge>
    );
  };

  const getPaymentMethodLabel = (method: string) => {
    const methodMap: Record<string, string> = {
      bank_transfer: t('bankTransfer'),
      nowpayments: t('oxaPay'),
      pcs_transcash: t('prepaidTickets'),
    };
    return methodMap[method] || method;
  };

  const { toast } = useToast();

  const handleCancelOrder = async (orderId: string, orderReference: string) => {
    setCancellingOrder(true);
    try {
      const { getCsrfToken } = await import('@/lib/config');
      const token = await getCsrfToken();
      
      const response = await fetch(getApiUrl(`/api/orders/${orderId}`), {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'X-CSRF-Token': token,
        },
      });

      const data = await response.json();

      if (response.ok) {
        deleteOrderFromStorage(orderReference);
        
        toast({
          title: '✅ ' + t('orderCancelledSuccess'),
        });

        refetch();
        setCancelModal({ open: false, order: null });
      } else if (response.status === 500 && data.error?.includes('MongoDB')) {
        deleteOrderFromStorage(orderReference);
        
        toast({
          title: '✅ ' + t('orderCancelledSuccess'),
        });

        refetch();
        setCancelModal({ open: false, order: null });
      } else {
        throw new Error(data.error || data.details || 'Failed to cancel order');
      }
    } catch (error) {
      toast({
        title: t('error') || 'Erreur',
        description: error instanceof Error ? error.message : 'Impossible d\'annuler la commande',
        variant: "destructive"
      });
    } finally {
      setCancellingOrder(false);
    }
  };


  if (!user) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO page="dashboard" />
      <Header onToggleCart={() => setCartOpen(!cartOpen)} />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-dashboard-greeting">
                {t('hello')}, {user.firstName} 👋
              </h1>
              <p className="text-muted-foreground">
                {t('welcomePersonalSpace')}
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/')}
                className="flex items-center gap-2 hover:bg-primary/10 hover:text-primary hover:border-primary transition-all"
                data-testid="button-quick-home"
              >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">{t('home')}</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/premium')}
                className="flex items-center gap-2 hover:bg-purple-500/10 hover:text-purple-600 hover:border-purple-500 dark:hover:text-purple-400 transition-all"
                data-testid="button-quick-premium"
              >
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">{t('premium')}</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={async () => {
                  await logout();
                  navigate('/');
                }}
                className="flex items-center gap-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive transition-all"
                data-testid="button-quick-logout"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">{t('logout')}</span>
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {unpaidOrders.length > 0 && (
                <Collapsible
                  open={actionsOpen}
                  onOpenChange={setActionsOpen}
                  className="mb-8"
                >
                  <Card 
                    className="border-yellow-500/50 bg-yellow-50 dark:bg-yellow-950/20" 
                    data-testid="card-actions-required"
                  >
                    <CollapsibleTrigger className="w-full">
                      <CardHeader className="cursor-pointer hover:bg-yellow-100/50 dark:hover:bg-yellow-900/20 transition-colors rounded-t-lg">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-3">
                            <AlertCircle className="h-5 w-5 text-yellow-900 dark:text-yellow-100" />
                            <div className="text-left">
                              <CardTitle className="text-yellow-900 dark:text-yellow-100 flex items-center gap-2">
                                {t('actionsRequired')}
                                <Badge variant="destructive" className="ml-2">
                                  {unpaidOrders.length}
                                </Badge>
                              </CardTitle>
                              <CardDescription className="text-yellow-700 dark:text-yellow-300 text-sm mt-1">
                                {unpaidOrders.length === 1 
                                  ? getActionRequiredMessage(unpaidOrders[0])
                                  : (language === 'fr' 
                                    ? 'Complétez vos paiements pour confirmer vos commandes.' 
                                    : 'Complete your payments to confirm your orders.')}
                              </CardDescription>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-yellow-900 dark:text-yellow-100">
                            {actionsOpen ? (
                              <ChevronUp className="h-5 w-5" />
                            ) : (
                              <ChevronDown className="h-5 w-5" />
                            )}
                          </div>
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <CardContent className="pt-0">
                        <div className="space-y-4">
                          {unpaidOrders.map((order) => {
                            const days = differenceInDays(new Date(), new Date(order.createdAt));
                            const isUrgent = days >= 1;
                            
                            return (
                              <div
                                key={order.orderId}
                                className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg bg-white dark:bg-gray-950 ${
                                  isUrgent ? 'border-red-300 dark:border-red-700' : 'border-gray-200 dark:border-gray-800'
                                }`}
                                data-testid={`unpaid-order-${order.orderId}`}
                              >
                                <div className="space-y-2 flex-1 mb-3 sm:mb-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <p className="font-medium text-sm">
                                      {t('orderNumber')}: {order.orderReference}
                                    </p>
                                    {getStatusBadge(order.status)}
                                    {isUrgent && (
                                      <Badge variant="destructive" className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {t('reserveStock')}
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-xs text-muted-foreground">
                                    {getPaymentMethodLabel(order.paymentMethod)} • {order.itemCount || 1} {(order.itemCount || 1) === 1 ? t('item') : t('items')}
                                  </p>
                                  {order.productInfo && (
                                    <p className="text-xs text-muted-foreground">{order.productInfo}</p>
                                  )}
                                  <p className="text-xs text-muted-foreground font-medium">
                                    {getTimeAgo(order.createdAt)}
                                  </p>
                                  <p className="text-lg font-semibold text-foreground">{order.totalAmount.toFixed(2)} €</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                  <Button 
                                    variant="default" 
                                    size="sm"
                                    className="w-full sm:w-auto"
                                    onClick={() => setInstructionsModal({ open: true, order })}
                                    data-testid={`button-instructions-${order.orderId}`}
                                  >
                                    {t('viewInstructions')}
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="w-full sm:w-auto text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                                    onClick={() => setCancelModal({ open: true, order })}
                                    data-testid={`button-cancel-${order.orderId}`}
                                  >
                                    {t('cancelOrder')}
                                  </Button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              )}

              {unpaidOrders.length === 0 && orders.length > 0 && (
                <Card 
                  className="mb-8 border-green-500/50 bg-green-50 dark:bg-green-950/20" 
                  data-testid="card-no-actions"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-900 dark:text-green-100">
                      <CheckCircle2 className="h-5 w-5" />
                      {t('noActionsRequired')}
                    </CardTitle>
                    <CardDescription className="text-green-700 dark:text-green-300">
                      {t('allOrdersPaid')}
                    </CardDescription>
                  </CardHeader>
                </Card>
              )}

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <Card className="border-primary/20 hover:border-primary/40 transition-colors" data-testid="card-total-orders">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {t('totalOrders')}
                    </CardTitle>
                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalOrders}</div>
                    <p className="text-xs text-muted-foreground">
                      {stats.totalOrders === 0 ? t('noOrdersYet') : `${stats.totalOrders} ${stats.totalOrders === 1 ? t('item') : t('items')}`}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 hover:border-primary/40 transition-colors" data-testid="card-pending-orders">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {unpaidOrders.length > 0 ? t('unpaidOrders') : t('inProgress')}
                    </CardTitle>
                    {unpaidOrders.length > 0 ? (
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                    ) : (
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {unpaidOrders.length > 0 ? unpaidOrders.length : stats.pendingOrders}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {unpaidOrders.length > 0 ? t('paymentPending') : t('ordersProcessing')}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 hover:border-primary/40 transition-colors" data-testid="card-delivered-orders">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {t('delivered')}
                    </CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.deliveredOrders}</div>
                    <p className="text-xs text-muted-foreground">
                      {t('ordersReceived')}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 hover:border-primary/40 transition-colors" data-testid="card-total-spent">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {t('totalSpent')}
                    </CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalSpent.toFixed(2)} €</div>
                    <p className="text-xs text-muted-foreground">
                      {t('totalAmount')}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2" data-testid="card-order-history">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      {t('orderHistory')}
                    </CardTitle>
                    <CardDescription>
                      {t('latestOrdersStatus')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {orders.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <Package className="h-16 w-16 text-muted-foreground/50 mb-4" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {t('noOrders')}
                        </h3>
                        <p className="text-sm text-muted-foreground max-w-sm">
                          {t('noOrdersDescription')}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <div
                            key={order.orderId}
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                            data-testid={`order-${order.orderId}`}
                          >
                            <div className="space-y-1 flex-1 mb-3 sm:mb-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="font-medium text-sm">
                                  {t('orderNumber')}: {order.orderReference}
                                </p>
                                {getStatusBadge(order.status)}
                                {(() => {
                                  const timeRemaining = getTimeRemaining(order);
                                  if (timeRemaining) {
                                    return (
                                      <Badge variant="outline" className="text-orange-600 border-orange-600">
                                        <Clock className="w-3 h-3 mr-1" />
                                        {timeRemaining.label}
                                      </Badge>
                                    );
                                  }
                                  return null;
                                })()}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {getPaymentMethodLabel(order.paymentMethod)} • {order.itemCount || 1} {(order.itemCount || 1) === 1 ? t('item') : t('items')}
                              </p>
                              {order.productInfo && (
                                <p className="text-xs text-muted-foreground">{order.productInfo}</p>
                              )}
                              <p className="text-xs text-muted-foreground">
                                {format(new Date(order.createdAt), 'PPP', { locale: localeMap[language] })} • {getTimeAgo(order.createdAt)}
                              </p>
                              {order.status === 'pending' && order.paymentMethod === 'bank_transfer' && (
                                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                                  <Clock className="w-3 h-3 inline mr-1" />
                                  Confirmation manuelle en attente
                                </p>
                              )}
                              {order.status === 'expired' && order.paymentMethod === 'oxapay' && (
                                <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                                  <AlertCircle className="w-3 h-3 inline mr-1" />
                                  Paiement expiré - Vous pouvez relancer le paiement
                                </p>
                              )}
                            </div>
                            <div className="text-right flex flex-col gap-2 items-end">
                              <p className="font-semibold text-lg">{order.totalAmount.toFixed(2)} €</p>
                              {order.status === 'expired' && order.paymentMethod === 'oxapay' && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => navigate('/payment')}
                                  data-testid={`button-retry-${order.orderId}`}
                                >
                                  <RefreshCw className="w-4 h-4 mr-1" />
                                  Relancer
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card data-testid="card-user-info">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      {t('personalInfo')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{user.displayName}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{user.email}</span>
                      </div>
                    </div>

                    {user.phone && (
                      <>
                        <Separator />
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{user.phone}</span>
                          </div>
                        </div>
                      </>
                    )}

                    {(user.address || user.city || user.country) && (
                      <>
                        <Separator />
                        <div className="space-y-1">
                          <div className="flex items-start gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div className="flex flex-col gap-0.5">
                              {user.address && <span className="text-muted-foreground">{user.address}</span>}
                              {user.city && user.country && (
                                <span className="text-muted-foreground">{user.city}, {user.country}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    <Separator />

                    <div className="pt-2">
                      <Badge variant="secondary" className="w-full justify-center">
                        {t('luxioMember')}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Instructions Modal */}
      <Dialog open={instructionsModal.open} onOpenChange={(open) => setInstructionsModal({ open, order: instructionsModal.order })}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">L</span>
              </div>
              <DialogTitle>{t('paymentInstructionsTitle')}</DialogTitle>
            </div>
          </DialogHeader>
          
          {instructionsModal.order && (
            <div className="space-y-4 py-4">
              {instructionsModal.order.paymentMethod === 'bank_transfer' && (
                <>
                  {isOrderExpired(instructionsModal.order) ? (
                    <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        <h3 className="font-semibold text-red-900 dark:text-red-100">
                          {language === 'fr' ? 'Commande expirée' : 'Order expired'}
                        </h3>
                      </div>
                      <p className="text-red-900 dark:text-red-100 text-sm">
                        {language === 'fr' 
                          ? 'Le délai de 24h pour effectuer le virement bancaire est dépassé. Cette commande a expiré et ne peut plus être validée.'
                          : 'The 24-hour period to complete the bank transfer has passed. This order has expired and can no longer be validated.'}
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3 text-sm">
                        <div className="w-full max-w-full p-3 sm:p-4 bg-muted rounded-lg space-y-2 box-border">
                          <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                            <span className="font-medium text-xs sm:text-sm">{t('beneficiary')}:</span>
                            <span className="text-xs sm:text-sm break-all">Matt Luxio</span>
                          </div>
                          <Separator />
                          <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                            <span className="font-medium text-xs sm:text-sm">IBAN:</span>
                            <span className="font-mono text-xs break-all">ES6115632626383268707364</span>
                          </div>
                          <Separator />
                          <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                            <span className="font-medium text-xs sm:text-sm">BIC:</span>
                            <span className="text-xs sm:text-sm break-all">NTSBESM1XXX</span>
                          </div>
                          <Separator />
                          <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                            <span className="font-medium text-xs sm:text-sm">{t('paymentReference')}:</span>
                            <span className="font-mono text-xs sm:text-sm break-all text-primary font-semibold">{instructionsModal.order.orderReference}</span>
                          </div>
                        </div>
                        
                        <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-sm">
                          <p className="text-blue-900 dark:text-blue-100">
                            {t('bankTransferInstructionsMessage')}
                          </p>
                        </div>
                        
                        {(() => {
                          const timeRemaining = getTimeRemaining(instructionsModal.order);
                          if (timeRemaining) {
                            return (
                              <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg text-sm">
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                  <p className="text-orange-900 dark:text-orange-100 font-medium">
                                    {language === 'fr' 
                                      ? `Temps restant : ${timeRemaining.label}`
                                      : `Time remaining: ${timeRemaining.label}`}
                                  </p>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        })()}
                      </div>
                    </>
                  )}
                </>
              )}

              {instructionsModal.order.paymentMethod === 'pcs_transcash' && (
                <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                  <p className="text-green-900 dark:text-green-100 text-sm">
                    {t('ticketPaymentMessage')}
                  </p>
                </div>
              )}

              {instructionsModal.order.paymentMethod === 'oxapay' && (
                <>
                  {isOrderExpired(instructionsModal.order) ? (
                    <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        <h3 className="font-semibold text-red-900 dark:text-red-100">
                          {language === 'fr' ? 'Commande expirée' : 'Order expired'}
                        </h3>
                      </div>
                      <p className="text-red-900 dark:text-red-100 text-sm mb-4">
                        {language === 'fr' 
                          ? 'Le délai de 30 minutes pour effectuer le paiement via OxaPay est dépassé. Cette commande a expiré.'
                          : 'The 30-minute period to complete payment via OxaPay has passed. This order has expired.'}
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                        <p className="text-purple-900 dark:text-purple-100 text-sm mb-3">
                          {language === 'fr'
                            ? 'Pour finaliser votre paiement, cliquez sur le bouton ci-dessous pour accéder à la page de paiement OxaPay.'
                            : 'To complete your payment, click the button below to access the OxaPay payment page.'}
                        </p>
                        {instructionsModal.order.payLink && (
                          <Button 
                            className="w-full"
                            onClick={() => window.open(instructionsModal.order!.payLink!, '_blank')}
                            data-testid="button-resume-oxapay"
                          >
                            <CreditCard className="h-4 w-4 mr-2" />
                            {language === 'fr' ? 'Reprendre le paiement' : 'Resume payment'}
                          </Button>
                        )}
                      </div>
                      
                      {(() => {
                        const timeRemaining = getTimeRemaining(instructionsModal.order);
                        if (timeRemaining) {
                          return (
                            <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg text-sm">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                <p className="text-orange-900 dark:text-orange-100 font-medium">
                                  {language === 'fr' 
                                    ? `Temps restant : ${timeRemaining.label}`
                                    : `Time remaining: ${timeRemaining.label}`}
                                </p>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      })()}
                    </>
                  )}
                </>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setInstructionsModal({ open: false, order: null })}
              data-testid="button-close-instructions"
            >
              {t('close') || 'Fermer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Order Confirmation Dialog */}
      <AlertDialog open={cancelModal.open} onOpenChange={(open) => setCancelModal({ open, order: cancelModal.order })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('confirmCancellation')}</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>{t('cancelOrderWarning')}</p>
              {cancelModal.order && (
                <p className="text-sm font-medium mt-3">
                  {t('orderNumber')}: {cancelModal.order.orderReference}
                </p>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-dialog-no">
              {t('cancelAction')}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => cancelModal.order && handleCancelOrder(cancelModal.order.orderId, cancelModal.order.orderReference)}
              disabled={cancellingOrder}
              className="bg-red-600 hover:bg-red-700"
              data-testid="button-cancel-dialog-yes"
            >
              {cancellingOrder ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {t('processing')}
                </>
              ) : (
                t('confirmCancellation')
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
