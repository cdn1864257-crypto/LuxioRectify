import { useState, useEffect } from 'react';
import { useParams, Link } from 'wouter';
import { ShoppingCart, Check, ArrowLeft, Heart, Share2, Shield, Truck, RotateCcw } from 'lucide-react';
import { ProductVariant } from '../lib/products';
import { useProducts } from '../hooks/use-products';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import { showToast } from '../components/ToastNotifications';
import { LazyImage } from '../components/LazyImage';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CartSidebar } from '../components/CartSidebar';
import { SEO } from '../components/SEO';
import { ProductSchema, BreadcrumbSchema } from '../components/StructuredData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const { t, language } = useLanguage();
  const [cartOpen, setCartOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = products.find(p => p.id === params.id);

  useEffect(() => {
    if (product?.hasVariants && product.variants && !selectedVariant) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product, selectedVariant]);

  useEffect(() => {
    if (product) {
      const wishlist = JSON.parse(localStorage.getItem('luxio_wishlist') || '[]');
      setIsWishlisted(wishlist.includes(product.id));
    }
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header onToggleCart={() => setCartOpen(!cartOpen)} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">{t('loadingProducts')}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header onToggleCart={() => setCartOpen(!cartOpen)} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">{t('productNotFound')}</h1>
            <Link href={`/${language}/premium`}>
              <Button>{t('backToProducts')}</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentOriginalPrice = selectedVariant ? selectedVariant.originalPrice : product.originalPrice;
  const currentDiscount = currentOriginalPrice && currentPrice 
    ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)
    : product.discount;
  const currentImage = selectedVariant?.image || product.image;

  const colors = product.variants 
    ? [...new Set(product.variants.map(v => v.color))] 
    : [];
  
  const capacities = product.variants && selectedVariant
    ? [...new Set(product.variants.filter(v => v.color === selectedVariant.color).map(v => v.capacity))]
    : [];

  const handleAddToCart = () => {
    const productToAdd = selectedVariant
      ? {
          ...product,
          price: selectedVariant.price,
          originalPrice: selectedVariant.originalPrice,
          discount: currentDiscount,
          image: selectedVariant.image || product.image,
          description: `${selectedVariant.capacity}, ${selectedVariant.color}`,
        }
      : product;
    
    addToCart(productToAdd);
    showToast(`${product.name} ${selectedVariant ? `(${selectedVariant.color})` : ''} - ${t('itemAddedToCart')}`, 'success');
    
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleColorSelect = (color: string) => {
    let variant = product.variants?.find(v => v.color === color && v.capacity === selectedVariant?.capacity);
    if (!variant) {
      variant = product.variants?.find(v => v.color === color);
    }
    if (variant) setSelectedVariant(variant);
  };

  const handleCapacitySelect = (capacity: string) => {
    const variant = product.variants?.find(v => v.capacity === capacity && v.color === selectedVariant?.color);
    if (variant) setSelectedVariant(variant);
  };

  const handleToggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('luxio_wishlist') || '[]');
    if (isWishlisted) {
      const newWishlist = wishlist.filter((id: string) => id !== product.id);
      localStorage.setItem('luxio_wishlist', JSON.stringify(newWishlist));
      setIsWishlisted(false);
      showToast(t('removedFromWishlist'), 'info');
    } else {
      wishlist.push(product.id);
      localStorage.setItem('luxio_wishlist', JSON.stringify(wishlist));
      setIsWishlisted(true);
      showToast(t('addedToWishlist'), 'success');
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: url,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      await navigator.clipboard.writeText(url);
      showToast(t('linkCopied'), 'success');
    }
  };

  const breadcrumbItems = [
    { name: 'Luxio', url: `https://luxiomarket.shop/${language}` },
    { name: t('products'), url: `https://luxiomarket.shop/${language}/premium` },
    { name: product.name, url: `https://luxiomarket.shop/${language}/product/${product.id}` }
  ];

  const categoryTranslations: Record<string, string> = {
    smartphones: t('smartphones'),
    watches: t('watches'),
    gadgets: t('gadgets'),
    sneakers: t('sneakers'),
    mobility: t('mobility'),
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO 
        title={`${product.name} | Luxio`}
        description={product.description}
        productSchema={{
          name: product.name,
          price: currentPrice,
          originalPrice: currentOriginalPrice,
          category: product.category,
          image: currentImage,
        }}
      />
      <ProductSchema product={product} language={language} />
      <BreadcrumbSchema items={breadcrumbItems} />
      
      <Header onToggleCart={() => setCartOpen(!cartOpen)} />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-6">
            <Link href={`/${language}/premium`}>
              <Button variant="ghost" className="gap-2" data-testid="button-back-to-products">
                <ArrowLeft className="h-4 w-4" />
                {t('backToProducts')}
              </Button>
            </Link>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                <LazyImage 
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  data-testid={`product-image-${product.id}`}
                />
                {currentDiscount && (
                  <Badge className="absolute top-4 left-4 bg-red-500 text-lg px-3 py-1" data-testid={`badge-discount-${product.id}`}>
                    -{currentDiscount}%
                  </Badge>
                )}
              </div>

              {product.hasVariants && colors.length > 1 && (
                <div className="flex gap-2 justify-center">
                  {product.variants?.filter((v, i, arr) => 
                    arr.findIndex(x => x.color === v.color) === i
                  ).slice(0, 4).map((variant, index) => (
                    <button
                      key={index}
                      onClick={() => handleColorSelect(variant.color || '')}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedVariant?.color === variant.color
                          ? 'border-primary ring-2 ring-primary/30'
                          : 'border-transparent hover:border-slate-300'
                      }`}
                      data-testid={`thumbnail-${product.id}-${variant.color}`}
                    >
                      <LazyImage 
                        src={variant.image || product.image}
                        alt={`${product.name} - ${variant.color}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-3">
                  {categoryTranslations[product.category] || product.category}
                </Badge>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2" data-testid={`product-name-${product.id}`}>
                  {product.name}
                </h1>
                <p className="text-lg text-muted-foreground" data-testid={`product-description-${product.id}`}>
                  {product.description}
                </p>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-foreground" data-testid={`product-price-${product.id}`}>
                  {currentPrice.toFixed(2)}€
                </span>
                {currentOriginalPrice && currentOriginalPrice > currentPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {currentOriginalPrice.toFixed(2)}€
                  </span>
                )}
                {currentDiscount && (
                  <Badge variant="destructive" className="text-sm">
                    {t('save')} {((currentOriginalPrice || 0) - currentPrice).toFixed(0)}€
                  </Badge>
                )}
              </div>

              {product.hasVariants && product.variants && (
                <div className="space-y-4">
                  {capacities.length > 0 && (
                    <div>
                      <p className="font-semibold text-foreground mb-3">
                        {t('capacity')}: <span className="font-normal text-muted-foreground">{selectedVariant?.capacity}</span>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {capacities.map(capacity => (
                          <button
                            key={capacity}
                            onClick={() => handleCapacitySelect(capacity || '')}
                            className={`px-4 py-2.5 text-sm rounded-lg border-2 transition-all font-medium ${
                              selectedVariant?.capacity === capacity
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-background text-foreground border-border hover:border-primary'
                            }`}
                            data-testid={`button-capacity-${product.id}-${capacity}`}
                          >
                            {capacity}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {colors.length > 0 && (
                    <div>
                      <p className="font-semibold text-foreground mb-3">
                        {t('color')}: <span className="font-normal text-muted-foreground">{selectedVariant?.color}</span>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {colors.map(color => (
                          <button
                            key={color}
                            onClick={() => handleColorSelect(color || '')}
                            className={`px-4 py-2.5 text-sm rounded-lg border-2 transition-all font-medium ${
                              selectedVariant?.color === color
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-background text-foreground border-border hover:border-primary'
                            }`}
                            data-testid={`button-color-${product.id}-${color}`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <Separator />

              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  size="lg" 
                  className="flex-1 h-14 text-lg gap-2"
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                  data-testid={`button-add-to-cart-${product.id}`}
                >
                  {addedToCart ? (
                    <>
                      <Check className="h-5 w-5" />
                      {t('addedToCart')}
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5" />
                      {t('addToCart')}
                    </>
                  )}
                </Button>
                <Button 
                  size="icon" 
                  variant={isWishlisted ? "default" : "outline"}
                  className="h-14 w-14"
                  onClick={handleToggleWishlist}
                  data-testid={`button-wishlist-${product.id}`}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </Button>
                <Button 
                  size="icon" 
                  variant="outline"
                  className="h-14 w-14"
                  onClick={handleShare}
                  data-testid={`button-share-${product.id}`}
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Card className="text-center">
                  <CardContent className="pt-4 pb-3 px-2">
                    <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-xs font-medium">{t('freeShipping')}</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-4 pb-3 px-2">
                    <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-xs font-medium">{t('warranty2Years')}</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-4 pb-3 px-2">
                    <RotateCcw className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-xs font-medium">{t('returns30Days')}</p>
                  </CardContent>
                </Card>
              </div>

              {product.features && product.features.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-foreground">
                    {t('specifications')}
                  </h3>
                  <ul className="space-y-2" data-testid={`product-features-${product.id}`}>
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-muted-foreground">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
