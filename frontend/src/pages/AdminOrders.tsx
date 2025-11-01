import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { getApiUrl, fetchWithCsrf } from '@/lib/config';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  Package, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  XCircle,
  RefreshCw,
  Eye,
  CheckCheck
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface AdminOrder {
  orderId: string;
  orderReference: string;
  customerEmail: string;
  customerName: string;
  totalAmount: number;
  paymentMethod: 'bank_transfer' | 'oxapay' | 'pcs_transcash';
  status: string;
  createdAt: string;
  updatedAt: string;
  cartItems: any[];
  timeRemaining: number | null;
  paidAt: string | null;
}

interface OrdersResponse {
  success: boolean;
  orders: AdminOrder[];
  total: number;
  page: number;
  totalPages: number;
}

export default function AdminOrders() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isValidateModalOpen, setIsValidateModalOpen] = useState(false);
  const [validationStatus, setValidationStatus] = useState<'success' | 'cancelled'>('success');

  const ADMIN_EMAIL = 'support@luxiomarket.shop';

  const { data: ordersData, isLoading } = useQuery<OrdersResponse>({
    queryKey: ['/api/admin/orders', statusFilter, paymentMethodFilter],
    enabled: !!user && user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase(),
  });

  const checkTimeoutsMutation = useMutation({
    mutationFn: async () => {
      const response = await fetchWithCsrf(getApiUrl('/api/admin/orders/check-timeouts'), {
        method: 'POST',
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Erreur lors de la vérification des timeouts');
      }
      return data;
    },
    onSuccess: (data) => {
      toast({
        title: 'Timeouts vérifiés',
        description: `${data.totalExpired} commande(s) expirée(s)`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/orders'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const validateOrderMutation = useMutation({
    mutationFn: async ({ orderReference, paymentMethod, newStatus }: { orderReference: string; paymentMethod: string; newStatus: string }) => {
      const response = await fetchWithCsrf(getApiUrl('/api/admin/orders/validate'), {
        method: 'POST',
        body: JSON.stringify({ orderReference, paymentMethod, newStatus }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Erreur lors de la validation');
      }
      return data;
    },
    onSuccess: () => {
      toast({
        title: 'Commande mise à jour',
        description: 'Le statut de la commande a été modifié avec succès',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/orders'] });
      setIsValidateModalOpen(false);
      setSelectedOrder(null);
    },
    onError: (error: any) => {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  if (!user) {
    navigate('/');
    return null;
  }

  if (user.email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    navigate('/');
    toast({
      title: 'Accès refusé',
      description: 'Vous n\'avez pas les permissions nécessaires',
      variant: 'destructive',
    });
    return null;
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-500" data-testid={`badge-status-success`}><CheckCircle2 className="w-3 h-3 mr-1" />Payé</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500" data-testid={`badge-status-pending`}><Clock className="w-3 h-3 mr-1" />En attente</Badge>;
      case 'expired':
        return <Badge className="bg-red-500" data-testid={`badge-status-expired`}><XCircle className="w-3 h-3 mr-1" />Expiré</Badge>;
      case 'cancelled':
        return <Badge className="bg-gray-500" data-testid={`badge-status-cancelled`}><XCircle className="w-3 h-3 mr-1" />Annulé</Badge>;
      case 'failed':
        return <Badge className="bg-red-600" data-testid={`badge-status-failed`}><AlertCircle className="w-3 h-3 mr-1" />Échoué</Badge>;
      default:
        return <Badge data-testid={`badge-status-${status}`}>{status}</Badge>;
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'bank_transfer':
        return 'Virement bancaire';
      case 'oxapay':
        return 'OxaPay (Crypto)';
      case 'pcs_transcash':
        return 'PCS/Transcash';
      default:
        return method;
    }
  };

  const formatTimeRemaining = (minutes: number | null) => {
    if (minutes === null) return null;
    
    if (minutes < 60) {
      return `${Math.floor(minutes)} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = Math.floor(minutes % 60);
      return `${hours}h ${remainingMinutes}min`;
    }
  };

  const handleValidate = () => {
    if (!selectedOrder) return;
    
    validateOrderMutation.mutate({
      orderReference: selectedOrder.orderReference,
      paymentMethod: selectedOrder.paymentMethod,
      newStatus: validationStatus,
    });
  };

  const filteredOrders = ordersData?.orders.filter(order => {
    const statusMatch = statusFilter === 'all' || order.status === statusFilter;
    const paymentMatch = paymentMethodFilter === 'all' || order.paymentMethod === paymentMethodFilter;
    return statusMatch && paymentMatch;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header onToggleCart={() => {}} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2" data-testid="heading-admin-orders">
                <Package className="w-8 h-8" />
                Gestion des Commandes
              </h1>
              <p className="text-muted-foreground mt-1">
                Administration et validation des paiements
              </p>
            </div>
            <Button
              onClick={() => checkTimeoutsMutation.mutate()}
              disabled={checkTimeoutsMutation.isPending}
              data-testid="button-check-timeouts"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${checkTimeoutsMutation.isPending ? 'animate-spin' : ''}`} />
              Vérifier les timeouts
            </Button>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Filtres</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Statut</label>
                <Select value={statusFilter} onValueChange={setStatusFilter} data-testid="select-status-filter">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="success">Payé</SelectItem>
                    <SelectItem value="expired">Expiré</SelectItem>
                    <SelectItem value="cancelled">Annulé</SelectItem>
                    <SelectItem value="failed">Échoué</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Méthode de paiement</label>
                <Select value={paymentMethodFilter} onValueChange={setPaymentMethodFilter} data-testid="select-payment-filter">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes</SelectItem>
                    <SelectItem value="bank_transfer">Virement bancaire</SelectItem>
                    <SelectItem value="oxapay">OxaPay (Crypto)</SelectItem>
                    <SelectItem value="pcs_transcash">PCS/Transcash</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {isLoading ? (
            <Card>
              <CardContent className="py-8">
                <div className="flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 animate-spin text-primary" />
                  <span className="ml-2">Chargement des commandes...</span>
                </div>
              </CardContent>
            </Card>
          ) : filteredOrders && filteredOrders.length > 0 ? (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <Card key={order.orderId} data-testid={`card-order-${order.orderReference}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg" data-testid={`text-order-ref-${order.orderReference}`}>
                            {order.orderReference}
                          </h3>
                          {getStatusBadge(order.status)}
                          {order.timeRemaining !== null && order.status === 'pending' && (
                            <Badge variant="outline" className="text-orange-600 border-orange-600">
                              <Clock className="w-3 h-3 mr-1" />
                              {formatTimeRemaining(order.timeRemaining)}
                            </Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                          <div>
                            <span className="font-medium">Client:</span> {order.customerName}
                          </div>
                          <div>
                            <span className="font-medium">Email:</span> {order.customerEmail}
                          </div>
                          <div>
                            <span className="font-medium">Montant:</span> {order.totalAmount.toFixed(2)} €
                          </div>
                          <div>
                            <span className="font-medium">Méthode:</span> {getPaymentMethodLabel(order.paymentMethod)}
                          </div>
                          <div>
                            <span className="font-medium">Créée le:</span> {format(new Date(order.createdAt), 'dd/MM/yyyy à HH:mm', { locale: fr })}
                          </div>
                          {order.paidAt && (
                            <div>
                              <span className="font-medium">Payée le:</span> {format(new Date(order.paidAt), 'dd/MM/yyyy à HH:mm', { locale: fr })}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedOrder(order);
                            setIsDetailsModalOpen(true);
                          }}
                          data-testid={`button-view-${order.orderReference}`}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Détails
                        </Button>
                        {order.status === 'pending' && (
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedOrder(order);
                              setValidationStatus('success');
                              setIsValidateModalOpen(true);
                            }}
                            data-testid={`button-validate-${order.orderReference}`}
                          >
                            <CheckCheck className="w-4 h-4 mr-1" />
                            Valider
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12">
                <div className="text-center text-muted-foreground">
                  <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Aucune commande trouvée</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="max-w-2xl" data-testid="dialog-order-details">
          <DialogHeader>
            <DialogTitle>Détails de la commande</DialogTitle>
            <DialogDescription>
              Référence: {selectedOrder?.orderReference}
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Client</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.customerName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.customerEmail}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Montant total</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.totalAmount.toFixed(2)} €</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Statut</p>
                  <div className="mt-1">{getStatusBadge(selectedOrder.status)}</div>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Articles commandés</p>
                <div className="border rounded-lg p-4 space-y-2">
                  {selectedOrder.cartItems && selectedOrder.cartItems.length > 0 ? (
                    selectedOrder.cartItems.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.name} (x{item.quantity})</span>
                        <span>{(item.price * item.quantity).toFixed(2)} €</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">Aucun article</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isValidateModalOpen} onOpenChange={setIsValidateModalOpen}>
        <DialogContent data-testid="dialog-validate-order">
          <DialogHeader>
            <DialogTitle>Valider la commande</DialogTitle>
            <DialogDescription>
              Référence: {selectedOrder?.orderReference}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Nouveau statut</label>
              <Select value={validationStatus} onValueChange={(value: any) => setValidationStatus(value)} data-testid="select-validation-status">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="success">Marquer comme payé</SelectItem>
                  <SelectItem value="cancelled">Annuler la commande</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-muted-foreground">
              {validationStatus === 'success' 
                ? 'Cette action marquera la commande comme payée et déclenchera le traitement de la livraison.' 
                : 'Cette action annulera définitivement la commande.'}
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsValidateModalOpen(false)}
              disabled={validateOrderMutation.isPending}
              data-testid="button-cancel-validation"
            >
              Annuler
            </Button>
            <Button
              onClick={handleValidate}
              disabled={validateOrderMutation.isPending}
              data-testid="button-confirm-validation"
            >
              {validateOrderMutation.isPending ? 'En cours...' : 'Confirmer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
