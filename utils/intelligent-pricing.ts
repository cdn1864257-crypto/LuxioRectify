/**
 * Système de réduction intelligent pour Luxio
 * Applique des taux de réduction optimisés selon la catégorie et la gamme de prix
 */

export interface DiscountRule {
  category: string;
  minPrice: number;
  maxPrice: number;
  discountRate: number;
  description: string;
}

/**
 * Règles de réduction par catégorie et gamme de prix
 * Les taux sont optimisés pour maximiser les ventes tout en maintenant la rentabilité
 */
export const discountRules: DiscountRule[] = [
  // === SMARTPHONES ===
  // Produits premium (>1000€): 15-25% pour stimuler les ventes haut de gamme
  {
    category: 'smartphones',
    minPrice: 1000,
    maxPrice: Infinity,
    discountRate: 19,
    description: 'Smartphones premium - Réduction importante pour stimuler les ventes'
  },
  // Produits milieu de gamme (500-1000€): 20-30% très compétitif
  {
    category: 'smartphones',
    minPrice: 500,
    maxPrice: 999,
    discountRate: 23,
    description: 'Smartphones milieu de gamme - Réduction compétitive'
  },
  // Produits entrée de gamme (<500€): 15-20% pour maintenir la marge
  {
    category: 'smartphones',
    minPrice: 0,
    maxPrice: 499,
    discountRate: 17,
    description: 'Smartphones entrée de gamme - Réduction modérée'
  },

  // === MONTRES CONNECTÉES ===
  // Montres de luxe (>500€): 25-35% pour concurrencer le marché traditionnel
  {
    category: 'watches',
    minPrice: 500,
    maxPrice: Infinity,
    discountRate: 28,
    description: 'Montres connectées premium - Forte réduction'
  },
  // Montres standard (200-500€): 20-30%
  {
    category: 'watches',
    minPrice: 200,
    maxPrice: 499,
    discountRate: 24,
    description: 'Montres connectées standard - Réduction attractive'
  },
  // Montres basiques (<200€): 15-20%
  {
    category: 'watches',
    minPrice: 0,
    maxPrice: 199,
    discountRate: 18,
    description: 'Montres connectées basiques - Réduction modérée'
  },

  // === SNEAKERS ===
  // Sneakers premium/édition limitée (>200€): 25-35% pour écouler les stocks rapidement
  {
    category: 'sneakers',
    minPrice: 200,
    maxPrice: Infinity,
    discountRate: 30,
    description: 'Sneakers premium - Forte réduction pour rotation rapide'
  },
  // Sneakers milieu de gamme (100-200€): 20-30%
  {
    category: 'sneakers',
    minPrice: 100,
    maxPrice: 199,
    discountRate: 25,
    description: 'Sneakers milieu de gamme - Réduction attractive'
  },
  // Sneakers basiques (<100€): 15-25%
  {
    category: 'sneakers',
    minPrice: 0,
    maxPrice: 99,
    discountRate: 20,
    description: 'Sneakers basiques - Réduction standard'
  },

  // === HOME GADGETS ===
  // Gadgets haut de gamme (>300€): 25-35% pour dégager les stocks
  {
    category: 'home-gadgets',
    minPrice: 300,
    maxPrice: Infinity,
    discountRate: 28,
    description: 'Gadgets maison premium - Forte réduction'
  },
  // Gadgets moyens (100-300€): 20-30%
  {
    category: 'home-gadgets',
    minPrice: 100,
    maxPrice: 299,
    discountRate: 24,
    description: 'Gadgets maison standard - Réduction compétitive'
  },
  // Gadgets basiques (<100€): 15-20%
  {
    category: 'home-gadgets',
    minPrice: 0,
    maxPrice: 99,
    discountRate: 18,
    description: 'Gadgets maison basiques - Réduction modérée'
  },

  // === MOBILITÉ (Vélos, trottinettes électriques) ===
  // Produits premium (>1000€): 20-30% pour ce marché spécifique
  {
    category: 'mobility',
    minPrice: 1000,
    maxPrice: Infinity,
    discountRate: 24,
    description: 'Mobilité électrique premium - Réduction importante'
  },
  // Produits moyens (500-1000€): 25-35%
  {
    category: 'mobility',
    minPrice: 500,
    maxPrice: 999,
    discountRate: 28,
    description: 'Mobilité électrique standard - Forte réduction'
  },
  // Produits basiques (<500€): 20-25%
  {
    category: 'mobility',
    minPrice: 0,
    maxPrice: 499,
    discountRate: 22,
    description: 'Mobilité électrique basique - Réduction modérée'
  }
];

/**
 * Calcule le taux de réduction intelligent pour un produit
 * @param category - Catégorie du produit
 * @param originalPrice - Prix original du produit
 * @returns Taux de réduction en pourcentage (0-100)
 */
export function calculateIntelligentDiscount(category: string, originalPrice: number): number {
  // Trouver la règle applicable
  const rule = discountRules.find(
    r => r.category === category && originalPrice >= r.minPrice && originalPrice <= r.maxPrice
  );

  if (rule) {
    return rule.discountRate;
  }

  // Règle par défaut si aucune règle spécifique n'est trouvée
  // Applique 20% pour les produits de plus de 500€, 15% sinon
  return originalPrice >= 500 ? 20 : 15;
}

/**
 * Applique le taux de réduction intelligent à un prix
 * @param originalPrice - Prix original
 * @param discountRate - Taux de réduction (0-100)
 * @returns Prix après réduction (arrondi à l'euro près)
 */
export function applyDiscount(originalPrice: number, discountRate: number): number {
  const discountedPrice = originalPrice * (1 - discountRate / 100);
  return Math.round(discountedPrice);
}

/**
 * Calcule le prix final avec réduction intelligente
 * @param category - Catégorie du produit
 * @param originalPrice - Prix original
 * @returns Objet avec prix final, taux de réduction et économie
 */
export function calculateIntelligentPrice(category: string, originalPrice: number) {
  const discountRate = calculateIntelligentDiscount(category, originalPrice);
  const finalPrice = applyDiscount(originalPrice, discountRate);
  const savings = originalPrice - finalPrice;

  return {
    originalPrice,
    finalPrice,
    discountRate,
    savings,
    savingsPercent: discountRate
  };
}

/**
 * Affiche un résumé des règles de réduction
 */
export function displayDiscountRules() {
  console.log('\n📊 Règles de réduction intelligentes Luxio\n');
  console.log('='.repeat(80));
  
  const categoriesMap = new Map<string, DiscountRule[]>();
  
  // Grouper par catégorie
  discountRules.forEach(rule => {
    if (!categoriesMap.has(rule.category)) {
      categoriesMap.set(rule.category, []);
    }
    categoriesMap.get(rule.category)!.push(rule);
  });

  // Afficher par catégorie
  categoriesMap.forEach((rules, category) => {
    const categoryName = {
      'smartphones': '📱 SMARTPHONES',
      'watches': '⌚ MONTRES CONNECTÉES',
      'sneakers': '👟 SNEAKERS',
      'home-gadgets': '🏠 GADGETS MAISON',
      'mobility': '🛴 MOBILITÉ ÉLECTRIQUE'
    }[category] || category.toUpperCase();

    console.log(`\n${categoryName}`);
    console.log('-'.repeat(80));
    
    rules.forEach(rule => {
      const priceRange = rule.maxPrice === Infinity 
        ? `> ${rule.minPrice}€`
        : `${rule.minPrice}€ - ${rule.maxPrice}€`;
      
      console.log(`  ${priceRange.padEnd(20)} → ${rule.discountRate}% de réduction`);
      console.log(`     ${rule.description}`);
    });
  });
  
  console.log('\n' + '='.repeat(80) + '\n');
}

/**
 * Exemple d'utilisation
 */
export function testIntelligentPricing() {
  console.log('\n🧪 Test du système de réduction intelligent\n');
  
  const testCases = [
    { category: 'smartphones', originalPrice: 1479, name: 'iPhone 17 Pro Max' },
    { category: 'smartphones', originalPrice: 699, name: 'OnePlus 13' },
    { category: 'watches', originalPrice: 449, name: 'Apple Watch Ultra' },
    { category: 'sneakers', originalPrice: 180, name: 'Nike Air Jordan' },
    { category: 'home-gadgets', originalPrice: 399, name: 'Roborock S8 Pro' },
    { category: 'mobility', originalPrice: 899, name: 'Trottinette Xiaomi' }
  ];

  testCases.forEach(test => {
    const result = calculateIntelligentPrice(test.category, test.originalPrice);
    console.log(`\n${test.name} (${test.category})`);
    console.log(`  Prix original: ${result.originalPrice}€`);
    console.log(`  Réduction: ${result.discountRate}%`);
    console.log(`  Prix final: ${result.finalPrice}€`);
    console.log(`  Économie: ${result.savings}€`);
  });

  console.log('\n');
}
