import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { getApiUrl } from '@/lib/config';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  Lock
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useState } from 'react';
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
  paymentMethod: 'bank_transfer' | 'nowpayments' | 'pcs_transcash';
  status: string;
  totalAmount: number;
  createdAt: string;
  items?: any[];
  itemCount?: number;
  productInfo?: string;
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
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
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
    refetchOnWindowFocus: true, // Rafraîchir quand l'utilisateur revient sur la page
    refetchInterval: 30000, // Rafraîchir toutes les 30 secondes pour capturer les paiements NowPayments
    staleTime: 0, // Toujours considérer les données comme obsolètes pour forcer le refetch
  });

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
      nowpayments: t('nowPayments'),
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

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: t('error') || 'Erreur',
        description: t('passwordsDontMatch') || 'Les mots de passe ne correspondent pas',
        variant: "destructive"
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        title: t('error') || 'Erreur',
        description: t('passwordMinLength') || 'Le mot de passe doit contenir au moins 6 caractères',
        variant: "destructive"
      });
      return;
    }

    setPasswordLoading(true);

    try {
      const response = await fetch(getApiUrl('/api/auth/change-password'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors du changement de mot de passe');
      }

      toast({
        title: '✅ Succès',
        description: t('passwordChangeSuccess') || 'Votre mot de passe a été réinitialisé avec succès.',
      });

      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordForm(false);

    } catch (error) {
      toast({
        title: t('error') || 'Erreur',
        description: error instanceof Error ? error.message : 'Erreur lors du changement de mot de passe',
        variant: "destructive"
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
                                {t('payWithin24h')}
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
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-lg">{order.totalAmount.toFixed(2)} €</p>
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

                <Card data-testid="card-password-reset">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="h-5 w-5" />
                      {t('security') || 'Sécurité'}
                    </CardTitle>
                    <CardDescription>
                      {t('passwordResetDescription')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!showPasswordForm ? (
                      <Button
                        onClick={() => setShowPasswordForm(true)}
                        className="w-full"
                        data-testid="button-show-password-form"
                      >
                        <Lock className="h-4 w-4 mr-2" />
                        {t('changePassword') || 'Réinitialiser mon mot de passe'}
                      </Button>
                    ) : (
                      <form onSubmit={handleChangePassword} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">
                            {t('currentPassword') || 'Mot de passe actuel'}
                          </Label>
                          <Input
                            id="current-password"
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                            required
                            disabled={passwordLoading}
                            data-testid="input-current-password"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="new-password">
                            {t('newPassword') || 'Nouveau mot de passe'}
                          </Label>
                          <Input
                            id="new-password"
                            type="password"
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                            required
                            minLength={6}
                            disabled={passwordLoading}
                            data-testid="input-new-password"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">
                            {t('confirmNewPassword') || 'Confirmer le nouveau mot de passe'}
                          </Label>
                          <Input
                            id="confirm-password"
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                            required
                            minLength={6}
                            disabled={passwordLoading}
                            data-testid="input-confirm-password"
                          />
                        </div>

                        <div className="flex gap-3 pt-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setShowPasswordForm(false);
                              setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                            }}
                            disabled={passwordLoading}
                            className="flex-1"
                            data-testid="button-cancel-password"
                          >
                            {t('cancel') || 'Annuler'}
                          </Button>
                          <Button
                            type="submit"
                            disabled={passwordLoading}
                            className="flex-1"
                            data-testid="button-submit-password"
                          >
                            {passwordLoading ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                {t('processing') || 'En cours...'}
                              </>
                            ) : (
                              <>
                                {t('confirm') || 'Confirmer'}
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    )}
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
                        <span className="text-xs sm:text-sm break-all">Dépôt + {user?.firstName || 'votre nom'}</span>
                      </div>
                      <Separator />
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                        <span className="font-medium text-xs sm:text-sm">{t('uniqueOrderNumber')}:</span>
                        <span className="font-mono text-xs break-all">{instructionsModal.order.orderReference}</span>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-sm">
                      <p className="text-blue-900 dark:text-blue-100">
                        {t('bankTransferInstructionsMessage')}
                      </p>
                    </div>
                  </div>
                </>
              )}

              {instructionsModal.order.paymentMethod === 'pcs_transcash' && (
                <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                  <p className="text-green-900 dark:text-green-100 text-sm">
                    {t('ticketPaymentMessage')}
                  </p>
                </div>
              )}

              {instructionsModal.order.paymentMethod === 'nowpayments' && (
                <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                  <p className="text-purple-900 dark:text-purple-100 text-sm">
                    {t('nowpaymentsConfirmationMessage')}
                  </p>
                </div>
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
