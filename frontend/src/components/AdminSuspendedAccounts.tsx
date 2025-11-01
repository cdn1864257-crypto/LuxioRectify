import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, UserX, CheckCircle, RefreshCw } from 'lucide-react';
import { getApiUrl, fetchWithCsrf } from '@/lib/config';
import { useToast } from '@/hooks/use-toast';

interface SuspendedAccount {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  suspendedUntil: string;
  unpaidOrdersCount: number;
  createdAt: string;
}

export function AdminSuspendedAccounts() {
  const [accounts, setAccounts] = useState<SuspendedAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [reactivating, setReactivating] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchSuspendedAccounts = async () => {
    setLoading(true);
    try {
      const response = await fetch(getApiUrl('/api/admin/suspended-accounts'), {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setAccounts(data.suspendedAccounts || []);
      } else {
        toast({
          title: 'Error',
          description: 'Failed to load suspended accounts',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Error fetching suspended accounts:', error);
      toast({
        title: 'Error',
        description: 'Network error while loading suspended accounts',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReactivate = async (email: string) => {
    setReactivating(email);
    try {
      const response = await fetchWithCsrf(getApiUrl('/api/admin/suspended-accounts'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          action: 'reactivate'
        }),
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: `Account ${email} has been reactivated`,
        });
        await fetchSuspendedAccounts();
      } else {
        const data = await response.json();
        toast({
          title: 'Error',
          description: data.error || 'Failed to reactivate account',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Error reactivating account:', error);
      toast({
        title: 'Error',
        description: 'Network error while reactivating account',
        variant: 'destructive'
      });
    } finally {
      setReactivating(null);
    }
  };

  useEffect(() => {
    fetchSuspendedAccounts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card data-testid="card-admin-suspended-accounts">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserX className="h-5 w-5" />
          Comptes Suspendus
        </CardTitle>
        <CardDescription>
          Gérez les comptes temporairement suspendus pour commandes non payées
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : accounts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-500" />
            <p>Aucun compte suspendu actuellement</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <AlertCircle className="h-4 w-4" />
              <span>{accounts.length} compte(s) suspendu(s)</span>
            </div>
            
            {accounts.map((account) => (
              <div
                key={account.id}
                className="border rounded-lg p-4 space-y-3"
                data-testid={`item-suspended-account-${account.email}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-base" data-testid="text-account-name">
                      {account.firstName} {account.lastName}
                    </h4>
                    <p className="text-sm text-muted-foreground" data-testid="text-account-email">
                      {account.email}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReactivate(account.email)}
                    disabled={reactivating === account.email}
                    data-testid={`button-reactivate-${account.email}`}
                  >
                    {reactivating === account.email ? (
                      <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <CheckCircle className="h-4 w-4 mr-2" />
                    )}
                    Réactiver
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Commandes non payées</p>
                    <p className="font-medium text-red-600" data-testid="text-unpaid-count">
                      {account.unpaidOrdersCount}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Réactivation prévue</p>
                    <p className="font-medium" data-testid="text-reactivation-date">
                      {formatDate(account.suspendedUntil)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 pt-4 border-t">
          <Button
            variant="outline"
            onClick={fetchSuspendedAccounts}
            disabled={loading}
            className="w-full"
            data-testid="button-refresh-list"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Actualiser la liste
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
