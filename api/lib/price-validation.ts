import { products as staticProducts, type Product, type ProductVariant } from './products';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description?: string;
}

export interface ValidationResult {
  valid: boolean;
  serverTotal: number;
  error?: string;
  details?: string;
}

export function getProductPrice(productId: string, description?: string): number | null {
  const product = staticProducts.find((p: Product) => p.id === productId);
  
  if (!product) {
    return null;
  }

  // Si le produit n'a pas de variantes, retourner le prix de base
  if (!product.hasVariants || !product.variants || product.variants.length === 0) {
    return product.price;
  }

  // Si pas de description fournie, retourner le prix de base du produit
  if (!description) {
    return product.price;
  }

  // Essayer de trouver la variante correspondante
  const variant = product.variants.find((v: ProductVariant) => {
    const matchesColor = v.color ? description.includes(v.color) : true;
    const matchesCapacity = v.capacity ? description.includes(v.capacity) : true;
    return matchesColor && matchesCapacity;
  });

  // Si une variante est trouvée, retourner son prix, sinon le prix de base
  return variant ? variant.price : product.price;
}

export function validateCartTotal(cart: CartItem[]): ValidationResult {
  const MAX_QUANTITY = 999;
  let serverTotal = 0;

  if (!cart || cart.length === 0) {
    return {
      valid: false,
      serverTotal: 0,
      error: 'Panier vide'
    };
  }

  for (const item of cart) {
    if (!Number.isInteger(item.quantity) || item.quantity <= 0 || item.quantity > MAX_QUANTITY) {
      return {
        valid: false,
        serverTotal: 0,
        error: `Quantité invalide pour ${item.name}`,
        details: `Quantité: ${item.quantity} (doit être entre 1 et ${MAX_QUANTITY})`
      };
    }

    const serverPrice = getProductPrice(item.id, item.description);
    
    if (serverPrice === null) {
      return {
        valid: false,
        serverTotal: 0,
        error: `Produit invalide: ${item.id}`,
        details: `Le produit "${item.name}" n'existe pas dans le catalogue serveur`
      };
    }

    if (Math.abs(item.price - serverPrice) > 0.01) {
      return {
        valid: false,
        serverTotal: 0,
        error: `Prix invalide pour ${item.name}`,
        details: `Prix attendu: ${serverPrice}€, reçu: ${item.price}€`
      };
    }

    serverTotal += serverPrice * item.quantity;
  }

  return { valid: true, serverTotal };
}

export function validateTotalAmount(clientTotal: number, serverTotal: number, tolerance: number = 0.01): boolean {
  return Math.abs(clientTotal - serverTotal) <= tolerance;
}
