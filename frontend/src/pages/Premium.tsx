import { useState, useMemo } from 'react';
import { products, type Product } from '../lib/products';
import { useCart } from '../hooks/use-cart';
import { useToast } from '../hooks/use-toast';
import { useLanguage } from '../hooks/use-language';
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
import { Search, ChevronLeft, ChevronRight, ShoppingCart, Check } from 'lucide-react';

const ITEMS_PER_PAGE = 12;

export default function Premium() {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const { toast } = useToast();

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedCapacity, setSelectedCapacity] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [addedToCart, setAddedToCart] = useState<Set<string>>(new Set());

  // Get all smartphones
  const smartphones = products.filter(p => p.category === 'smartphones');

  // Extract unique brands, capacities, and colors
  const brands = useMemo(() => {
    const brandSet = new Set<string>();
    smartphones.forEach(phone => {
      const brand = phone.name.split(' ')[0];
      brandSet.add(brand);
    });
    return Array.from(brandSet).sort();
  }, []);

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
  }, []);

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
  }, []);

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
  useState(() => {
    setCurrentPage(1);
  });

  const handleAddToCart = (phone: Product) => {
    addToCart(phone);

    setAddedToCart(prev => new Set(prev).add(phone.id));
    
    setTimeout(() => {
      setAddedToCart(prev => {
        const newSet = new Set(prev);
        newSet.delete(phone.id);
        return newSet;
      });
    }, 2000);

    toast({
      title: t('addedToCart'),
      description: `${phone.name} ${t('addedSuccessfully') || 'has been added to cart'}`,
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="bg-slate-900 dark:bg-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-premium-title">
            {t('premiumSmartphones') || 'Premium Smartphones'}
          </h1>
          <p className="text-xl text-slate-300" data-testid="text-premium-subtitle">
            {t('discoverLatest') || 'Discover the latest flagship smartphones with exclusive discounts'}
          </p>
          <div className="mt-6 flex items-center gap-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {filteredSmartphones.length} {t('products') || 'products'}
            </Badge>
            <Badge variant="destructive" className="text-lg px-4 py-2">
              {t('upTo') || 'Up to'} 37% {t('off') || 'OFF'}
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
            {t('filterResults') || 'Filter Results'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
              {paginatedSmartphones.map(phone => (
                <Card key={phone.id} className="group hover:shadow-xl transition-all duration-300" data-testid={`card-product-${phone.id}`}>
                  <CardContent className="p-4">
                    {/* Product Image */}
                    <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                      <img
                        src={phone.image}
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

                      {/* Features */}
                      <div className="flex flex-wrap gap-1">
                        {phone.features?.slice(0, 2).map((feature, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-slate-900 dark:text-white" data-testid={`text-price-${phone.id}`}>
                          €{phone.price}
                        </span>
                        {phone.originalPrice && (
                          <span className="text-sm text-slate-500 line-through" data-testid={`text-original-price-${phone.id}`}>
                            €{phone.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Variants Info */}
                      {phone.hasVariants && phone.variants && (
                        <p className="text-xs text-slate-500">
                          {phone.variants.length} {t('variants') || 'variants'} {t('available') || 'available'}
                        </p>
                      )}
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
              ))}
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
  );
}
