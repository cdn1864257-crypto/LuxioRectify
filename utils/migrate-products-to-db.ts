import { MongoClient } from 'mongodb';
// @ts-ignore - TypeScript import in Node.js script
import { products } from '../frontend/src/lib/products';

/**
 * Migration script to import static products to MongoDB
 * Run with: npx ts-node utils/migrate-products-to-db.ts
 */

async function migrateProducts() {
  const mongoUri = process.env.MONGODB_URI;
  
  if (!mongoUri) {
    console.error('❌ MONGODB_URI environment variable is not set');
    process.exit(1);
  }

  const client = new MongoClient(mongoUri);

  try {
    console.log('🔌 Connecting to MongoDB...');
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db('luxio');
    const productsCollection = db.collection('products');

    // Check if products already exist
    const existingCount = await productsCollection.countDocuments();
    if (existingCount > 0) {
      console.log(`⚠️  Database already contains ${existingCount} products`);
      console.log('Do you want to:');
      console.log('  1. Skip migration (keep existing products)');
      console.log('  2. Clear and reimport all products');
      console.log('  3. Add new products only (merge)');
      console.log('\n👉 Recommendation: Run this script only once, or manually manage via /admin/products');
      return;
    }

    console.log(`📦 Importing ${products.length} products from static file...`);

    // Transform products to match MongoDB schema
    const productsToImport = products.map(product => ({
      name: product.name,
      description: product.description || '',
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      image: product.image,
      category: product.category,
      features: product.features || [],
      variants: product.variants || [],
      hasVariants: product.hasVariants || false,
      available: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      // Keep original ID as reference
      originalId: product.id
    }));

    const result = await productsCollection.insertMany(productsToImport);
    
    console.log(`✅ Successfully imported ${result.insertedCount} products`);
    console.log(`\n📊 Summary:`);
    console.log(`   - Total products: ${result.insertedCount}`);
    console.log(`   - Categories: ${[...new Set(products.map(p => p.category))].join(', ')}`);
    console.log(`\n🎉 Migration complete!`);
    console.log(`\n👉 Next steps:`);
    console.log(`   1. Visit /admin/products to manage products`);
    console.log(`   2. Products are now dynamically loaded from MongoDB`);
    console.log(`   3. You can safely archive frontend/src/lib/products.ts`);

  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await client.close();
    console.log('🔌 MongoDB connection closed');
  }
}

// Run migration
migrateProducts()
  .then(() => {
    console.log('\n✨ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Error:', error);
    process.exit(1);
  });
