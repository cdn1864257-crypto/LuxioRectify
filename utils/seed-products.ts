import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';

/**
 * Script pour importer les produits statiques dans MongoDB
 * Usage: npx tsx utils/seed-products.ts
 * 
 * Ce script lit les produits depuis frontend/src/lib/products.ts
 * et les importe dans la collection MongoDB 'products'
 */

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

async function seedProducts() {
  console.log('🌱 Démarrage de l\'importation des produits...\n');

  // Vérifier les variables d'environnement
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('❌ Erreur: MONGODB_URI n\'est pas défini dans les variables d\'environnement');
    console.log('💡 Conseil: Définissez MONGODB_URI dans votre fichier .env');
    process.exit(1);
  }

  try {
    // Importer les produits statiques
    console.log('📦 Chargement des produits statiques...');
    const productsModule = await import('../frontend/src/lib/products.js');
    const staticProducts: Product[] = productsModule.products;
    
    if (!staticProducts || staticProducts.length === 0) {
      console.error('❌ Aucun produit trouvé dans le fichier de produits statiques');
      process.exit(1);
    }

    console.log(`✅ ${staticProducts.length} produits chargés\n`);

    // Connexion à MongoDB
    console.log('🔌 Connexion à MongoDB...');
    const client = new MongoClient(mongoUri);
    
    try {
      await client.connect();
      console.log('✅ Connecté à MongoDB\n');

      const db = client.db('luxio');
      const productsCollection = db.collection('products');

      // Option 1: Supprimer tous les produits existants et réimporter (recommandé pour synchronisation complète)
      console.log('🗑️  Suppression des produits existants...');
      const deleteResult = await productsCollection.deleteMany({});
      console.log(`✅ ${deleteResult.deletedCount} produits supprimés\n`);

      // Préparer les produits pour l'insertion
      const productsToInsert = staticProducts.map(product => {
        const { id, ...productData } = product;
        return {
          _id: id as any, // Utiliser l'ID statique comme _id MongoDB (string)
          ...productData,
          available: true,
          createdAt: new Date(),
          updatedAt: new Date()
        };
      });

      // Insérer les produits
      console.log('📥 Insertion des produits dans MongoDB...');
      const insertResult = await productsCollection.insertMany(productsToInsert, { ordered: false });
      console.log(`✅ ${insertResult.insertedCount} produits insérés avec succès!\n`);

      // Afficher un résumé par catégorie
      console.log('📊 Résumé par catégorie:');
      const categoryCounts: { [key: string]: number } = {};
      staticProducts.forEach(product => {
        categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
      });

      Object.entries(categoryCounts).forEach(([category, count]) => {
        console.log(`   - ${category}: ${count} produits`);
      });

      console.log('\n✨ Importation terminée avec succès!');
      console.log('🎉 Vos produits sont maintenant synchronisés entre le code statique et MongoDB\n');

    } finally {
      await client.close();
      console.log('🔌 Connexion MongoDB fermée');
    }

  } catch (error) {
    console.error('❌ Erreur lors de l\'importation:', error);
    if (error instanceof Error) {
      console.error('Détails:', error.message);
    }
    process.exit(1);
  }
}

// Option 2: Fonction pour mettre à jour sans supprimer (upsert)
async function upsertProducts() {
  console.log('🌱 Démarrage de la mise à jour des produits (upsert)...\n');

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('❌ Erreur: MONGODB_URI n\'est pas défini');
    process.exit(1);
  }

  try {
    const productsModule = await import('../frontend/src/lib/products.js');
    const staticProducts: Product[] = productsModule.products;
    
    console.log(`📦 ${staticProducts.length} produits à synchroniser\n`);

    const client = new MongoClient(mongoUri);
    
    try {
      await client.connect();
      console.log('✅ Connecté à MongoDB\n');

      const db = client.db('luxio');
      const productsCollection = db.collection('products');

      let updatedCount = 0;
      let insertedCount = 0;

      console.log('🔄 Synchronisation en cours...');
      
      for (const product of staticProducts) {
        const { id, ...productData } = product;
        const result = await productsCollection.updateOne(
          { _id: id as any },
          {
            $set: {
              ...productData,
              available: true,
              updatedAt: new Date()
            },
            $setOnInsert: {
              _id: id as any,
              createdAt: new Date()
            }
          },
          { upsert: true }
        );

        if (result.upsertedCount > 0) {
          insertedCount++;
        } else if (result.modifiedCount > 0) {
          updatedCount++;
        }
      }

      console.log(`\n✅ Synchronisation terminée:`);
      console.log(`   - ${insertedCount} produits créés`);
      console.log(`   - ${updatedCount} produits mis à jour`);
      console.log(`   - ${staticProducts.length - insertedCount - updatedCount} produits inchangés\n`);

    } finally {
      await client.close();
    }

  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

// Lire l'argument de ligne de commande
const mode = process.argv[2] || 'replace';

if (mode === 'upsert') {
  upsertProducts();
} else {
  seedProducts();
}
