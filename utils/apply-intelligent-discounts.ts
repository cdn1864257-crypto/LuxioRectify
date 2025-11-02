#!/usr/bin/env tsx
/**
 * Script pour appliquer les réductions intelligentes à tous les produits
 * Utilisation: tsx utils/apply-intelligent-discounts.ts
 */

import { writeFileSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { 
  calculateIntelligentDiscount, 
  applyDiscount, 
  displayDiscountRules 
} from './intelligent-pricing.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface ProductVariant {
  color?: string;
  capacity?: string;
  price: number;
  originalPrice: number;
  image?: string;
}

interface Product {
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

async function applyIntelligentDiscounts() {
  console.log('🚀 Application des réductions intelligentes aux produits Luxio\n');
  
  // Afficher les règles de réduction
  displayDiscountRules();

  // Importer les produits
  console.log('📦 Chargement des produits...\n');
  const productsModule = await import('../frontend/src/lib/products.js');
  const products: Product[] = productsModule.products;

  if (!products || products.length === 0) {
    console.error('❌ Aucun produit trouvé');
    process.exit(1);
  }

  console.log(`✅ ${products.length} produits chargés\n`);
  console.log('💰 Calcul des nouveaux prix avec réductions intelligentes...\n');

  let updatedCount = 0;
  const updates: Array<{
    name: string;
    category: string;
    oldPrice: number;
    newPrice: number;
    oldDiscount: number;
    newDiscount: number;
    savings: number;
  }> = [];

  // Parcourir chaque produit
  for (const product of products) {
    // Définir le prix original si non défini (utiliser le prix actuel + 30%)
    const originalPrice = product.originalPrice || Math.round(product.price * 1.3);
    
    // Calculer le nouveau taux de réduction intelligent
    const newDiscountRate = calculateIntelligentDiscount(product.category, originalPrice);
    const newPrice = applyDiscount(originalPrice, newDiscountRate);
    const oldDiscount = product.discount || 0;

    // Enregistrer les changements
    if (product.price !== newPrice || oldDiscount !== newDiscountRate) {
      updates.push({
        name: product.name,
        category: product.category,
        oldPrice: product.price,
        newPrice: newPrice,
        oldDiscount: oldDiscount,
        newDiscount: newDiscountRate,
        savings: originalPrice - newPrice
      });
      
      product.originalPrice = originalPrice;
      product.price = newPrice;
      product.discount = newDiscountRate;
      updatedCount++;
    }

    // Appliquer aussi aux variantes si elles existent
    if (product.variants && product.variants.length > 0) {
      for (const variant of product.variants) {
        const variantOriginalPrice = variant.originalPrice;
        const variantNewDiscountRate = calculateIntelligentDiscount(product.category, variantOriginalPrice);
        const variantNewPrice = applyDiscount(variantOriginalPrice, variantNewDiscountRate);
        
        if (variant.price !== variantNewPrice) {
          variant.price = variantNewPrice;
        }
      }
    }
  }

  // Afficher le résumé des changements
  console.log('📊 Résumé des changements:\n');
  console.log('='.repeat(100));
  console.log(
    'Produit'.padEnd(40) + 
    'Catégorie'.padEnd(20) + 
    'Ancien prix'.padEnd(15) + 
    'Nouveau prix'.padEnd(15) + 
    'Réduction'.padEnd(10)
  );
  console.log('='.repeat(100));

  // Grouper par catégorie
  const byCategory = new Map<string, typeof updates>();
  updates.forEach(update => {
    if (!byCategory.has(update.category)) {
      byCategory.set(update.category, []);
    }
    byCategory.get(update.category)!.push(update);
  });

  // Afficher par catégorie
  byCategory.forEach((categoryUpdates, category) => {
    const categoryName = {
      'smartphones': '📱 SMARTPHONES',
      'watches': '⌚ MONTRES',
      'sneakers': '👟 SNEAKERS',
      'home-gadgets': '🏠 GADGETS',
      'mobility': '🛴 MOBILITÉ'
    }[category] || category.toUpperCase();

    console.log(`\n${categoryName}`);
    console.log('-'.repeat(100));
    
    categoryUpdates.forEach(update => {
      console.log(
        update.name.substring(0, 38).padEnd(40) + 
        update.category.padEnd(20) + 
        `${update.oldPrice}€`.padEnd(15) + 
        `${update.newPrice}€`.padEnd(15) + 
        `${update.newDiscount}%`
      );
    });
  });

  console.log('\n' + '='.repeat(100));
  console.log(`\n✅ ${updatedCount} produits mis à jour avec succès!`);

  // Calculer les économies totales pour les clients
  const totalSavings = updates.reduce((sum, update) => sum + update.savings, 0);
  const averageDiscount = updates.length > 0 
    ? Math.round(updates.reduce((sum, update) => sum + update.newDiscount, 0) / updates.length)
    : 0;

  console.log(`\n💰 Statistiques:`);
  console.log(`   - Réduction moyenne: ${averageDiscount}%`);
  console.log(`   - Économies totales disponibles: ${totalSavings.toLocaleString()}€`);
  console.log(`   - Prix moyen avant: ${Math.round(updates.reduce((sum, u) => sum + u.oldPrice, 0) / updates.length)}€`);
  console.log(`   - Prix moyen après: ${Math.round(updates.reduce((sum, u) => sum + u.newPrice, 0) / updates.length)}€`);

  console.log('\n🎉 Réductions intelligentes appliquées avec succès!\n');
  
  // Persister les modifications dans le fichier products.ts
  console.log('💾 Sauvegarde des modifications dans le fichier products.ts...');
  
  try {
    const productsFilePath = join(__dirname, '../frontend/src/lib/products.ts');
    
    // Lire le fichier original pour préserver les interfaces
    const originalContent = readFileSync(productsFilePath, 'utf-8');
    
    // Extraire les interfaces du début du fichier
    const interfacesMatch = originalContent.match(/^([\s\S]*?export const products)/);
    const interfacesContent = interfacesMatch ? interfacesMatch[1] : `export interface ProductVariant {
  color?: string;
  capacity?: string;
  price: number;
  originalPrice: number;
  image?: string;
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

export const products`;
    
    // Convertir les produits en format TypeScript
    const productsContent = JSON.stringify(products, null, 2)
      .replace(/"([^"]+)":/g, '$1:');  // Enlever les guillemets des clés
    
    // Créer le nouveau contenu du fichier
    const newFileContent = `${interfacesContent}: Product[] = ${productsContent};\n`;
    
    // Écrire le fichier
    writeFileSync(productsFilePath, newFileContent, 'utf-8');
    
    console.log('✅ Fichier products.ts mis à jour avec succès!\n');
    console.log('📁 Emplacement: frontend/src/lib/products.ts');
    console.log(`📊 ${updatedCount} produits modifiés et sauvegardés\n`);
  } catch (error) {
    console.error('❌ Erreur lors de la sauvegarde du fichier:', error);
    console.error('   Les modifications ont été appliquées en mémoire mais pas persistées.');
    process.exit(1);
  }
  
  console.log('💡 Note: Pour appliquer ces changements à la base de données MongoDB,');
  console.log('   exécutez: npm run seed:products:upsert\n');
}

// Exécuter le script
applyIntelligentDiscounts().catch(error => {
  console.error('❌ Erreur lors de l\'application des réductions:', error);
  process.exit(1);
});
