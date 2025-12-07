import { useState, useMemo, useEffect } from 'react';
import { Link } from 'wouter';
import { type Product } from '../lib/products';
import { useProducts } from '../hooks/use-products';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CartSidebar } from '../components/CartSidebar';
import { CheckoutModal } from '../components/CheckoutModal';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { showToast } from '../components/ToastNotifications';
import { SEO } from '../components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, ChevronLeft, ChevronRight, ShoppingCart, Check, ArrowLeft } from 'lucide-react';

const ITEMS_PER_PAGE = 12;

export default function Premium() {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  
  // Load products dynamically from MongoDB (with static fallback)
  const { products } = useProducts();

  // UI States
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState<Set<string>>(new Set());
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedCapacity, setSelectedCapacity] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Get all smartphones - recompute when products change
  const smartphones = useMemo(() => {
    return products.filter(p => p.category === 'smartphones');
  }, [products]);

  // Product variant selections (phoneId -> {capacity, color})
  const [variantSelections, setVariantSelections] = useState<Record<string, { capacity?: string; color?: string }>>({});

  // Initialize variant selections when smartphones load
  useEffect(() => {
    if (smartphones.length > 0) {
      const initialSelections: Record<string, { capacity?: string; color?: string }> = {};
      smartphones.forEach(phone => {
        if (phone.hasVariants && phone.variants && phone.variants.length > 0) {
          const firstVariant = phone.variants[0];
          initialSelections[phone.id] = {
            capacity: firstVariant.capacity,
            color: firstVariant.color
          };
        }
      });
      setVariantSelections(initialSelections);
    }
  }, [smartphones]);

  // Extract unique brands, capacities, and colors - recompute when smartphones change
  const brands = useMemo(() => {
    const brandSet = new Set<string>();
    smartphones.forEach(phone => {
      const brand = phone.name.split(' ')[0];
      brandSet.add(brand);
    });
    return Array.from(brandSet).sort();
  }, [smartphones]);

  const capacities = useMemo(() => {
    const capacitySet = new Set<string>();
    smartphones.forEach(phone => {
      if (phone.variants) {
        phone.variants.forEach(variant => {
          if (variant.capacity) {
            capacitySet.add(variant.capacity);
          }
        });
      }
    });
    return Array.from(capacitySet).sort((a, b) => {
      const aNum = parseInt(a);
      const bNum = parseInt(b);
      return aNum - bNum;
    });
  }, [smartphones]);

  const colors = useMemo(() => {
    const colorSet = new Set<string>();
    smartphones.forEach(phone => {
      if (phone.variants) {
        phone.variants.forEach(variant => {
          if (variant.color) {
            colorSet.add(variant.color);
          }
        });
      }
    });
    return Array.from(colorSet).sort();
  }, [smartphones]);

  // Filter smartphones
  const filteredSmartphones = useMemo(() => {
    return smartphones.filter(phone => {
      // Search filter
      if (searchQuery && !phone.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Brand filter
      if (selectedBrand !== 'all') {
        const brand = phone.name.split(' ')[0];
        if (brand !== selectedBrand) {
          return false;
        }
      }

      // Capacity filter
      if (selectedCapacity !== 'all') {
        if (!phone.variants?.some(v => v.capacity === selectedCapacity)) {
          return false;
        }
      }

      // Color filter
      if (selectedColor !== 'all') {
        if (!phone.variants?.some(v => v.color === selectedColor)) {
          return false;
        }
      }

      return true;
    });
  }, [smartphones, searchQuery, selectedBrand, selectedCapacity, selectedColor]);

  // Pagination
  const totalPages = Math.ceil(filteredSmartphones.length / ITEMS_PER_PAGE);
  const paginatedSmartphones = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredSmartphones.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredSmartphones, currentPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedBrand, selectedCapacity, selectedColor]);

  // Get available colors for a phone given selected capacity
  const getAvailableColors = (phone: Product, selectedCapacity?: string) => {
    if (!phone.variants) return [];
    const colorSet = new Set<string>();
    phone.variants.forEach(variant => {
      if (!selectedCapacity || variant.capacity === selectedCapacity) {
        if (variant.color) {
          colorSet.add(variant.color);
        }
      }
    });
    return Array.from(colorSet);
  };

  // Get available capacities for a phone given selected color
  const getAvailableCapacities = (phone: Product, selectedColor?: string) => {
    if (!phone.variants) return [];
    const capacitySet = new Set<string>();
    phone.variants.forEach(variant => {
      if (!selectedColor || variant.color === selectedColor) {
        if (variant.capacity) {
          capacitySet.add(variant.capacity);
        }
      }
    });
    return Array.from(capacitySet).sort((a, b) => {
      const aNum = parseInt(a);
      const bNum = parseInt(b);
      return aNum - bNum;
    });
  };

  // Get the price for current variant selection
  const getCurrentPrice = (phone: Product) => {
    const selection = variantSelections[phone.id];
    if (!selection || !phone.variants) {
      return { price: phone.price, originalPrice: phone.originalPrice };
    }

    // Find matching variant
    const variant = phone.variants.find(
      v => v.capacity === selection.capacity && v.color === selection.color
    );

    if (variant) {
      return { price: variant.price, originalPrice: variant.originalPrice };
    }

    return { price: phone.price, originalPrice: phone.originalPrice };
  };

  const handleCapacitySelect = (phoneId: string, capacity: string) => {
    setVariantSelections(prev => ({
      ...prev,
      [phoneId]: { ...prev[phoneId], capacity }
    }));
  };

  const handleColorSelect = (phoneId: string, color: string) => {
    setVariantSelections(prev => ({
      ...prev,
      [phoneId]: { ...prev[phoneId], color }
    }));
  };

  const handleAddToCart = (phone: Product) => {
    const selection = variantSelections[phone.id];
    
    // Create product with selected variant
    let productToAdd = { ...phone };
    if (selection?.capacity && selection?.color) {
      const variant = phone.variants?.find(
        v => v.capacity === selection.capacity && v.color === selection.color
      );
      if (variant) {
        const currentDiscount = variant.originalPrice && variant.price
          ? Math.round(((variant.originalPrice - variant.price) / variant.originalPrice) * 100)
          : phone.discount;
        
        productToAdd = {
          ...phone,
          price: variant.price,
          originalPrice: variant.originalPrice,
          discount: currentDiscount,
          image: variant.image || phone.image,
          description: `${selection.capacity}, ${selection.color}`
        };
      }
    }

    addToCart(productToAdd);

    setAddedToCart(prev => new Set(prev).add(phone.id));
    
    setTimeout(() => {
      setAddedToCart(prev => {
        const newSet = new Set(prev);
        newSet.delete(phone.id);
        return newSet;
      });
    }, 2000);

    showToast(`${phone.name}${selection?.color ? ` (${selection.color})` : ''} - ${t('itemAddedToCart')}`, 'success');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO page="premium" />
      <Header 
        onToggleCart={() => setCartOpen(!cartOpen)} 
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 overflow-x-hidden">
        {/* Header */}
        <div className="bg-slate-900 dark:bg-slate-950 text-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/">
              <Button
                variant="ghost"
                className="mb-4 md:mb-6 text-white hover:bg-slate-800 hover:text-white -ml-2"
                data-testid="button-back-to-home"
              >
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                <span className="text-sm md:text-base">{t('backToHome')}</span>
              </Button>
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 leading-tight" data-testid="text-premium-title">
              {t('premiumSmartphones') || 'Premium Smartphones'}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-4 md:mb-0" data-testid="text-premium-subtitle">
              {t('discoverLatest') || 'Discover the latest flagship smartphones with exclusive discounts'}
            </p>
            <div className="mt-4 md:mt-6">
              <Badge variant="destructive" className="text-sm md:text-lg px-3 md:px-4 py-1.5 md:py-2">
                {t('upTo') || 'Up to'} 37% {t('off') || 'OFF'}
              </Badge>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Filters */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 md:p-6 mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-slate-900 dark:text-white">
              {t('filterResults') || 'Filter Results'}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder={t('searchByModel') || 'Search by model...'}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10"
                  data-testid="input-search-model"
                />
              </div>

              {/* Brand Filter */}
              <Select value={selectedBrand} onValueChange={(value) => { setSelectedBrand(value); setCurrentPage(1); }}>
                <SelectTrigger data-testid="select-brand-filter">
                  <SelectValue placeholder={t('allBrands') || 'All Brands'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('allBrands') || 'All Brands'}</SelectItem>
                  {brands.map(brand => (
                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Capacity Filter */}
              <Select value={selectedCapacity} onValueChange={(value) => { setSelectedCapacity(value); setCurrentPage(1); }}>
                <SelectTrigger data-testid="select-capacity-filter">
                  <SelectValue placeholder={t('allCapacities') || 'All Capacities'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('allCapacities') || 'All Capacities'}</SelectItem>
                  {capacities.map(capacity => (
                    <SelectItem key={capacity} value={capacity}>{capacity}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Color Filter */}
              <Select value={selectedColor} onValueChange={(value) => { setSelectedColor(value); setCurrentPage(1); }}>
                <SelectTrigger data-testid="select-color-filter">
                  <SelectValue placeholder={t('allColors') || 'All Colors'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('allColors') || 'All Colors'}</SelectItem>
                  {colors.map(color => (
                    <SelectItem key={color} value={color}>{color}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Grid */}
          {paginatedSmartphones.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedSmartphones.map(phone => {
                  const selection = variantSelections[phone.id] || {};
                  const availableCapacities = getAvailableCapacities(phone, selection.color);
                  const availableColors = getAvailableColors(phone, selection.capacity);
                  const currentPrice = getCurrentPrice(phone);
                  
                  // Get current image based on selected color
                  const getCurrentImage = () => {
                    if (selection.color && phone.variants) {
                      const variantWithImage = phone.variants.find(v => v.color === selection.color && v.image);
                      if (variantWithImage?.image) {
                        return variantWithImage.image;
                      }
                    }
                    return phone.image;
                  };
                  
                  const currentImage = getCurrentImage();

                  return (
                    <Card key={phone.id} className="group hover:shadow-xl transition-all duration-300 flex flex-col" data-testid={`card-product-${phone.id}`}>
                      <CardContent className="p-4 flex-1">
                        {/* Product Image */}
                        <div 
                          className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800 cursor-pointer"
                          onClick={() => setSelectedProductForModal(phone)}
                        >
                          <img
                            src={currentImage}
                            alt={phone.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            data-testid={`img-product-${phone.id}`}
                          />
                          {phone.discount && (
                            <Badge className="absolute top-2 right-2 bg-red-500" data-testid={`badge-discount-${phone.id}`}>
                              -{phone.discount}%
                            </Badge>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="space-y-2">
                          <h3 className="font-bold text-lg text-slate-900 dark:text-white line-clamp-2" data-testid={`text-name-${phone.id}`}>
                            {phone.name}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2" data-testid={`text-description-${phone.id}`}>
                            {phone.description}
                          </p>

                          {/* Variant Selectors */}
                          {phone.hasVariants && phone.variants && (
                            <div className="space-y-3 mt-4">
                              {/* Capacity Selector */}
                              {availableCapacities.length > 0 && (
                                <div>
                                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                    {t('allCapacities') || 'Capacity'}:
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {availableCapacities.map(capacity => (
                                      <button
                                        key={capacity}
                                        onClick={() => handleCapacitySelect(phone.id, capacity)}
                                        className={`px-3 py-1 text-xs rounded-md border transition-colors ${
                                          selection.capacity === capacity
                                            ? 'bg-primary text-primary-foreground border-primary'
                                            : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-primary'
                                        }`}
                                        data-testid={`button-capacity-${phone.id}-${capacity}`}
                                      >
                                        {capacity}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Color Selector */}
                              {availableColors.length > 0 && (
                                <div>
                                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                    {t('allColors') || 'Color'}:
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {availableColors.map(color => (
                                      <button
                                        key={color}
                                        onClick={() => handleColorSelect(phone.id, color)}
                                        className={`px-3 py-1 text-xs rounded-md border transition-colors ${
                                          selection.color === color
                                            ? 'bg-primary text-primary-foreground border-primary'
                                            : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-primary'
                                        }`}
                                        data-testid={`button-color-${phone.id}-${color}`}
                                      >
                                        {color}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Price */}
                          <div className="flex items-baseline gap-2 mt-4">
                            <span className="text-2xl font-bold text-slate-900 dark:text-white" data-testid={`text-price-${phone.id}`}>
                              €{currentPrice.price}
                            </span>
                            {currentPrice.originalPrice && (
                              <span className="text-sm text-slate-500 line-through" data-testid={`text-original-price-${phone.id}`}>
                                €{currentPrice.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="p-4 pt-0">
                        <Button
                          onClick={() => handleAddToCart(phone)}
                          className="w-full"
                          variant={addedToCart.has(phone.id) ? "secondary" : "default"}
                          data-testid={`button-add-to-cart-${phone.id}`}
                        >
                          {addedToCart.has(phone.id) ? (
                            <>
                              <Check className="w-4 h-4 mr-2" />
                              {t('added') || 'Added'}
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              {t('addToCart') || 'Add to Cart'}
                            </>
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    data-testid="button-previous-page"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    {t('previous') || 'Previous'}
                  </Button>

                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => handlePageChange(page)}
                        className="min-w-[40px]"
                        data-testid={`button-page-${page}`}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    data-testid="button-next-page"
                  >
                    {t('next') || 'Next'}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-slate-600 dark:text-slate-400" data-testid="text-no-results">
                {t('noProductsFound') || 'No products found matching your filters'}
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedBrand('all');
                  setSelectedCapacity('all');
                  setSelectedColor('all');
                  setCurrentPage(1);
                }}
                className="mt-4"
                data-testid="button-reset-filters"
              >
                {t('resetFilters') || 'Reset Filters'}
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
      
      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />
      
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
      
      {selectedProductForModal && (
        <ProductDetailModal 
          product={selectedProductForModal}
          isOpen={!!selectedProductForModal}
          onClose={() => setSelectedProductForModal(null)}
          initialVariant={
            selectedProductForModal.variants?.find(
              v => v.capacity === variantSelections[selectedProductForModal.id]?.capacity && 
                   v.color === variantSelections[selectedProductForModal.id]?.color
            ) || null
          }
        />
      )}
    </div>
  );
}
