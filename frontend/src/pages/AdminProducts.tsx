import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { getApiUrl, fetchWithCsrf } from '@/lib/config';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageUpload } from '@/components/ImageUpload';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Package, AlertCircle } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  category: string;
  features: string[];
  variants: any[];
  hasVariants: boolean;
  available: boolean;
  createdAt?: string;
}

export default function AdminProducts() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    discount: '',
    image: '',
    category: 'smartphones',
    features: '',
    available: true
  });

  const ADMIN_EMAIL = 'replitprojet97@gmail.com';

  useEffect(() => {
    if (!user) {
      navigate('/?login=true');
      return;
    }

    // Check if user is admin
    if (user.email.toLowerCase() !== ADMIN_EMAIL) {
      toast({
        title: 'Accès refusé',
        description: 'Vous n\'avez pas les permissions nécessaires pour accéder à cette page.',
        variant: 'destructive',
      });
      navigate('/');
      return;
    }

    loadProducts();
  }, [user, navigate]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(getApiUrl('/api/products'), {
        credentials: 'include'
      });

      const data = await response.json();

      if (data.success) {
        setProducts(data.products || []);
      } else {
        toast({
          title: 'Erreur',
          description: 'Impossible de charger les produits',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error loading products:', error);
      toast({
        title: 'Erreur',
        description: 'Erreur lors du chargement des produits',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async () => {
    if (!formData.name || !formData.price || !formData.image) {
      toast({
        title: 'Champs manquants',
        description: 'Nom, prix et image sont obligatoires',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);
    try {
      const features = formData.features
        .split('\n')
        .filter(f => f.trim())
        .map(f => f.trim());

      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        discount: formData.discount ? parseInt(formData.discount) : undefined,
        image: formData.image,
        category: formData.category,
        features,
        hasVariants: false,
        variants: [],
        available: formData.available
      };

      const response = await fetchWithCsrf(getApiUrl('/api/products/create'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Succès',
          description: 'Produit créé avec succès',
        });
        setIsAddModalOpen(false);
        resetForm();
        loadProducts();
      } else {
        throw new Error(data.error || 'Erreur lors de la création');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Erreur lors de la création du produit',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpdateProduct = async () => {
    if (!selectedProduct) return;

    setIsProcessing(true);
    try {
      const features = formData.features
        .split('\n')
        .filter(f => f.trim())
        .map(f => f.trim());

      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        discount: formData.discount ? parseInt(formData.discount) : undefined,
        image: formData.image,
        category: formData.category,
        features,
        available: formData.available
      };

      const response = await fetchWithCsrf(getApiUrl(`/api/products/update?id=${selectedProduct.id}`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Succès',
          description: 'Produit mis à jour avec succès',
        });
        setIsEditModalOpen(false);
        setSelectedProduct(null);
        resetForm();
        loadProducts();
      } else {
        throw new Error(data.error || 'Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Erreur lors de la mise à jour du produit',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;

    setIsProcessing(true);
    try {
      const response = await fetchWithCsrf(getApiUrl(`/api/products/delete?id=${selectedProduct.id}`), {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Succès',
          description: 'Produit supprimé avec succès',
        });
        setIsDeleteModalOpen(false);
        setSelectedProduct(null);
        loadProducts();
      } else {
        throw new Error(data.error || 'Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Erreur lors de la suppression du produit',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || '',
      discount: product.discount?.toString() || '',
      image: product.image,
      category: product.category,
      features: product.features.join('\n'),
      available: product.available
    });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      originalPrice: '',
      discount: '',
      image: '',
      category: 'smartphones',
      features: '',
      available: true
    });
  };

  if (!user || user.email.toLowerCase() !== ADMIN_EMAIL) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header onToggleCart={() => {}} />
      
      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                <Package className="h-8 w-8" />
                Gestion des Produits
              </h1>
              <p className="text-muted-foreground mt-2">
                Gérez votre catalogue de produits Luxio Market
              </p>
            </div>
            <Button 
              onClick={() => {
                resetForm();
                setIsAddModalOpen(true);
              }}
              className="flex items-center gap-2"
              data-testid="button-add-product"
            >
              <Plus className="h-4 w-4" />
              Ajouter un produit
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Chargement des produits...</p>
            </div>
          ) : products.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">Aucun produit</p>
                <p className="text-muted-foreground mb-4">
                  Commencez par ajouter votre premier produit
                </p>
                <Button onClick={() => {
                  resetForm();
                  setIsAddModalOpen(true);
                }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un produit
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden" data-testid={`product-card-${product.id}`}>
                  <div className="aspect-square relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/400?text=No+Image';
                      }}
                    />
                    {!product.available && (
                      <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                        Indisponible
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {product.description || 'Aucune description'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-primary">
                          {product.price}€
                        </span>
                        {product.originalPrice && (
                          <>
                            <span className="text-sm text-muted-foreground line-through">
                              {product.originalPrice}€
                            </span>
                            {product.discount && (
                              <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-2 py-1 rounded">
                                -{product.discount}%
                              </span>
                            )}
                          </>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Catégorie: <span className="font-medium capitalize">{product.category}</span>
                      </div>
                      {product.features && product.features.length > 0 && (
                        <div className="text-xs text-muted-foreground">
                          {product.features.length} caractéristique(s)
                        </div>
                      )}
                      <div className="flex gap-2 pt-4">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => openEditModal(product)}
                          data-testid={`button-edit-${product.id}`}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Modifier
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => openDeleteModal(product)}
                          data-testid={`button-delete-${product.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Add Product Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="dialog-add-product">
          <DialogHeader>
            <DialogTitle>Ajouter un nouveau produit</DialogTitle>
            <DialogDescription>
              Remplissez les informations du produit ci-dessous
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nom du produit *</Label>
              <Input 
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="iPhone 17 Pro Max"
                data-testid="input-name"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Description du produit..."
                rows={3}
                data-testid="input-description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Prix (€) *</Label>
                <Input 
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="1299.99"
                  data-testid="input-price"
                />
              </div>
              <div>
                <Label htmlFor="originalPrice">Prix original (€)</Label>
                <Input 
                  id="originalPrice"
                  type="number"
                  step="0.01"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  placeholder="1599.99"
                  data-testid="input-original-price"
                />
              </div>
            </div>
            <ImageUpload
              label="Image du produit *"
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
            />
            <div>
              <Label htmlFor="category">Catégorie *</Label>
              <Select 
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger data-testid="select-category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="smartphones">Smartphones</SelectItem>
                  <SelectItem value="laptops">Laptops</SelectItem>
                  <SelectItem value="tablets">Tablets</SelectItem>
                  <SelectItem value="watches">Montres</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="features">Caractéristiques (une par ligne)</Label>
              <Textarea 
                id="features"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                placeholder="Apple A19 Pro chip&#10;6.9&quot; LTPO OLED 120Hz&#10;48MP triple camera"
                rows={4}
                data-testid="input-features"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsAddModalOpen(false)}
              disabled={isProcessing}
            >
              Annuler
            </Button>
            <Button 
              onClick={handleAddProduct}
              disabled={isProcessing}
              data-testid="button-confirm-add"
            >
              {isProcessing ? 'Ajout en cours...' : 'Ajouter'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="dialog-edit-product">
          <DialogHeader>
            <DialogTitle>Modifier le produit</DialogTitle>
            <DialogDescription>
              Modifiez les informations du produit
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Nom du produit *</Label>
              <Input 
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea 
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-price">Prix (€) *</Label>
                <Input 
                  id="edit-price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-originalPrice">Prix original (€)</Label>
                <Input 
                  id="edit-originalPrice"
                  type="number"
                  step="0.01"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                />
              </div>
            </div>
            <ImageUpload
              label="Image du produit *"
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
            />
            <div>
              <Label htmlFor="edit-category">Catégorie *</Label>
              <Select 
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="smartphones">Smartphones</SelectItem>
                  <SelectItem value="laptops">Laptops</SelectItem>
                  <SelectItem value="tablets">Tablets</SelectItem>
                  <SelectItem value="watches">Montres</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-features">Caractéristiques (une par ligne)</Label>
              <Textarea 
                id="edit-features"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsEditModalOpen(false)}
              disabled={isProcessing}
            >
              Annuler
            </Button>
            <Button 
              onClick={handleUpdateProduct}
              disabled={isProcessing}
              data-testid="button-confirm-edit"
            >
              {isProcessing ? 'Mise à jour...' : 'Mettre à jour'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent data-testid="dialog-delete-product">
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer ce produit ?
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="py-4">
              <p className="font-medium">{selectedProduct.name}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Cette action est irréversible.
              </p>
            </div>
          )}
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={isProcessing}
            >
              Annuler
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDeleteProduct}
              disabled={isProcessing}
              data-testid="button-confirm-delete"
            >
              {isProcessing ? 'Suppression...' : 'Supprimer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
