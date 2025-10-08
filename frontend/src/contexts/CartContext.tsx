import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, loadCart, saveCart, getCartTotal, getCartItemCount } from '../lib/cart';
import { Product } from '../lib/products';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  updateQuantity: (productId: string, description: string, quantity: number) => void;
  removeFromCart: (productId: string, description: string) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(loadCart());
  }, []);

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => 
      item.id === product.id && item.description === product.description
    );
    
    let newCart: CartItem[];
    if (existingItem) {
      newCart = cart.map(item =>
        item.id === product.id && item.description === product.description
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...cart, {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        discount: product.discount,
        quantity: 1,
        image: product.image,
        description: product.description,
        features: product.features,
        category: product.category
      }];
    }
    
    setCart(newCart);
    saveCart(newCart);
  };

  const updateQuantity = (productId: string, description: string, quantity: number) => {
    let newCart: CartItem[];
    
    if (quantity <= 0) {
      newCart = cart.filter(item => !(item.id === productId && item.description === description));
    } else {
      newCart = cart.map(item =>
        item.id === productId && item.description === description
          ? { ...item, quantity }
          : item
      );
    }
    
    setCart(newCart);
    saveCart(newCart);
  };

  const removeFromCart = (productId: string, description: string) => {
    const newCart = cart.filter(item => !(item.id === productId && item.description === description));
    setCart(newCart);
    saveCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
    saveCart([]);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      total: getCartTotal(cart),
      itemCount: getCartItemCount(cart)
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
