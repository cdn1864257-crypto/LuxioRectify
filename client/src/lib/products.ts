export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  category: string;
  description: string;
  features: string[];
}

export const products: Product[] = [
  // Smartphones
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    price: 899,
    originalPrice: 1149,
    discount: 22,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'smartphones',
    description: '256GB, Titanium',
    features: ['A17 Pro chip', 'Titanium design', 'Advanced camera system']
  },
  {
    id: 'galaxy-s25',
    name: 'Galaxy S25 Ultra',
    price: 1099,
    originalPrice: 1339,
    discount: 18,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'smartphones',
    description: '512GB, Phantom Black',
    features: ['S Pen included', '200MP camera', '5000mAh battery']
  },
  {
    id: 'pixel-10-pro',
    name: 'Pixel 10 Pro',
    price: 679,
    originalPrice: 799,
    discount: 15,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'smartphones',
    description: '256GB, Obsidian',
    features: ['Google Tensor G4', 'AI photography', 'Pure Android']
  },
  {
    id: 'oneplus-13',
    name: 'OnePlus 13',
    price: 639,
    originalPrice: 799,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'smartphones',
    description: '512GB, Midnight Black',
    features: ['Snapdragon 8 Gen 3', 'Fast charging', 'OxygenOS']
  },
  
  // Smartwatches
  {
    id: 'apple-watch-ultra',
    name: 'Apple Watch Ultra',
    price: 579,
    originalPrice: 799,
    discount: 28,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'watches',
    description: '49mm, Alpine Loop',
    features: ['Titanium case', 'Extended battery', 'Action button']
  },
  {
    id: 'galaxy-watch-6',
    name: 'Galaxy Watch 6',
    price: 269,
    originalPrice: 399,
    discount: 32,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'watches',
    description: '44mm, Graphite',
    features: ['Sleep tracking', 'BioActive sensor', 'Wear OS']
  },
  {
    id: 'whoop-strap',
    name: 'Whoop Strap 4.0',
    price: 189,
    originalPrice: 299,
    discount: 37,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'watches',
    description: 'Any Color, 12 Month Plan',
    features: ['Recovery tracking', 'Strain coach', 'Sleep optimization']
  },
  
  // Sneakers
  {
    id: 'jordan-1-retro',
    name: 'Air Jordan 1 Retro',
    price: 149,
    originalPrice: 179,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'sneakers',
    description: 'High OG, Chicago',
    features: ['Classic design', 'Premium leather', 'Free shipping']
  },
  {
    id: 'yeezy-350',
    name: 'Yeezy Boost 350',
    price: 229,
    originalPrice: 275,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'sneakers',
    description: 'V2, Zebra',
    features: ['Boost technology', 'Primeknit upper', 'Free shipping']
  },
  {
    id: 'nb-550',
    name: 'New Balance 550',
    price: 99,
    originalPrice: 119,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'sneakers',
    description: 'White Green',
    features: ['Retro basketball style', 'Leather construction', 'Free shipping']
  },
  {
    id: 'crocs-classic',
    name: 'Crocs Classic Clog',
    price: 37,
    originalPrice: 45,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1506629905460-e6eaec17cff0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'sneakers',
    description: 'Black, Unisex',
    features: ['Lightweight comfort', 'Easy to clean', 'Free shipping']
  },
  
  // Home Gadgets
  {
    id: 'robot-vacuum',
    name: 'Smart Robot Vacuum',
    price: 349,
    originalPrice: 399,
    discount: 13,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'gadgets',
    description: 'Auto-mapping, App Control',
    features: ['Smart navigation', 'App control', 'Free delivery']
  },
  {
    id: 'air-purifier',
    name: 'Smart Air Purifier',
    price: 217,
    originalPrice: 249,
    discount: 13,
    image: 'https://images.unsplash.com/photo-1585338447937-7082f8fc763d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'gadgets',
    description: 'HEPA Filter, WiFi Enabled',
    features: ['HEPA filtration', 'WiFi connectivity', 'Free delivery']
  },
  {
    id: 'smart-hub',
    name: 'Smart Home Hub',
    price: 87,
    originalPrice: 99,
    discount: 13,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'gadgets',
    description: 'Voice Control, Zigbee',
    features: ['Voice control', 'Zigbee compatible', 'Free delivery']
  },
  
  // Mobility
  {
    id: 'electric-scooter-pro',
    name: 'Electric Scooter Pro',
    price: 521,
    originalPrice: 599,
    discount: 13,
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    category: 'mobility',
    description: 'Max Speed: 25km/h, Range: 45km',
    features: ['25km/h top speed', '45km range', 'Free shipping & assembly']
  },
  {
    id: 'electric-bike-city',
    name: 'Electric Bike City',
    price: 1043,
    originalPrice: 1199,
    discount: 13,
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    category: 'mobility',
    description: 'Motor: 250W, Battery: 36V 10Ah',
    features: ['250W motor', '36V battery', 'Free shipping & assembly']
  }
];

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
