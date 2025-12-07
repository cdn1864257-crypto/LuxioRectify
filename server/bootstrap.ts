import { initializeSecrets } from '../utils/secrets-manager.js';
import { getMongoPool } from '../utils/mongodb-pool.js';
import emailQueue from '../utils/email-queue.js';
import { ensureSessionIndexes } from './session-service.js';

export async function initializeServices(): Promise<void> {
  console.log('[Bootstrap] Initializing services...');
  
  try {
    initializeSecrets();
    console.log('[Bootstrap] ✅ Secrets manager initialized');
  } catch (error) {
    console.error('[Bootstrap] ⚠️  Secrets manager initialization failed:', error);
  }

  try {
    const mongoPool = getMongoPool();
    const isConnected = mongoPool.isConnected();
    if (!isConnected) {
      await mongoPool.getClient();
    }
    console.log('[Bootstrap] ✅ MongoDB connection pool initialized');
  } catch (error) {
    console.error('[Bootstrap] ⚠️  MongoDB pool initialization failed:', error);
  }

  try {
    await ensureSessionIndexes();
    console.log('[Bootstrap] ✅ Session indexes initialized');
  } catch (error) {
    console.error('[Bootstrap] ⚠️  Session indexes initialization failed:', error);
  }

  console.log('[Bootstrap] ✅ Email queue initialized');
  
  console.log('[Bootstrap] All services initialized successfully');
}
