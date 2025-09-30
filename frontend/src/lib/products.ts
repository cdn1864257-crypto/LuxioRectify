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
  // iPhone 17 Pro Max with variants (Pixmania data)
  {
    id: 'iphone-17-pro-max',
    name: 'iPhone 17 Pro Max',
    price: 1717,
    originalPrice: 2099,
    discount: 18,
    image: '/assets/stock_images/iphone_17_pro_max_si_1febe1b9.jpg',
    category: 'smartphones',
    description: 'From 256GB - 6.9" ProMotion Display',
    features: ['Apple A19 Pro chip', '6.9" LTPO OLED 120Hz', '48MP triple camera', 'Ceramic Shield 2', 'Free shipping'],
    hasVariants: true,
    variants: [
      { color: 'Silver', capacity: '256GB', price: 1717, originalPrice: 2099 },
      { color: 'Silver', capacity: '512GB', price: 2052, originalPrice: 2499 },
      { color: 'Silver', capacity: '1TB', price: 2332, originalPrice: 2799 },
      { color: 'Silver', capacity: '2TB', price: 2890, originalPrice: 3499 },
      { color: 'Cosmic Orange', capacity: '256GB', price: 1717, originalPrice: 2099 },
      { color: 'Cosmic Orange', capacity: '512GB', price: 2052, originalPrice: 2499 },
      { color: 'Cosmic Orange', capacity: '1TB', price: 2333, originalPrice: 2799 },
      { color: 'Cosmic Orange', capacity: '2TB', price: 2918, originalPrice: 3499 },
      { color: 'Deep Blue', capacity: '256GB', price: 1736, originalPrice: 2099 },
      { color: 'Deep Blue', capacity: '512GB', price: 2052, originalPrice: 2499 },
      { color: 'Deep Blue', capacity: '1TB', price: 2332, originalPrice: 2799 },
      { color: 'Deep Blue', capacity: '2TB', price: 2863, originalPrice: 3499 },
    ]
  },
  // iPhone 17 Pro with variants (Pixmania data)
  {
    id: 'iphone-17-pro',
    name: 'iPhone 17 Pro',
    price: 1469,
    originalPrice: 1799,
    discount: 18,
    image: '/assets/stock_images/iphone_17_pro_silver_a2fb0732.jpg',
    category: 'smartphones',
    description: 'From 256GB - 6.3" ProMotion Display',
    features: ['Apple A19 Pro chip', '6.3" LTPO OLED 120Hz', '48MP triple camera', 'Aluminum frame', 'Free shipping'],
    hasVariants: true,
    variants: [
      { color: 'Silver', capacity: '256GB', price: 1539, originalPrice: 1899 },
      { color: 'Silver', capacity: '512GB', price: 1799, originalPrice: 2199 },
      { color: 'Silver', capacity: '1TB', price: 2099, originalPrice: 2499 },
      { color: 'Cosmic Orange', capacity: '256GB', price: 1502, originalPrice: 1899 },
      { color: 'Cosmic Orange', capacity: '512GB', price: 1799, originalPrice: 2199 },
      { color: 'Cosmic Orange', capacity: '1TB', price: 2099, originalPrice: 2499 },
      { color: 'Deep Blue', capacity: '256GB', price: 1469, originalPrice: 1899 },
      { color: 'Deep Blue', capacity: '512GB', price: 1799, originalPrice: 2199 },
      { color: 'Deep Blue', capacity: '1TB', price: 2099, originalPrice: 2499 },
    ]
  },
  // iPhone Air with variants
  {
    id: 'iphone-air',
    name: 'iPhone Air',
    price: 999,
    originalPrice: 1199,
    discount: 17,
    image: '/assets/stock_images/apple_iphone_air_ult_d3cfc5fc.jpg',
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
  // iPhone 17 with variants (Pixmania data)
  {
    id: 'iphone-17',
    name: 'iPhone 17',
    price: 1136,
    originalPrice: 1399,
    discount: 19,
    image: '/assets/stock_images/iphone_17_black_colo_3e2b53d1.jpg',
    category: 'smartphones',
    description: 'From 256GB - 6.3" Display',
    features: ['Apple A19 chip', '6.3" LTPO OLED 120Hz', '48MP dual camera', 'All-day battery', 'Free shipping'],
    hasVariants: true,
    variants: [
      { color: 'Black', capacity: '256GB', price: 1136, originalPrice: 1399 },
      { color: 'Black', capacity: '512GB', price: 1464, originalPrice: 1699 },
      { color: 'White', capacity: '256GB', price: 1148, originalPrice: 1399 },
      { color: 'White', capacity: '512GB', price: 1464, originalPrice: 1699 },
      { color: 'Mist Blue', capacity: '256GB', price: 1136, originalPrice: 1399 },
      { color: 'Mist Blue', capacity: '512GB', price: 1464, originalPrice: 1699 },
      { color: 'Sage', capacity: '256GB', price: 1136, originalPrice: 1399 },
      { color: 'Sage', capacity: '512GB', price: 1464, originalPrice: 1699 },
      { color: 'Lavender', capacity: '256GB', price: 1136, originalPrice: 1399 },
      { color: 'Lavender', capacity: '512GB', price: 1464, originalPrice: 1699 },
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
  // Samsung Galaxy S25 Ultra with variants (Pixmania data)
  {
    id: 'samsung-s25-ultra',
    name: 'Samsung Galaxy S25 Ultra',
    price: 948,
    originalPrice: 1472,
    discount: 36,
    image: '/assets/stock_images/samsung_galaxy_s25_u_1c4ee831.jpg',
    category: 'smartphones',
    description: 'From 256GB - S Pen included',
    features: ['Snapdragon 8 Elite', '6.9" Dynamic AMOLED 120Hz', '200MP quad camera', 'S Pen stylus', 'Free shipping'],
    hasVariants: true,
    variants: [
      { color: 'Titanium Blue', capacity: '256GB', price: 989, originalPrice: 1539 },
      { color: 'Titanium Blue', capacity: '512GB', price: 1089, originalPrice: 1599 },
      { color: 'Titanium Blue', capacity: '1TB', price: 1299, originalPrice: 1799 },
      { color: 'Titanium Black', capacity: '256GB', price: 948, originalPrice: 1472 },
      { color: 'Titanium Black', capacity: '512GB', price: 1089, originalPrice: 1599 },
      { color: 'Titanium Black', capacity: '1TB', price: 1299, originalPrice: 1799 },
      { color: 'Titanium White Silver', capacity: '256GB', price: 960, originalPrice: 1472 },
      { color: 'Titanium White Silver', capacity: '512GB', price: 1089, originalPrice: 1599 },
      { color: 'Titanium White Silver', capacity: '1TB', price: 1299, originalPrice: 1799 },
      { color: 'Titanium Gray', capacity: '256GB', price: 960, originalPrice: 1472 },
      { color: 'Titanium Gray', capacity: '512GB', price: 1089, originalPrice: 1599 },
      { color: 'Titanium Gray', capacity: '1TB', price: 1299, originalPrice: 1799 },
    ]
  },
  // Samsung Galaxy S25 with variants (Pixmania data)
  {
    id: 'samsung-s25',
    name: 'Samsung Galaxy S25',
    price: 578,
    originalPrice: 949,
    discount: 39,
    image: '/assets/stock_images/samsung_galaxy_s25_n_037e580a.jpg',
    category: 'smartphones',
    description: 'From 128GB - Compact flagship',
    features: ['Snapdragon 8 Elite', '6.2" Dynamic AMOLED 120Hz', '50MP triple camera', 'Armor aluminum frame', 'Free shipping'],
    hasVariants: true,
    variants: [
      { color: 'Blue', capacity: '128GB', price: 595, originalPrice: 949 },
      { color: 'Blue', capacity: '256GB', price: 649, originalPrice: 959 },
      { color: 'Blue', capacity: '512GB', price: 812, originalPrice: 1079 },
      { color: 'Mint', capacity: '128GB', price: 603, originalPrice: 899 },
      { color: 'Mint', capacity: '256GB', price: 670, originalPrice: 959 },
      { color: 'Mint', capacity: '512GB', price: 812, originalPrice: 1079 },
      { color: 'Navy', capacity: '128GB', price: 616, originalPrice: 899 },
      { color: 'Navy', capacity: '256GB', price: 646, originalPrice: 959 },
      { color: 'Navy', capacity: '512GB', price: 799, originalPrice: 1079 },
      { color: 'Silver', capacity: '128GB', price: 578, originalPrice: 899 },
      { color: 'Silver', capacity: '256GB', price: 665, originalPrice: 959 },
      { color: 'Silver', capacity: '512GB', price: 842, originalPrice: 1079 },
      { color: 'Black', capacity: '128GB', price: 654, originalPrice: 899 },
      { color: 'Black', capacity: '256GB', price: 692, originalPrice: 959 },
      { color: 'Black', capacity: '512GB', price: 893, originalPrice: 1079 },
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
    image: '/assets/stock_images/google_pixel_10_pro__7df7241d.jpg',
    category: 'smartphones',
    description: 'From 128GB - 6.3" Super Actua Display',
    features: ['Google Tensor G5', '6.3" LTPO OLED 120Hz', '50MP + 48MP cameras', '7 years updates', 'Free shipping'],
    hasVariants: true,
    variants: [
      { color: 'Obsidian', capacity: '128GB', price: 899, originalPrice: 999 },
      { color: 'Obsidian', capacity: '256GB', price: 999, originalPrice: 1099 },
      { color: 'Obsidian', capacity: '512GB', price: 1199, originalPrice: 1299 },
      { color: 'Obsidian', capacity: '1TB', price: 1449, originalPrice: 1599 },
      { color: 'Porcelain', capacity: '128GB', price: 899, originalPrice: 999 },
      { color: 'Porcelain', capacity: '256GB', price: 999, originalPrice: 1099 },
      { color: 'Porcelain', capacity: '512GB', price: 1199, originalPrice: 1299 },
      { color: 'Porcelain', capacity: '1TB', price: 1449, originalPrice: 1599 },
      { color: 'Jade', capacity: '128GB', price: 899, originalPrice: 999 },
      { color: 'Jade', capacity: '256GB', price: 999, originalPrice: 1099 },
      { color: 'Jade', capacity: '512GB', price: 1199, originalPrice: 1299 },
      { color: 'Moonstone', capacity: '128GB', price: 899, originalPrice: 999 },
      { color: 'Moonstone', capacity: '256GB', price: 999, originalPrice: 1099 },
      { color: 'Moonstone', capacity: '512GB', price: 1199, originalPrice: 1299 },
    ]
  },
  // OnePlus 13 with variants
  {
    id: 'oneplus-13',
    name: 'OnePlus 13',
    price: 749,
    originalPrice: 899,
    discount: 17,
    image: '/assets/stock_images/oneplus_13_smartphon_60b38945.jpg',
    category: 'smartphones',
    description: 'From 256GB - 6.82" AMOLED Display',
    features: ['Snapdragon 8 Elite', 'Triple 50MP cameras', '6000mAh + 100W charging', 'IP68/IP69', 'Free shipping'],
    hasVariants: true,
    variants: [
      { color: 'Black Eclipse', capacity: '256GB', price: 749, originalPrice: 899 },
      { color: 'Black Eclipse', capacity: '512GB', price: 899, originalPrice: 1049 },
      { color: 'Black Eclipse', capacity: '1TB', price: 1099, originalPrice: 1249 },
      { color: 'Arctic Dawn', capacity: '256GB', price: 749, originalPrice: 899 },
      { color: 'Arctic Dawn', capacity: '512GB', price: 899, originalPrice: 1049 },
      { color: 'Arctic Dawn', capacity: '1TB', price: 1099, originalPrice: 1249 },
      { color: 'Midnight Ocean', capacity: '256GB', price: 749, originalPrice: 899 },
      { color: 'Midnight Ocean', capacity: '512GB', price: 899, originalPrice: 1049 },
      { color: 'Midnight Ocean', capacity: '1TB', price: 1099, originalPrice: 1249 },
    ]
  },
  // Xiaomi 15 with variants
  {
    id: 'xiaomi-15',
    name: 'Xiaomi 15',
    price: 649,
    originalPrice: 749,
    discount: 13,
    image: '/assets/stock_images/xiaomi_15_standard_s_12e3b53c.jpg',
    category: 'smartphones',
    description: 'From 256GB - 6.36" LTPO AMOLED',
    features: ['Snapdragon 8 Elite', 'Triple 50MP Leica', '5240mAh + 90W charging', 'IP68', 'Free shipping'],
    hasVariants: true,
    variants: [
      { color: 'Black', capacity: '256GB', price: 649, originalPrice: 749 },
      { color: 'Black', capacity: '512GB', price: 799, originalPrice: 899 },
      { color: 'Black', capacity: '1TB', price: 999, originalPrice: 1099 },
      { color: 'White', capacity: '256GB', price: 649, originalPrice: 749 },
      { color: 'White', capacity: '512GB', price: 799, originalPrice: 899 },
      { color: 'White', capacity: '1TB', price: 999, originalPrice: 1099 },
      { color: 'Liquid Silver', capacity: '256GB', price: 649, originalPrice: 749 },
      { color: 'Liquid Silver', capacity: '512GB', price: 799, originalPrice: 899 },
      { color: 'Lilac', capacity: '256GB', price: 649, originalPrice: 749 },
      { color: 'Lilac', capacity: '512GB', price: 799, originalPrice: 899 },
    ]
  },
  // Xiaomi 15 Ultra with variants
  {
    id: 'xiaomi-15-ultra',
    name: 'Xiaomi 15 Ultra',
    price: 1349,
    originalPrice: 1499,
    discount: 10,
    image: '/assets/stock_images/xiaomi_15_ultra_smar_fa0cfae3.jpg',
    category: 'smartphones',
    description: 'From 256GB - 6.73" LTPO AMOLED',
    features: ['Snapdragon 8 Elite', '200MP Leica telephoto', '6000mAh + 90W charging', 'IP68', 'Free shipping'],
    hasVariants: true,
    variants: [
      { color: 'Black', capacity: '256GB', price: 1349, originalPrice: 1499 },
      { color: 'Black', capacity: '512GB', price: 1549, originalPrice: 1699 },
      { color: 'Black', capacity: '1TB', price: 1799, originalPrice: 1999 },
      { color: 'White', capacity: '256GB', price: 1349, originalPrice: 1499 },
      { color: 'White', capacity: '512GB', price: 1549, originalPrice: 1699 },
      { color: 'White', capacity: '1TB', price: 1799, originalPrice: 1999 },
      { color: 'Silver Chrome', capacity: '512GB', price: 1549, originalPrice: 1699 },
      { color: 'Silver Chrome', capacity: '1TB', price: 1799, originalPrice: 1999 },
    ]
  },
  // Google Pixel 9 Pro XL with variants (2024)
  {
    id: 'google-pixel-9-pro-xl',
    name: 'Google Pixel 9 Pro XL',
    price: 989,
    originalPrice: 1099,
    discount: 10,
    image: '/attached_assets/smartphones/google-pixel-9-pro-xl.jpg',
    category: 'smartphones',
    description: 'From 128GB - 6.8" Super Actua Display',
    features: ['Google Tensor G4', '6.8" LTPO OLED 120Hz', '50MP triple camera', '7 years updates', 'Free shipping'],
    hasVariants: true,
    variants: [
      { color: 'Obsidian', capacity: '128GB', price: 989, originalPrice: 1099 },
      { color: 'Obsidian', capacity: '256GB', price: 1079, originalPrice: 1199 },
      { color: 'Obsidian', capacity: '512GB', price: 1259, originalPrice: 1399 },
      { color: 'Obsidian', capacity: '1TB', price: 1529, originalPrice: 1699 },
      { color: 'Porcelain', capacity: '128GB', price: 989, originalPrice: 1099 },
      { color: 'Porcelain', capacity: '256GB', price: 1079, originalPrice: 1199 },
      { color: 'Porcelain', capacity: '512GB', price: 1259, originalPrice: 1399 },
      { color: 'Porcelain', capacity: '1TB', price: 1529, originalPrice: 1699 },
      { color: 'Hazel', capacity: '128GB', price: 989, originalPrice: 1099 },
      { color: 'Hazel', capacity: '256GB', price: 1079, originalPrice: 1199 },
      { color: 'Hazel', capacity: '512GB', price: 1259, originalPrice: 1399 },
      { color: 'Hazel', capacity: '1TB', price: 1529, originalPrice: 1699 },
    ]
  },
  // Motorola Razr 50 Ultra with variants (2024)
  {
    id: 'motorola-razr-50-ultra',
    name: 'Motorola Razr 50 Ultra',
    price: 899,
    originalPrice: 999,
    discount: 10,
    image: '/attached_assets/smartphones/motorola-razr-50-ultra.jpg',
    category: 'smartphones',
    description: 'From 256GB - Flip Phone with 4.0" External Display',
    features: ['Snapdragon 8s Gen 3', '6.9" Foldable AMOLED 165Hz', '50MP dual camera', 'IPX8 water resistance', 'Free shipping'],
    hasVariants: true,
    variants: [
      { color: 'Midnight Blue', capacity: '256GB', price: 899, originalPrice: 999 },
      { color: 'Midnight Blue', capacity: '512GB', price: 1049, originalPrice: 1149 },
      { color: 'Spring Green', capacity: '256GB', price: 899, originalPrice: 999 },
      { color: 'Spring Green', capacity: '512GB', price: 1049, originalPrice: 1149 },
      { color: 'Hot Pink', capacity: '256GB', price: 899, originalPrice: 999 },
      { color: 'Hot Pink', capacity: '512GB', price: 1049, originalPrice: 1149 },
      { color: 'Peach Fuzz', capacity: '256GB', price: 899, originalPrice: 999 },
      { color: 'Peach Fuzz', capacity: '512GB', price: 1049, originalPrice: 1149 },
    ]
  },
  // Poco F6 Pro with variants (2024)
  {
    id: 'poco-f6-pro',
    name: 'Poco F6 Pro',
    price: 324,
    originalPrice: 360,
    discount: 10,
    image: '/attached_assets/smartphones/poco-f6-pro.jpg',
    category: 'smartphones',
    description: 'From 256GB - Flagship Killer',
    features: ['Snapdragon 8 Gen 2', '6.67" WQHD+ AMOLED 120Hz', '50MP triple camera', '120W HyperCharge', 'Free shipping'],
    hasVariants: true,
    variants: [
      { color: 'Black', capacity: '256GB', price: 324, originalPrice: 360 },
      { color: 'Black', capacity: '512GB', price: 414, originalPrice: 460 },
      { color: 'Black', capacity: '1TB', price: 540, originalPrice: 600 },
      { color: 'White', capacity: '256GB', price: 324, originalPrice: 360 },
      { color: 'White', capacity: '512GB', price: 414, originalPrice: 460 },
      { color: 'White', capacity: '1TB', price: 540, originalPrice: 600 },
    ]
  },
  // Oppo Find X7 Ultra with variants (2024)
  {
    id: 'oppo-find-x7-ultra',
    name: 'Oppo Find X7 Ultra',
    price: 752,
    originalPrice: 836,
    discount: 10,
    image: '/attached_assets/smartphones/oppo-find-x7-ultra.jpg',
    category: 'smartphones',
    description: 'From 256GB - Quad Main Camera System',
    features: ['Snapdragon 8 Gen 3', '6.82" LTPO AMOLED 120Hz', '50MP quad camera', 'Hasselblad tuning', 'Free shipping'],
    hasVariants: true,
    variants: [
      { color: 'Ocean Blue', capacity: '256GB', price: 752, originalPrice: 836 },
      { color: 'Ocean Blue', capacity: '512GB', price: 896, originalPrice: 995 },
      { color: 'Sepia Brown', capacity: '256GB', price: 752, originalPrice: 836 },
      { color: 'Sepia Brown', capacity: '512GB', price: 896, originalPrice: 995 },
      { color: 'Tailored Black', capacity: '256GB', price: 752, originalPrice: 836 },
      { color: 'Tailored Black', capacity: '512GB', price: 896, originalPrice: 995 },
    ]
  },
  // Vivo X100 Pro with variants (2024)
  {
    id: 'vivo-x100-pro',
    name: 'Vivo X100 Pro',
    price: 810,
    originalPrice: 900,
    discount: 10,
    image: '/attached_assets/smartphones/vivo-x100-pro.jpg',
    category: 'smartphones',
    description: 'From 256GB - ZEISS Optics',
    features: ['Dimensity 9300', '6.78" LTPO AMOLED 120Hz', '50MP triple ZEISS', '100W fast charging', 'Free shipping'],
    hasVariants: true,
    variants: [
      { color: 'Startrail Blue', capacity: '256GB', price: 810, originalPrice: 900 },
      { color: 'Startrail Blue', capacity: '512GB', price: 945, originalPrice: 1050 },
      { color: 'Startrail Blue', capacity: '1TB', price: 1080, originalPrice: 1200 },
      { color: 'Sunset Orange', capacity: '256GB', price: 810, originalPrice: 900 },
      { color: 'Sunset Orange', capacity: '512GB', price: 945, originalPrice: 1050 },
      { color: 'Sunset Orange', capacity: '1TB', price: 1080, originalPrice: 1200 },
      { color: 'Asteroid Black', capacity: '256GB', price: 810, originalPrice: 900 },
      { color: 'Asteroid Black', capacity: '512GB', price: 945, originalPrice: 1050 },
      { color: 'Asteroid Black', capacity: '1TB', price: 1080, originalPrice: 1200 },
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

export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category);
}
