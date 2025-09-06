import { Product } from './products';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  reference: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
  date: string;
  customerInfo?: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    country: string;
    phone: string;
  };
}

const CART_STORAGE_KEY = 'luxio-cart';
const ORDERS_STORAGE_KEY = 'luxio-orders';

export const loadCart = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveCart = (cart: CartItem[]): void => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

export const addToCart = (product: Product): CartItem[] => {
  const cart = loadCart();
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    });
  }
  
  saveCart(cart);
  return cart;
};

export const updateCartQuantity = (productId: string, quantity: number): CartItem[] => {
  const cart = loadCart();
  if (quantity <= 0) {
    return removeFromCart(productId);
  }
  
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity = quantity;
    saveCart(cart);
  }
  
  return cart;
};

export const removeFromCart = (productId: string): CartItem[] => {
  const cart = loadCart().filter(item => item.id !== productId);
  saveCart(cart);
  return cart;
};

export const clearCart = (): void => {
  localStorage.removeItem(CART_STORAGE_KEY);
};

export const getCartTotal = (cart: CartItem[]): number => {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const getCartItemCount = (cart: CartItem[]): number => {
  return cart.reduce((total, item) => total + item.quantity, 0);
};

export const loadOrders = (): Order[] => {
  try {
    const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveOrder = (order: Order): void => {
  const orders = loadOrders();
  orders.push(order);
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
};

export const generateOrderReference = (): string => {
  return 'LX' + Date.now().toString().slice(-8);
};

export const generateMaxelPayUrl = (order: Order): string => {
  const merchantId = import.meta.env.VITE_MAXELPAY_MERCHANT_ID || 'YOUR_MERCHANT_ID';
  const baseUrl = 'https://checkout.maxelpay.com/';
  
  const params = new URLSearchParams({
    merchant_id: merchantId,
    amount: order.total.toString(),
    currency: 'EUR',
    reference: order.reference,
    description: `Luxio Order ${order.reference}`,
    return_url: window.location.origin + '/payment-return'
  });
  
  return `${baseUrl}?${params.toString()}`;
};
