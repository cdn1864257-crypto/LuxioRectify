import { MongoClient, MongoClientOptions, Db } from 'mongodb';

class MongoDBConnectionPool {
  private client: MongoClient | null = null;
  private connectionPromise: Promise<MongoClient> | null = null;
  private readonly uri: string;
  private readonly options: MongoClientOptions;
  private retryCount = 0;
  private readonly maxRetries = 3;

  constructor(uri: string) {
    this.uri = uri;
    this.options = {
      maxPoolSize: 10,
      minPoolSize: 2,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 10000,
      retryWrites: true,
      retryReads: true,
      maxIdleTimeMS: 60000,
    };
  }

  private async connectWithRetry(): Promise<MongoClient> {
    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        console.log(`[MongoDB] Connection attempt ${attempt + 1}/${this.maxRetries + 1}`);
        const client = new MongoClient(this.uri, this.options);
        await client.connect();
        console.log('[MongoDB] ✅ Successfully connected to MongoDB with connection pooling');
        this.retryCount = 0;
        return client;
      } catch (error) {
        this.retryCount = attempt + 1;
        console.error(`[MongoDB] Connection attempt ${attempt + 1} failed:`, error);
        
        if (attempt === this.maxRetries) {
          throw new Error(`Failed to connect to MongoDB after ${this.maxRetries + 1} attempts`);
        }
        
        const backoffDelay = Math.min(1000 * Math.pow(2, attempt), 10000);
        console.log(`[MongoDB] Retrying in ${backoffDelay}ms...`);
        await new Promise(resolve => setTimeout(resolve, backoffDelay));
      }
    }
    
    throw new Error('MongoDB connection failed');
  }

  async getClient(): Promise<MongoClient> {
    if (this.client) {
      try {
        await this.client.db().admin().ping();
        return this.client;
      } catch (error) {
        console.warn('[MongoDB] Connection lost, reconnecting...');
      }
    }

    if (!this.connectionPromise) {
      this.connectionPromise = this.connectWithRetry()
        .then(client => {
          this.client = client;
          this.connectionPromise = null;
          
          client.on('error', (error) => {
            console.error('[MongoDB] Client error:', error);
          });
          
          client.on('close', () => {
            console.warn('[MongoDB] Connection closed');
            this.client = null;
          });
          
          return client;
        })
        .catch(error => {
          this.connectionPromise = null;
          throw error;
        });
    }

    return this.connectionPromise;
  }

  async getDb(dbName: string = 'luxio'): Promise<Db> {
    const client = await this.getClient();
    return client.db(dbName);
  }

  async execute<T>(
    operation: (db: Db) => Promise<T>,
    dbName: string = 'luxio'
  ): Promise<T> {
    const db = await this.getDb(dbName);
    return operation(db);
  }

  async close(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
      console.log('[MongoDB] Connection pool closed');
    }
  }

  isConnected(): boolean {
    if (!this.client) return false;
    try {
      return true;
    } catch (error) {
      return false;
    }
  }

  getPoolStats() {
    if (!this.client) {
      return { connected: false };
    }

    return {
      connected: this.isConnected(),
      retryCount: this.retryCount,
      maxPoolSize: this.options.maxPoolSize,
      minPoolSize: this.options.minPoolSize,
    };
  }
}

let mongoPool: MongoDBConnectionPool | null = null;

export function getMongoPool(): MongoDBConnectionPool {
  const mongoUri = process.env.MONGODB_URI;
  
  if (!mongoUri) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  if (!mongoPool) {
    mongoPool = new MongoDBConnectionPool(mongoUri);
  }

  return mongoPool;
}

export async function withMongoDb<T>(
  operation: (db: Db) => Promise<T>,
  dbName: string = 'luxio'
): Promise<T> {
  const pool = getMongoPool();
  return pool.execute(operation, dbName);
}

export async function closeMongoPool(): Promise<void> {
  if (mongoPool) {
    await mongoPool.close();
    mongoPool = null;
  }
}

process.on('SIGTERM', async () => {
  console.log('[MongoDB] SIGTERM received, closing connection pool...');
  await closeMongoPool();
});

process.on('SIGINT', async () => {
  console.log('[MongoDB] SIGINT received, closing connection pool...');
  await closeMongoPool();
});
