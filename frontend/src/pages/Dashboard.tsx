import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Package, 
  ShoppingBag,
  Clock,
  CreditCard,
  Loader2
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useState } from 'react';
import { CartSidebar } from '@/components/CartSidebar';
import { UserProfile } from '@/components/UserProfile';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { fr, es, pt, pl, it, hu, enUS } from 'date-fns/locale';

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
  paymentMethod: 'bank_transfer' | 'maxelpay' | 'pcs_transcash';
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
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const [cartOpen, setCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { data: ordersData, isLoading } = useQuery<OrdersResponse>({
    queryKey: ['/api/orders', user?.email],
    enabled: !!user?.email,
  });

  const stats = ordersData?.stats || {
    totalOrders: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    totalSpent: 0,
  };

  const orders = ordersData?.orders || [];

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline', label: string }> = {
      pending: { variant: 'outline', label: t('inProgress') },
      awaiting_payment: { variant: 'outline', label: t('inProgress') },
      paid: { variant: 'secondary', label: t('inProgress') },
      shipped: { variant: 'secondary', label: t('inProgress') },
      delivered: { variant: 'default', label: t('delivered') },
      completed: { variant: 'default', label: t('delivered') },
    };

    const statusInfo = statusMap[status] || { variant: 'outline' as const, label: status };
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  const getPaymentMethodLabel = (method: string) => {
    const methodMap: Record<string, string> = {
      bank_transfer: t('bankTransfer'),
      maxelpay: t('maxelPay'),
      pcs_transcash: t('prepaidTickets'),
    };
    return methodMap[method] || method;
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header onToggleCart={() => setCartOpen(!cartOpen)} onToggleProfile={() => setProfileOpen(!profileOpen)} />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-dashboard-greeting">
              {t('hello')}, {user.firstName} 👋
            </h1>
            <p className="text-muted-foreground">
              {t('welcomePersonalSpace')}
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
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
                      {t('inProgress')}
                    </CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.pendingOrders}</div>
                    <p className="text-xs text-muted-foreground">
                      {t('ordersProcessing')}
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
                              <div className="flex items-center gap-2">
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
                                {format(new Date(order.createdAt), 'PPP', { locale: localeMap[language] })}
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
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <UserProfile isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
    </div>
  );
}
