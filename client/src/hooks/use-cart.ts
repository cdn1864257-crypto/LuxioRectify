import { useState, useEffect } from 'react';
import { CartItem, loadCart, saveCart, getCartTotal, getCartItemCount } from '../lib/cart';
import { Product } from '../lib/products';

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(loadCart());
  }, []);

  const addToCart = (product: Product) => {
    console.log('useCart addToCart called with:', product);
    console.log('Current cart state:', cart);
    
    const existingItem = cart.find(item => item.id === product.id);
    
    let newCart: CartItem[];
    if (existingItem) {
      newCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...cart, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image
      }];
    }
    
    console.log('New cart after adding:', newCart);
    setCart(newCart);
    saveCart(newCart);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    let newCart: CartItem[];
    
    if (quantity <= 0) {
      newCart = cart.filter(item => item.id !== productId);
    } else {
      newCart = cart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      );
    }
    
    setCart(newCart);
    saveCart(newCart);
  };

  const removeFromCart = (productId: string) => {
    const newCart = cart.filter(item => item.id !== productId);
    setCart(newCart);
    saveCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
    saveCart([]);
  };

  return {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    total: getCartTotal(cart),
    itemCount: getCartItemCount(cart)
  };
}
