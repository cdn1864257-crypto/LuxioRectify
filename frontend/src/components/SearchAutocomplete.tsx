import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { Search, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProducts } from '@/hooks/use-products';
import type { Product } from '@/lib/products';

interface SearchAutocompleteProps {
  className?: string;
  placeholder?: string;
}

export function SearchAutocomplete({ className = '', placeholder }: SearchAutocompleteProps) {
  const { t } = useLanguage();
  const [, navigate] = useLocation();
  const { products } = useProducts();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredProducts = query.length > 1
    ? products
        .filter(product =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 8)
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filteredProducts.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < filteredProducts.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleProductSelect(filteredProducts[selectedIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  };

  const handleProductSelect = (product: Product) => {
    setQuery('');
    setIsOpen(false);
    setSelectedIndex(-1);
    
    if (product.category === 'smartphones') {
      navigate('/premium');
    } else {
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById(product.category);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleInputChange = (value: string) => {
    setQuery(value);
    setIsOpen(value.length > 1);
    setSelectedIndex(-1);
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length > 1 && setIsOpen(true)}
          placeholder={placeholder || t('searchPlaceholder')}
          className="w-full pl-10 pr-10 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm bg-background"
          data-testid="search-input-autocomplete"
          aria-label="Search products"
          aria-autocomplete="list"
          aria-controls="search-results"
          aria-expanded={isOpen}
        />
        <Search 
          className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" 
          aria-hidden="true"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
            data-testid="button-clear-search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && (
        <div
          id="search-results"
          className="absolute z-50 w-full mt-2 bg-background border border-border rounded-lg shadow-lg max-h-96 overflow-y-auto"
          role="listbox"
          data-testid="search-results-list"
        >
          {filteredProducts.length > 0 ? (
            <>
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground border-b">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'}
              </div>
              {filteredProducts.map((product, index) => (
                <button
                  key={product.id}
                  onClick={() => handleProductSelect(product)}
                  className={`w-full text-left px-3 py-3 hover:bg-accent transition-colors flex items-center gap-3 border-b last:border-b-0 ${
                    index === selectedIndex ? 'bg-accent' : ''
                  }`}
                  role="option"
                  aria-selected={index === selectedIndex}
                  data-testid={`search-result-${index}`}
                >
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                      loading="lazy"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{product.name}</div>
                    <div className="text-xs text-muted-foreground capitalize">{product.category}</div>
                  </div>
                  <div className="text-sm font-semibold text-primary whitespace-nowrap">
                    ${product.price}
                  </div>
                </button>
              ))}
            </>
          ) : (
            <div className="px-3 py-6 text-center text-sm text-muted-foreground">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
