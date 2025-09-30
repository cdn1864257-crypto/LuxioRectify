export interface ProductVariant {
  color?: string;
  capacity?: string;
  price: number;
  originalPrice: number;
}

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
  variants?: ProductVariant[];
  hasVariants?: boolean;
}

export const products: Product[] = [
  // === SMARTPHONES - Latest 2025 Models from GSMArena ===
  // iPhone 17 Pro Max with variants
  {
    id: 'iphone-17-pro-max',
    name: 'iPhone 17 Pro Max',
    price: 1199,
    originalPrice: 1399,
    discount: 14,
    image: '/attached_assets/smartphones/iphone-17-pro-max.jpg',
    category: 'smartphones',
    description: 'From 256GB - 6.9" ProMotion Display',
    features: ['Apple A19 Pro chip', '6.9" LTPO OLED 120Hz', '48MP triple camera', 'Ceramic Shield 2', 'Free shipping'],
    hasVariants: true,
    variants: [
      { color: 'Silver', capacity: '256GB', price: 1199, originalPrice: 1399 },
      { color: 'Silver', capacity: '512GB', price: 1399, originalPrice: 1599 },
      { color: 'Silver', capacity: '2TB', price: 1899, originalPrice: 2199 },
      { color: 'Cosmic Orange', capacity: '256GB', price: 1199, originalPrice: 1399 },
      { color: 'Cosmic Orange', capacity: '512GB', price: 1399, originalPrice: 1599 },
      { color: 'Cosmic Orange', capacity: '2TB', price: 1899, originalPrice: 2199 },
      { color: 'Deep Blue', capacity: '256GB', price: 1199, originalPrice: 1399 },
      { color: 'Deep Blue', capacity: '512GB', price: 1399, originalPrice: 1599 },
      { color: 'Deep Blue', capacity: '2TB', price: 1899, originalPrice: 2199 },
    ]
  },
  // iPhone 17 Pro with variants
  {
    id: 'iphone-17-pro',
    name: 'iPhone 17 Pro',
    price: 1099,
    originalPrice: 1299,
    discount: 15,
    image: '/attached_assets/smartphones/iphone-17-pro.jpg',
    category: 'smartphones',
    description: 'From 256GB - 6.3" ProMotion Display',
    features: ['Apple A19 Pro chip', '6.3" LTPO OLED 120Hz', '48MP triple camera', 'Aluminum frame', 'Free shipping'],
    hasVariants: true,
    variants: [
      { color: 'Silver', capacity: '256GB', price: 1099, originalPrice: 1299 },
      { color: 'Silver', capacity: '512GB', price: 1299, originalPrice: 1499 },
      { color: 'Silver', capacity: '1TB', price: 1599, originalPrice: 1799 },
      { color: 'Cosmic Orange', capacity: '256GB', price: 1099, originalPrice: 1299 },
      { color: 'Cosmic Orange', capacity: '512GB', price: 1299, originalPrice: 1499 },
      { color: 'Cosmic Orange', capacity: '1TB', price: 1599, originalPrice: 1799 },
      { color: 'Deep Blue', capacity: '256GB', price: 1099, originalPrice: 1299 },
      { color: 'Deep Blue', capacity: '512GB', price: 1299, originalPrice: 1499 },
      { color: 'Deep Blue', capacity: '1TB', price: 1599, originalPrice: 1799 },
    ]
  },
  // iPhone Air with variants
  {
    id: 'iphone-air',
    name: 'iPhone Air',
    price: 999,
    originalPrice: 1199,
    discount: 17,
    image: '/attached_assets/smartphones/iphone-air.jpg',
    category: 'smartphones',
    description: 'From 256GB - Ultra-thin 5.6mm design',
    features: ['Apple A19 Pro chip', '6.5" LTPO OLED 120Hz', '48MP camera', '5.6mm thickness', 'Free shipping'],
    hasVariants: true,
    variants: [
      { color: 'Space Black', capacity: '256GB', price: 999, originalPrice: 1199 },
      { color: 'Space Black', capacity: '512GB', price: 1199, originalPrice: 1399 },
      { color: 'Space Black', capacity: '1TB', price: 1499, originalPrice: 1699 },
      { color: 'Cloud White', capacity: '256GB', price: 999, originalPrice: 1199 },
      { color: 'Cloud White', capacity: '512GB', price: 1199, originalPrice: 1399 },
      { color: 'Cloud White', capacity: '1TB', price: 1499, originalPrice: 1699 },
      { color: 'Light Gold', capacity: '256GB', price: 999, originalPrice: 1199 },
      { color: 'Light Gold', capacity: '512GB', price: 1199, originalPrice: 1399 },
      { color: 'Light Gold', capacity: '1TB', price: 1499, originalPrice: 1699 },
      { color: 'Sky Blue', capacity: '256GB', price: 999, originalPrice: 1199 },
      { color: 'Sky Blue', capacity: '512GB', price: 1199, originalPrice: 1399 },
      { color: 'Sky Blue', capacity: '1TB', price: 1499, originalPrice: 1699 },
    ]
  },
  // iPhone 17 with variants
  {
    id: 'iphone-17',
    name: 'iPhone 17',
    price: 799,
    originalPrice: 949,
    discount: 16,
    image: '/attached_assets/smartphones/iphone-17.jpg',
    category: 'smartphones',
    description: 'From 256GB - 6.3" Display',
    features: ['Apple A19 chip', '6.3" LTPO OLED 120Hz', '48MP dual camera', 'All-day battery', 'Free shipping'],
    hasVariants: true,
    variants: [
      { color: 'Black', capacity: '256GB', price: 799, originalPrice: 949 },
      { color: 'Black', capacity: '512GB', price: 949, originalPrice: 1099 },
      { color: 'White', capacity: '256GB', price: 799, originalPrice: 949 },
      { color: 'White', capacity: '512GB', price: 949, originalPrice: 1099 },
      { color: 'Mist Blue', capacity: '256GB', price: 799, originalPrice: 949 },
      { color: 'Mist Blue', capacity: '512GB', price: 949, originalPrice: 1099 },
      { color: 'Sage', capacity: '256GB', price: 799, originalPrice: 949 },
      { color: 'Sage', capacity: '512GB', price: 949, originalPrice: 1099 },
      { color: 'Lavender', capacity: '256GB', price: 799, originalPrice: 949 },
      { color: 'Lavender', capacity: '512GB', price: 949, originalPrice: 1099 },
    ]
  },
  // iPhone 16 Pro Max with variants
  {
    id: 'iphone-16-pro-max',
    name: 'iPhone 16 Pro Max',
    price: 929,
    originalPrice: 1099,
    discount: 15,
    image: '/attached_assets/smartphones/iphone-16-pro-max.jpg',
    category: 'smartphones',
    description: 'From 256GB - Previous Gen Flagship',
    features: ['Apple A18 Pro chip', '6.9" LTPO OLED 120Hz', '48MP triple camera', 'Titanium design', 'Free shipping'],
    hasVariants: true,
    variants: [
      { color: 'Black Titanium', capacity: '256GB', price: 929, originalPrice: 1099 },
      { color: 'Black Titanium', capacity: '512GB', price: 1099, originalPrice: 1299 },
      { color: 'Black Titanium', capacity: '1TB', price: 1399, originalPrice: 1599 },
      { color: 'White Titanium', capacity: '256GB', price: 929, originalPrice: 1099 },
      { color: 'White Titanium', capacity: '512GB', price: 1099, originalPrice: 1299 },
      { color: 'White Titanium', capacity: '1TB', price: 1399, originalPrice: 1599 },
      { color: 'Natural Titanium', capacity: '256GB', price: 929, originalPrice: 1099 },
      { color: 'Natural Titanium', capacity: '512GB', price: 1099, originalPrice: 1299 },
      { color: 'Natural Titanium', capacity: '1TB', price: 1399, originalPrice: 1599 },
      { color: 'Desert Titanium', capacity: '256GB', price: 929, originalPrice: 1099 },
      { color: 'Desert Titanium', capacity: '512GB', price: 1099, originalPrice: 1299 },
      { color: 'Desert Titanium', capacity: '1TB', price: 1399, originalPrice: 1599 },
    ]
  },
  // Samsung Galaxy S25 Ultra with variants
  {
    id: 'samsung-s25-ultra',
    name: 'Samsung Galaxy S25 Ultra',
    price: 819,
    originalPrice: 999,
    discount: 18,
    image: '/attached_assets/smartphones/samsung-s25-ultra.jpg',
    category: 'smartphones',
    description: 'From 256GB - S Pen included',
    features: ['Snapdragon 8 Elite', '6.9" Dynamic AMOLED 120Hz', '200MP quad camera', 'S Pen stylus', 'Free shipping'],
    hasVariants: true,
    variants: [
      { color: 'Titanium Silver Blue', capacity: '256GB', price: 819, originalPrice: 999 },
      { color: 'Titanium Silver Blue', capacity: '512GB', price: 999, originalPrice: 1199 },
      { color: 'Titanium Silver Blue', capacity: '1TB', price: 1299, originalPrice: 1499 },
      { color: 'Titanium Black', capacity: '256GB', price: 819, originalPrice: 999 },
      { color: 'Titanium Black', capacity: '512GB', price: 999, originalPrice: 1199 },
      { color: 'Titanium Black', capacity: '1TB', price: 1299, originalPrice: 1499 },
      { color: 'Titanium White Silver', capacity: '256GB', price: 819, originalPrice: 999 },
      { color: 'Titanium White Silver', capacity: '512GB', price: 999, originalPrice: 1199 },
      { color: 'Titanium White Silver', capacity: '1TB', price: 1299, originalPrice: 1499 },
      { color: 'Titanium Gray', capacity: '256GB', price: 819, originalPrice: 999 },
      { color: 'Titanium Gray', capacity: '512GB', price: 999, originalPrice: 1199 },
      { color: 'Titanium Gray', capacity: '1TB', price: 1299, originalPrice: 1499 },
    ]
  },
  // Samsung Galaxy Z Fold7 with variants
  {
    id: 'samsung-z-fold7',
    name: 'Samsung Galaxy Z Fold7',
    price: 1799,
    originalPrice: 2099,
    discount: 14,
    image: '/attached_assets/smartphones/samsung-z-fold7.jpg',
    category: 'smartphones',
    description: 'From 256GB - Foldable flagship',
    features: ['Snapdragon 8 Elite', '8.0" foldable AMOLED', '200MP camera', 'Ultra-thin design', 'Free shipping'],
    hasVariants: true,
    variants: [
      { color: 'Blue Shadow', capacity: '256GB', price: 1799, originalPrice: 2099 },
      { color: 'Blue Shadow', capacity: '512GB', price: 1999, originalPrice: 2299 },
      { color: 'Blue Shadow', capacity: '1TB', price: 2299, originalPrice: 2599 },
      { color: 'Silver Shadow', capacity: '256GB', price: 1799, originalPrice: 2099 },
      { color: 'Silver Shadow', capacity: '512GB', price: 1999, originalPrice: 2299 },
      { color: 'Silver Shadow', capacity: '1TB', price: 2299, originalPrice: 2599 },
      { color: 'Jet Black', capacity: '256GB', price: 1799, originalPrice: 2099 },
      { color: 'Jet Black', capacity: '512GB', price: 1999, originalPrice: 2299 },
      { color: 'Jet Black', capacity: '1TB', price: 2299, originalPrice: 2599 },
      { color: 'Mint', capacity: '256GB', price: 1799, originalPrice: 2099 },
      { color: 'Mint', capacity: '512GB', price: 1999, originalPrice: 2299 },
      { color: 'Mint', capacity: '1TB', price: 2299, originalPrice: 2599 },
    ]
  },
  // Samsung Galaxy Z Flip7 with variants
  {
    id: 'samsung-z-flip7',
    name: 'Samsung Galaxy Z Flip7',
    price: 879,
    originalPrice: 1049,
    discount: 16,
    image: '/attached_assets/smartphones/samsung-z-flip7.jpg',
    category: 'smartphones',
    description: 'From 256GB - Compact foldable',
    features: ['Exynos 2500', '6.9" foldable display', '50MP dual camera', 'Compact design', 'Free shipping'],
    hasVariants: true,
    variants: [
      { color: 'Blue Shadow', capacity: '256GB', price: 879, originalPrice: 1049 },
      { color: 'Blue Shadow', capacity: '512GB', price: 1049, originalPrice: 1249 },
      { color: 'Jet Black', capacity: '256GB', price: 879, originalPrice: 1049 },
      { color: 'Jet Black', capacity: '512GB', price: 1049, originalPrice: 1249 },
      { color: 'Coral Red', capacity: '256GB', price: 879, originalPrice: 1049 },
      { color: 'Coral Red', capacity: '512GB', price: 1049, originalPrice: 1249 },
      { color: 'Mint', capacity: '256GB', price: 879, originalPrice: 1049 },
      { color: 'Mint', capacity: '512GB', price: 1049, originalPrice: 1249 },
    ]
  },
  // Google Pixel 10 Pro with variants
  {
    id: 'google-pixel-10-pro',
    name: 'Google Pixel 10 Pro',
    price: 899,
    originalPrice: 999,
    discount: 10,
    image: '/attached_assets/smartphones/google-pixel-10-pro.jpg',
    category: 'smartphones',
    description: 'From 128GB - AI Photography Master',
    features: ['Google Tensor G5', '6.3" LTPO OLED 120Hz', '50MP with 100x Zoom', '7 years updates', 'Free shipping'],
    hasVariants: true,
    variants: [
      { color: 'Obsidian Black', capacity: '128GB', price: 899, originalPrice: 999 },
      { color: 'Obsidian Black', capacity: '256GB', price: 999, originalPrice: 1099 },
      { color: 'Obsidian Black', capacity: '512GB', price: 1199, originalPrice: 1299 },
      { color: 'Obsidian Black', capacity: '1TB', price: 1449, originalPrice: 1599 },
      { color: 'Porcelain', capacity: '128GB', price: 899, originalPrice: 999 },
      { color: 'Porcelain', capacity: '256GB', price: 999, originalPrice: 1099 },
      { color: 'Porcelain', capacity: '512GB', price: 1199, originalPrice: 1299 },
      { color: 'Bay Blue', capacity: '128GB', price: 899, originalPrice: 999 },
      { color: 'Bay Blue', capacity: '256GB', price: 999, originalPrice: 1099 },
      { color: 'Bay Blue', capacity: '512GB', price: 1199, originalPrice: 1299 },
    ]
  },
  // OnePlus 13 with variants
  {
    id: 'oneplus-13',
    name: 'OnePlus 13',
    price: 749,
    originalPrice: 899,
    discount: 17,
    image: '/attached_assets/smartphones/oneplus-13.jpg',
    category: 'smartphones',
    description: 'From 256GB - Speed Champion',
    features: ['Snapdragon 8 Gen 4', 'Triple 50MP cameras', '100W SuperVOOC', 'OxygenOS 15', 'Free shipping'],
    hasVariants: true,
    variants: [
      { color: 'Black Eclipse', capacity: '256GB', price: 749, originalPrice: 899 },
      { color: 'Black Eclipse', capacity: '512GB', price: 899, originalPrice: 1049 },
      { color: 'Black Eclipse', capacity: '1TB', price: 1099, originalPrice: 1249 },
      { color: 'Arctic Dawn', capacity: '256GB', price: 749, originalPrice: 899 },
      { color: 'Arctic Dawn', capacity: '512GB', price: 899, originalPrice: 1049 },
      { color: 'Emerald Forest', capacity: '256GB', price: 749, originalPrice: 899 },
      { color: 'Emerald Forest', capacity: '512GB', price: 899, originalPrice: 1049 },
    ]
  },
  // Xiaomi 15 with variants
  {
    id: 'xiaomi-15',
    name: 'Xiaomi 15',
    price: 749,
    originalPrice: 899,
    discount: 17,
    image: '/attached_assets/smartphones/xiaomi-15.jpg',
    category: 'smartphones',
    description: 'From 256GB - Performance Beast',
    features: ['Snapdragon 8 Elite', '50MP Leica cameras', '90W HyperCharge', 'HyperOS 2.0', 'Free shipping'],
    hasVariants: true,
    variants: [
      { color: 'Black', capacity: '256GB', price: 749, originalPrice: 899 },
      { color: 'Black', capacity: '512GB', price: 899, originalPrice: 1049 },
      { color: 'Black', capacity: '1TB', price: 1099, originalPrice: 1249 },
      { color: 'White', capacity: '256GB', price: 749, originalPrice: 899 },
      { color: 'White', capacity: '512GB', price: 899, originalPrice: 1049 },
      { color: 'Purple', capacity: '256GB', price: 749, originalPrice: 899 },
      { color: 'Purple', capacity: '512GB', price: 899, originalPrice: 1049 },
    ]
  },

  // === SMARTWATCHES (16 products) ===
  {
    id: 'apple-watch-ultra-2',
    name: 'Apple Watch Ultra 2',
    price: 799,
    originalPrice: 899,
    discount: 11,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'watches',
    description: '49mm, Ocean Band',
    features: ['Titanium case', 'Extended battery', 'Action button', 'Free shipping']
  },
  {
    id: 'galaxy-watch-6-classic',
    name: 'Galaxy Watch 6 Classic',
    price: 399,
    originalPrice: 499,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'watches',
    description: '47mm, Black',
    features: ['Rotating bezel', 'Sleep tracking', 'Wear OS', 'Free shipping']
  },
  {
    id: 'garmin-fenix-7x',
    name: 'Garmin Fenix 7X',
    price: 699,
    originalPrice: 799,
    discount: 13,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'watches',
    description: 'Solar, Sapphire',
    features: ['Multi-sport GPS', 'Solar charging', 'Rugged design', 'Free shipping']
  },
  {
    id: 'fitbit-sense-2',
    name: 'Fitbit Sense 2',
    price: 249,
    originalPrice: 299,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'watches',
    description: 'Health focused',
    features: ['Stress management', 'ECG app', 'GPS built-in', 'Free shipping']
  },
  {
    id: 'suunto-9-peak-pro',
    name: 'Suunto 9 Peak Pro',
    price: 549,
    originalPrice: 649,
    discount: 15,
    image: 'https://images.unsplash.com/photo-1594736797933-d0cc01e17207?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'watches',
    description: 'Titanium, GPS',
    features: ['Adventure ready', 'Long battery', 'Offline maps', 'Free shipping']
  },
  {
    id: 'polar-grit-x2-pro',
    name: 'Polar Grit X2 Pro',
    price: 499,
    originalPrice: 599,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'watches',
    description: 'Titan, Sapphire',
    features: ['Military-grade durability', 'Training guidance', 'Recovery insights', 'Free shipping']
  },
  {
    id: 'coros-vertix-2s',
    name: 'COROS Vertix 2S',
    price: 599,
    originalPrice: 699,
    discount: 14,
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'watches',
    description: 'Adventure GPS',
    features: ['60-day battery', 'Dual-frequency GPS', 'Mountain ready', 'Free shipping']
  },
  {
    id: 'amazfit-t-rex-3',
    name: 'Amazfit T-Rex 3',
    price: 199,
    originalPrice: 249,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'watches',
    description: 'Rugged GPS',
    features: ['Military standard', 'Long battery life', 'Health tracking', 'Free shipping']
  },
  {
    id: 'huawei-watch-gt-4',
    name: 'Huawei Watch GT 4',
    price: 249,
    originalPrice: 299,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'watches',
    description: '46mm, Sport',
    features: ['2-week battery', 'Fitness tracking', 'Smart features', 'Free shipping']
  },
  {
    id: 'fossil-gen-6-wellness',
    name: 'Fossil Gen 6 Wellness',
    price: 199,
    originalPrice: 259,
    discount: 23,
    image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'watches',
    description: 'Wear OS 3',
    features: ['Wellness focused', 'Google Assistant', 'Fast charging', 'Free shipping']
  },
  {
    id: 'ticwatch-pro-5',
    name: 'TicWatch Pro 5',
    price: 349,
    originalPrice: 399,
    discount: 13,
    image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'watches',
    description: 'Snapdragon W5',
    features: ['Dual display', 'Wear OS 3', 'Long battery', 'Free shipping']
  },
  {
    id: 'withings-scanwatch-2',
    name: 'Withings ScanWatch 2',
    price: 349,
    originalPrice: 399,
    discount: 13,
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'watches',
    description: 'Hybrid smartwatch',
    features: ['Medical-grade sensors', 'Classic design', '30-day battery', 'Free shipping']
  },
  {
    id: 'casio-g-shock-gbx100',
    name: 'Casio G-Shock GBX100',
    price: 399,
    originalPrice: 449,
    discount: 11,
    image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'watches',
    description: 'Tough Solar',
    features: ['G-Shock durability', 'Tide graph', 'Phone finder', 'Free shipping']
  },
  {
    id: 'tag-heuer-connected',
    name: 'TAG Heuer Connected',
    price: 1799,
    originalPrice: 1999,
    discount: 10,
    image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'watches',
    description: 'Luxury smartwatch',
    features: ['Swiss luxury', 'Titanium case', 'Premium materials', 'Free shipping']
  },
  {
    id: 'xiaomi-watch-s3',
    name: 'Xiaomi Watch S3',
    price: 149,
    originalPrice: 199,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'watches',
    description: 'AMOLED display',
    features: ['12-day battery', 'Health monitoring', 'Always-on display', 'Free shipping']
  },
  {
    id: 'oura-ring-gen3',
    name: 'Oura Ring Gen3',
    price: 299,
    originalPrice: 349,
    discount: 14,
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'watches',
    description: 'Smart ring',
    features: ['Sleep tracking', 'Recovery insights', 'Discreet design', 'Free shipping']
  },

  // === SNEAKERS (12 products) ===
  {
    id: 'air-jordan-4-retro',
    name: 'Air Jordan 4 Retro',
    price: 219,
    originalPrice: 259,
    discount: 15,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'sneakers',
    description: 'White Cement',
    features: ['Classic silhouette', 'Premium leather', 'Basketball heritage', 'Free shipping']
  },
  {
    id: 'yeezy-boost-350-v2',
    name: 'Yeezy Boost 350 V2',
    price: 249,
    originalPrice: 299,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'sneakers',
    description: 'Bone',
    features: ['Boost technology', 'Primeknit upper', 'Iconic design', 'Free shipping']
  },
  {
    id: 'nike-dunk-low',
    name: 'Nike Dunk Low',
    price: 119,
    originalPrice: 149,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'sneakers',
    description: 'Panda',
    features: ['Retro basketball', 'Versatile style', 'Premium materials', 'Free shipping']
  },
  {
    id: 'new-balance-990v6',
    name: 'New Balance 990v6',
    price: 199,
    originalPrice: 229,
    discount: 13,
    image: 'https://images.unsplash.com/photo-1506629905460-e6eaec17cff0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'sneakers',
    description: 'Gray',
    features: ['Made in USA', 'Premium comfort', 'Classic design', 'Free shipping']
  },
  {
    id: 'adidas-ultraboost-22',
    name: 'Adidas Ultraboost 22',
    price: 179,
    originalPrice: 219,
    discount: 18,
    image: 'https://images.unsplash.com/photo-1586316237874-40a3b3d24e34?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'sneakers',
    description: 'Core Black',
    features: ['Boost midsole', 'Primeknit upper', 'Energy return', 'Free shipping']
  },
  {
    id: 'converse-chuck-70',
    name: 'Converse Chuck 70',
    price: 89,
    originalPrice: 109,
    discount: 18,
    image: 'https://images.unsplash.com/photo-1597048122608-8ad69e6f8d96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'sneakers',
    description: 'High Top',
    features: ['Vintage style', 'Premium canvas', 'Timeless design', 'Free shipping']
  },
  {
    id: 'vans-old-skool',
    name: 'Vans Old Skool',
    price: 69,
    originalPrice: 89,
    discount: 22,
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'sneakers',
    description: 'Black/White',
    features: ['Skate heritage', 'Waffle outsole', 'Iconic stripe', 'Free shipping']
  },
  {
    id: 'puma-suede-classic',
    name: 'Puma Suede Classic',
    price: 79,
    originalPrice: 99,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'sneakers',
    description: 'Peacoat',
    features: ['Suede upper', 'Classic formstrip', 'Retro style', 'Free shipping']
  },
  {
    id: 'asics-gel-kayano-30',
    name: 'ASICS Gel-Kayano 30',
    price: 159,
    originalPrice: 189,
    discount: 16,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'sneakers',
    description: 'Running shoe',
    features: ['Stability running', 'Gel cushioning', 'FlyteFoam', 'Free shipping']
  },
  {
    id: 'on-cloudstratus-3',
    name: 'On Cloudstratus 3',
    price: 169,
    originalPrice: 199,
    discount: 15,
    image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'sneakers',
    description: 'Maximalist running',
    features: ['CloudTec cushioning', 'Swiss engineering', 'Premium comfort', 'Free shipping']
  },
  {
    id: 'hoka-clifton-9',
    name: 'Hoka Clifton 9',
    price: 139,
    originalPrice: 169,
    discount: 18,
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'sneakers',
    description: 'Neutral running',
    features: ['Maximum cushioning', 'Lightweight', 'Everyday comfort', 'Free shipping']
  },
  {
    id: 'allbirds-tree-runners',
    name: 'Allbirds Tree Runners',
    price: 98,
    originalPrice: 118,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'sneakers',
    description: 'Natural White',
    features: ['Sustainable materials', 'Tree fiber', 'Comfortable', 'Free shipping']
  },

  // === GADGETS (12 products) ===
  {
    id: 'smart-robot-vacuum-pro',
    name: 'Smart Robot Vacuum Pro',
    price: 449,
    originalPrice: 549,
    discount: 18,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'gadgets',
    description: 'Auto-mapping, App Control',
    features: ['LiDAR navigation', 'Self-emptying', 'App control', 'Free delivery']
  },
  {
    id: 'dyson-air-purifier-tp07',
    name: 'Dyson Air Purifier TP07',
    price: 549,
    originalPrice: 649,
    discount: 15,
    image: 'https://images.unsplash.com/photo-1585338447937-7082f8fc763d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'gadgets',
    description: 'HEPA Filter, WiFi Enabled',
    features: ['HEPA filtration', 'Real-time air quality', 'Dyson technology', 'Free delivery']
  },
  {
    id: 'sonos-one-gen2',
    name: 'Sonos One Gen2',
    price: 199,
    originalPrice: 249,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'gadgets',
    description: 'Smart Speaker',
    features: ['Voice control', 'Hi-Fi sound', 'Multi-room audio', 'Free delivery']
  },
  {
    id: 'philips-hue-starter-kit',
    name: 'Philips Hue Starter Kit',
    price: 149,
    originalPrice: 199,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1524634126442-357e0eac3c14?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'gadgets',
    description: 'Smart lighting',
    features: ['16 million colors', 'Voice control', 'App control', 'Free delivery']
  },
  {
    id: 'nest-thermostat',
    name: 'Google Nest Thermostat',
    price: 129,
    originalPrice: 169,
    discount: 24,
    image: 'https://images.unsplash.com/photo-1558089687-5a7b3a3e4d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'gadgets',
    description: 'Smart home control',
    features: ['Energy saving', 'Voice control', 'Remote access', 'Free delivery']
  },
  {
    id: 'ring-video-doorbell-pro',
    name: 'Ring Video Doorbell Pro',
    price: 179,
    originalPrice: 229,
    discount: 22,
    image: 'https://images.unsplash.com/photo-1556302487-0e97e34fa26e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'gadgets',
    description: 'Home security',
    features: ['1080p HD video', 'Two-way talk', 'Motion detection', 'Free delivery']
  },
  {
    id: 'anker-power-bank-737',
    name: 'Anker Power Bank 737',
    price: 149,
    originalPrice: 179,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1625945277632-0ebf1c0db4e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'gadgets',
    description: '24000mAh capacity',
    features: ['140W output', 'Fast charging', 'Multiple ports', 'Free delivery']
  },
  {
    id: 'bose-quietcomfort-45',
    name: 'Bose QuietComfort 45',
    price: 279,
    originalPrice: 329,
    discount: 15,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'gadgets',
    description: 'Wireless headphones',
    features: ['Active noise cancellation', 'Premium sound', '24h battery', 'Free delivery']
  },
  {
    id: 'sony-wh-1000xm5',
    name: 'Sony WH-1000XM5',
    price: 349,
    originalPrice: 399,
    discount: 13,
    image: 'https://images.unsplash.com/photo-1599669454699-248893623440?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'gadgets',
    description: 'Premium headphones',
    features: ['Industry-leading ANC', 'LDAC codec', '30h battery', 'Free delivery']
  },
  {
    id: 'amazon-echo-show-15',
    name: 'Amazon Echo Show 15',
    price: 249,
    originalPrice: 299,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'gadgets',
    description: 'Smart display',
    features: ['15.6" Full HD', 'Alexa built-in', 'Smart home hub', 'Free delivery']
  },
  {
    id: 'dji-mini-4-pro',
    name: 'DJI Mini 4 Pro',
    price: 759,
    originalPrice: 899,
    discount: 16,
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'gadgets',
    description: 'Compact drone',
    features: ['4K HDR video', 'Obstacle avoidance', 'Long flight time', 'Free delivery']
  },
  {
    id: 'gopro-hero-12-black',
    name: 'GoPro HERO12 Black',
    price: 349,
    originalPrice: 399,
    discount: 13,
    image: 'https://images.unsplash.com/photo-1590179068383-b9c69aacebd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'gadgets',
    description: 'Action camera',
    features: ['5.3K video', 'HyperSmooth 6.0', 'Waterproof', 'Free delivery']
  },
];
