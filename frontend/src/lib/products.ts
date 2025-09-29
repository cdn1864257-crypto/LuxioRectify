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
  // === SMARTPHONES (20 products) ===
  {
    id: 'iphone-15-pro-max',
    name: 'iPhone 15 Pro Max',
    price: 1299,
    originalPrice: 1599,
    discount: 19,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'smartphones',
    description: '512GB, Natural Titanium',
    features: ['A17 Pro chip', 'Titanium design', 'Advanced camera system', 'Free shipping']
  },
  {
    id: 'galaxy-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra',
    price: 1199,
    originalPrice: 1449,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'smartphones',
    description: '256GB, Titanium Black',
    features: ['S Pen included', '200MP camera', '5000mAh battery', 'Free shipping']
  },
  {
    id: 'pixel-8-pro',
    name: 'Google Pixel 8 Pro',
    price: 899,
    originalPrice: 1099,
    discount: 18,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'smartphones',
    description: '256GB, Bay Blue',
    features: ['Google Tensor G3', 'AI photography', 'Pure Android', 'Free shipping']
  },
  {
    id: 'oneplus-12-pro',
    name: 'OnePlus 12 Pro',
    price: 799,
    originalPrice: 999,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'smartphones',
    description: '512GB, Silky Black',
    features: ['Snapdragon 8 Gen 3', 'Fast charging', 'OxygenOS', 'Free shipping']
  },
  {
    id: 'xiaomi-14-ultra',
    name: 'Xiaomi 14 Ultra',
    price: 699,
    originalPrice: 899,
    discount: 22,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'smartphones',
    description: '512GB, Titanium Gray',
    features: ['Leica cameras', 'Snapdragon 8 Gen 3', 'MIUI 15', 'Free shipping']
  },
  {
    id: 'oppo-find-x7-pro',
    name: 'OPPO Find X7 Pro',
    price: 649,
    originalPrice: 799,
    discount: 19,
    image: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'smartphones',
    description: '256GB, Ocean Blue',
    features: ['Hasselblad camera', 'ColorOS 14', 'Fast charging', 'Free shipping']
  },
  {
    id: 'vivo-x100-pro',
    name: 'Vivo X100 Pro',
    price: 599,
    originalPrice: 749,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'smartphones',
    description: '256GB, Asteroid Black',
    features: ['Zeiss optics', 'MediaTek Dimensity', 'OriginOS', 'Free shipping']
  },
  {
    id: 'honor-magic-6-pro',
    name: 'Honor Magic 6 Pro',
    price: 549,
    originalPrice: 699,
    discount: 21,
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'smartphones',
    description: '512GB, Epi Green',
    features: ['Snapdragon 8 Gen 3', 'MagicOS 8', 'Fast charging', 'Free shipping']
  },
  {
    id: 'realme-gt5-pro',
    name: 'Realme GT5 Pro',
    price: 499,
    originalPrice: 599,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1607936528207-1e53e8b73e3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'smartphones',
    description: '256GB, Mars Orange',
    features: ['Snapdragon 8 Gen 2', 'Realme UI 5', 'Gaming focus', 'Free shipping']
  },
  {
    id: 'nothing-phone-2a',
    name: 'Nothing Phone (2a)',
    price: 399,
    originalPrice: 499,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'smartphones',
    description: '256GB, Milk White',
    features: ['Unique design', 'Glyph interface', 'Nothing OS', 'Free shipping']
  },
  {
    id: 'motorola-edge-50-pro',
    name: 'Motorola Edge 50 Pro',
    price: 449,
    originalPrice: 549,
    discount: 18,
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'smartphones',
    description: '256GB, Moonlight Pearl',
    features: ['Snapdragon 7 Gen 3', 'Moto gestures', 'Clean Android', 'Free shipping']
  },
  {
    id: 'asus-rog-phone-8',
    name: 'ASUS ROG Phone 8',
    price: 899,
    originalPrice: 1099,
    discount: 18,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'smartphones',
    description: '512GB, Phantom Black',
    features: ['Gaming beast', 'AirTriggers', 'ROG UI', 'Free shipping']
  },
  {
    id: 'sony-xperia-1-vi',
    name: 'Sony Xperia 1 VI',
    price: 1099,
    originalPrice: 1299,
    discount: 15,
    image: 'https://images.unsplash.com/photo-1605170439023-1f882e6def5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'smartphones',
    description: '256GB, Platinum Silver',
    features: ['4K OLED display', 'Alpha camera tech', 'Pro features', 'Free shipping']
  },
  {
    id: 'redmi-note-13-pro',
    name: 'Redmi Note 13 Pro',
    price: 299,
    originalPrice: 399,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1596215143922-eedeafc7e66d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'smartphones',
    description: '256GB, Midnight Black',
    features: ['Snapdragon 7s Gen 2', 'MIUI 14', 'Great value', 'Free shipping']
  },
  {
    id: 'poco-f6-pro',
    name: 'POCO F6 Pro',
    price: 349,
    originalPrice: 449,
    discount: 22,
    image: 'https://images.unsplash.com/photo-1569690468000-b94c8aa2a67e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'smartphones',
    description: '256GB, Yellow',
    features: ['Flagship killer', 'Snapdragon 8 Gen 2', 'POCO UI', 'Free shipping']
  },
  {
    id: 'fairphone-5',
    name: 'Fairphone 5',
    price: 699,
    originalPrice: 799,
    discount: 13,
    image: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'smartphones',
    description: '256GB, Sky Blue',
    features: ['Sustainable design', 'Repairable', 'Ethical', 'Free shipping']
  },
  {
    id: 'nokia-x100',
    name: 'Nokia X100',
    price: 249,
    originalPrice: 299,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1594736797933-d0cc01e17207?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'smartphones',
    description: '128GB, Nordic Blue',
    features: ['Clean Android', 'Nokia quality', 'Affordable', 'Free shipping']
  },
  {
    id: 'tcl-50-pro-nxtpaper',
    name: 'TCL 50 Pro NXTPAPER',
    price: 399,
    originalPrice: 499,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'smartphones',
    description: '256GB, Ink Black',
    features: ['NXTPAPER display', 'Eye comfort', 'Unique tech', 'Free shipping']
  },
  {
    id: 'huawei-pura-70-pro',
    name: 'Huawei Pura 70 Pro',
    price: 799,
    originalPrice: 999,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1581693107825-7c5b2adf17b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'smartphones',
    description: '512GB, Golden Hour',
    features: ['Leica cameras', 'HarmonyOS', 'Premium build', 'Free shipping']
  },
  {
    id: 'cat-s75',
    name: 'CAT S75',
    price: 599,
    originalPrice: 699,
    discount: 14,
    image: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'smartphones',
    description: '128GB, Black',
    features: ['Rugged design', 'Satellite messaging', 'IP68 rating', 'Free shipping']
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
    image: 'https://images.unsplash.com/photo-1555353540-bad285ab1b73?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'gadgets',
    description: 'Smart temperature control',
    features: ['Energy saving', 'Voice control', 'Learning AI', 'Free delivery']
  },
  {
    id: 'ring-video-doorbell-4',
    name: 'Ring Video Doorbell 4',
    price: 199,
    originalPrice: 249,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1521985894356-8e3f3b8b1891?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'gadgets',
    description: 'Smart doorbell',
    features: ['HD video', 'Motion detection', 'Two-way talk', 'Free delivery']
  },
  {
    id: 'arlo-pro-5s',
    name: 'Arlo Pro 5S',
    price: 249,
    originalPrice: 299,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1614349128068-87897e9395ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'gadgets',
    description: 'Wireless security camera',
    features: ['2K HDR video', 'Color night vision', 'Wireless', 'Free delivery']
  },
  {
    id: 'amazon-echo-show-15',
    name: 'Amazon Echo Show 15',
    price: 249,
    originalPrice: 299,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1561580125-028ee3bd62eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'gadgets',
    description: '15.6" Smart Display',
    features: ['Large display', 'Smart home hub', 'Alexa built-in', 'Free delivery']
  },
  {
    id: 'apple-tv-4k-128gb',
    name: 'Apple TV 4K 128GB',
    price: 149,
    originalPrice: 179,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1586901533048-0e856dff2c0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'gadgets',
    description: '3rd Generation',
    features: ['4K HDR', 'A15 Bionic chip', 'Siri Remote', 'Free delivery']
  },
  {
    id: 'tile-mate-4-pack',
    name: 'Tile Mate 4-Pack',
    price: 59,
    originalPrice: 79,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'gadgets',
    description: 'Bluetooth trackers',
    features: ['Find your items', '200ft range', 'Loud ring', 'Free delivery']
  },
  {
    id: 'anker-powercore-26800',
    name: 'Anker PowerCore 26800',
    price: 49,
    originalPrice: 69,
    discount: 29,
    image: 'https://images.unsplash.com/photo-1631727388935-b92c77302b9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'gadgets',
    description: 'Portable charger',
    features: ['26800mAh capacity', 'Fast charging', 'Multiple ports', 'Free delivery']
  },
  {
    id: 'samsung-t7-shield-2tb',
    name: 'Samsung T7 Shield 2TB',
    price: 199,
    originalPrice: 249,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1642765914530-b89a1e28b8b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'gadgets',
    description: 'Portable SSD',
    features: ['Rugged design', 'USB 3.2 Gen 2', 'Password protection', 'Free delivery']
  },

  // === MOBILITY (6 products) ===
  {
    id: 'xiaomi-electric-scooter-4-pro',
    name: 'Xiaomi Electric Scooter 4 Pro',
    price: 599,
    originalPrice: 699,
    discount: 14,
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    category: 'mobility',
    description: 'Max Speed: 25km/h, Range: 55km',
    features: ['25km/h top speed', '55km range', 'App connectivity', 'Free shipping & assembly']
  },
  {
    id: 'segway-ninebot-max-g2',
    name: 'Segway Ninebot Max G2',
    price: 749,
    originalPrice: 849,
    discount: 12,
    image: 'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    category: 'mobility',
    description: 'Premium electric scooter',
    features: ['30km/h top speed', '70km range', 'Self-healing tires', 'Free shipping & assembly']
  },
  {
    id: 'vanmoof-s5',
    name: 'VanMoof S5',
    price: 2198,
    originalPrice: 2498,
    discount: 12,
    image: 'https://images.unsplash.com/photo-1558618047-dad7f8ea2804?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    category: 'mobility',
    description: 'Smart electric bike',
    features: ['Integrated technology', 'Anti-theft system', 'App connected', 'Free shipping & assembly']
  },
  {
    id: 'rad-power-radrunner-3',
    name: 'Rad Power RadRunner 3',
    price: 1399,
    originalPrice: 1599,
    discount: 13,
    image: 'https://images.unsplash.com/photo-1558943501-9cf4e3a30b78?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    category: 'mobility',
    description: 'Utility electric bike',
    features: ['750W motor', '65km range', 'Cargo capacity', 'Free shipping & assembly']
  },
  {
    id: 'boosted-rev',
    name: 'Boosted Rev',
    price: 1599,
    originalPrice: 1899,
    discount: 16,
    image: 'https://images.unsplash.com/photo-1544191696-15693072ce2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    category: 'mobility',
    description: 'Premium electric scooter',
    features: ['38km/h top speed', '35km range', 'Premium build', 'Free shipping & assembly']
  },
  {
    id: 'onewheel-gt',
    name: 'Onewheel GT',
    price: 2199,
    originalPrice: 2499,
    discount: 12,
    image: 'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    category: 'mobility',
    description: 'Self-balancing board',
    features: ['Unique experience', '50km range', 'All-terrain', 'Free shipping & assembly']
  }
];

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};