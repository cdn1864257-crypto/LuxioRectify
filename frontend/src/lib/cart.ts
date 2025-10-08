import { Product } from './products';
import { getApiUrl } from './config';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  quantity: number;
  image: string;
  description: string;
  features: string[];
  category: string;
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
const MAX_QUANTITY_PER_ITEM = 99;

export const loadCart = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];
    
    const data = JSON.parse(stored);
    
    // Validate cart data structure
    if (!Array.isArray(data)) return [];
    
    // Filter out invalid items and ensure data integrity
    return data.filter(item => 
      item &&
      typeof item.id === 'string' &&
      typeof item.name === 'string' &&
      typeof item.price === 'number' &&
      typeof item.quantity === 'number' &&
      item.quantity > 0 &&
      item.quantity <= MAX_QUANTITY_PER_ITEM
    );
  } catch (error) {
    console.warn('Failed to load cart from localStorage:', error);
    // Clear corrupted data
    localStorage.removeItem(CART_STORAGE_KEY);
    return [];
  }
};

export const saveCart = (cart: CartItem[]): boolean => {
  try {
    // Validate cart before saving
    const validCart = cart.filter(item => 
      item &&
      item.quantity > 0 &&
      item.quantity <= MAX_QUANTITY_PER_ITEM
    );
    
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(validCart));
    return true;
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
    return false;
  }
};

export const addToCart = (product: Product): { success: boolean; cart: CartItem[]; message?: string } => {
  const cart = loadCart();
  
  // Pour les produits avec variantes, on compare par id + description (qui contient capacity, color)
  // Pour les produits sans variante, on compare juste par id
  const existingItem = cart.find(item => 
    item.id === product.id && item.description === product.description
  );
  
  if (existingItem) {
    if (existingItem.quantity >= MAX_QUANTITY_PER_ITEM) {
      return {
        success: false,
        cart,
        message: `Maximum quantity (${MAX_QUANTITY_PER_ITEM}) reached for this item`
      };
    }
    existingItem.quantity += 1;
  } else {
    const newItem: CartItem = {
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
    };
    cart.push(newItem);
  }
  
  const saved = saveCart(cart);
  return {
    success: saved,
    cart,
    message: saved ? undefined : 'Failed to save to cart'
  };
};

export const updateCartQuantity = (productId: string, quantity: number): { success: boolean; cart: CartItem[]; message?: string } => {
  const cart = loadCart();
  
  if (quantity <= 0) {
    return removeFromCart(productId);
  }
  
  if (quantity > MAX_QUANTITY_PER_ITEM) {
    return {
      success: false,
      cart,
      message: `Maximum quantity is ${MAX_QUANTITY_PER_ITEM}`
    };
  }
  
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity = quantity;
    const saved = saveCart(cart);
    return {
      success: saved,
      cart,
      message: saved ? undefined : 'Failed to update cart'
    };
  }
  
  return {
    success: false,
    cart,
    message: 'Item not found in cart'
  };
};

export const removeFromCart = (productId: string): { success: boolean; cart: CartItem[]; message?: string } => {
  const cart = loadCart().filter(item => item.id !== productId);
  const saved = saveCart(cart);
  return {
    success: saved,
    cart,
    message: saved ? undefined : 'Failed to remove from cart'
  };
};

export const clearCart = (): boolean => {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear cart:', error);
    return false;
  }
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

export const deleteOrder = (orderReference: string): boolean => {
  try {
    const orders = loadOrders();
    const filteredOrders = orders.filter(order => order.reference !== orderReference);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(filteredOrders));
    return true;
  } catch (error) {
    console.error('Failed to delete order from localStorage:', error);
    return false;
  }
};

export const generateOrderReference = (): string => {
  return 'LX' + Date.now().toString().slice(-8);
};

export const initializeNowPayment = async (order: Order, customerEmail: string, customerName: string): Promise<{ success: boolean; redirectUrl?: string; error?: string }> => {
  try {
    const response = await fetch(getApiUrl('/api/payment/nowpayments-init'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerEmail,
        customerName,
        totalAmount: order.total,
        cartItems: order.items
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || 'Payment initialization failed'
      };
    }

    const data = await response.json();
    return {
      success: true,
      redirectUrl: data.redirectUrl
    };
  } catch (error) {
    console.error('Error initializing NowPayments:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

export const getCartSummary = (cart: CartItem[]) => {
  const totalItems = getCartItemCount(cart);
  const totalValue = getCartTotal(cart);
  const uniqueItems = cart.length;
  const totalSavings = cart.reduce((savings, item) => {
    if (item.originalPrice && item.originalPrice > item.price) {
      return savings + ((item.originalPrice - item.price) * item.quantity);
    }
    return savings;
  }, 0);
  
  return {
    totalItems,
    totalValue,
    uniqueItems,
    totalSavings,
    isEmpty: cart.length === 0
  };
};
