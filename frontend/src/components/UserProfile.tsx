import { useState } from 'react';
import { X, ShoppingBag, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/use-auth';
import { useLanguage } from '../contexts/LanguageContext';
import { loadOrders, Order } from '../lib/cart';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserProfile({ isOpen, onClose }: UserProfileProps) {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'settings'>('profile');
  const [orders] = useState<Order[]>(loadOrders());

  if (!isOpen || !user) return null;

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" data-testid="user-profile-modal">
      <div className="bg-card rounded-lg shadow-xl max-w-4xl w-full p-6 max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Mon Compte</h2>
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
            data-testid="button-close-profile"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-6 bg-muted rounded-lg p-1">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'profile' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
            data-testid="tab-profile"
          >
            Profil
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'orders' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
            data-testid="tab-orders"
          >
            Mes Commandes
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'settings' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
            data-testid="tab-settings"
          >
            Paramètres
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6" data-testid="profile-content">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                {user.initials}
              </div>
              <div>
                <h3 className="text-xl font-semibold">{user.displayName || 'Utilisateur'}</h3>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Informations personnelles</h4>
                <div>
                  <label className="block text-sm font-medium mb-2">Nom complet</label>
                  <input 
                    type="text"
                    value={user.displayName || ''}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input 
                    type="email"
                    value={user.email || ''}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    readOnly
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold">Statistiques du compte</h4>
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{orders.length}</div>
                  <div className="text-sm text-muted-foreground">Commandes totales</div>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    €{orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">Montant total dépensé</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-4" data-testid="orders-content">
            <h3 className="text-lg font-semibold">Historique des commandes</h3>
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Aucune commande pour le moment</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.reference} className="border border-border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-semibold">Commande #{order.reference}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(order.date).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">€{order.total.toFixed(2)}</div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          order.status === 'paid' ? 'bg-green-100 text-green-800' :
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status === 'paid' ? 'Payé' : 
                           order.status === 'pending' ? 'En attente' : order.status}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>{item.name} x{item.quantity}</span>
                          <span>€{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6" data-testid="settings-content">
            <h3 className="text-lg font-semibold">Paramètres du compte</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Sécurité</h4>
                <button className="w-full md:w-auto bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                  Changer le mot de passe
                </button>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Notifications</h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-border" defaultChecked />
                    <span className="text-sm">Notifications de commande</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-border" defaultChecked />
                    <span className="text-sm">Alertes de prix</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-border" />
                    <span className="text-sm">Newsletter promotionnelle</span>
                  </label>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <button 
                  onClick={handleLogout}
                  className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md hover:bg-destructive/90 transition-colors"
                  data-testid="button-logout-profile"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('logout')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}