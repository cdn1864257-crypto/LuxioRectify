import { MongoClient, ObjectId, Db, Collection } from 'mongodb';
import crypto from 'crypto';

export interface Session {
  _id?: ObjectId;
  sessionId: string;
  userId: string;
  createdAt: Date;
  expiresAt: Date;
  ipAddress?: string;
  userAgent?: string;
}

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

async function getMongoClient(): Promise<{ client: MongoClient; db: Db }> {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(mongoUri);
  await client.connect();
  const db = client.db('luxio');
  
  cachedClient = client;
  cachedDb = db;
  
  return { client, db };
}

async function getSessionsCollection(): Promise<Collection<Session>> {
  const { db } = await getMongoClient();
  return db.collection<Session>('sessions');
}

export async function ensureSessionIndexes(): Promise<void> {
  const collection = await getSessionsCollection();
  
  await collection.createIndex({ sessionId: 1 }, { unique: true });
  
  await collection.createIndex({ userId: 1 });
  
  await collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
}

export function generateSessionId(): string {
  return crypto.randomBytes(32).toString('hex');
}

export async function createSession(
  userId: string,
  ipAddress?: string,
  userAgent?: string
): Promise<Session> {
  const collection = await getSessionsCollection();
  
  await deleteUserSessions(userId);
  
  const now = new Date();
  const session: Session = {
    sessionId: generateSessionId(),
    userId,
    createdAt: now,
    expiresAt: new Date(now.getTime() + SESSION_DURATION_MS),
    ipAddress,
    userAgent
  };
  
  await collection.insertOne(session);
  
  return session;
}

export async function validateSession(sessionId: string): Promise<Session | null> {
  const collection = await getSessionsCollection();
  
  const session = await collection.findOne({ sessionId });
  
  if (!session) {
    return null;
  }
  
  if (new Date() > session.expiresAt) {
    await collection.deleteOne({ sessionId });
    return null;
  }
  
  return session;
}

export async function deleteSession(sessionId: string): Promise<boolean> {
  const collection = await getSessionsCollection();
  
  const result = await collection.deleteOne({ sessionId });
  
  return result.deletedCount > 0;
}

export async function deleteUserSessions(userId: string): Promise<number> {
  const collection = await getSessionsCollection();
  
  const result = await collection.deleteMany({ userId });
  
  return result.deletedCount;
}

export async function refreshSession(sessionId: string): Promise<Session | null> {
  const collection = await getSessionsCollection();
  
  const now = new Date();
  const newExpiresAt = new Date(now.getTime() + SESSION_DURATION_MS);
  
  const result = await collection.findOneAndUpdate(
    { sessionId, expiresAt: { $gt: now } },
    { $set: { expiresAt: newExpiresAt } },
    { returnDocument: 'after' }
  );
  
  return result || null;
}

export function getSessionCookieOptions(isProduction: boolean) {
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
    domain: isProduction ? (process.env.COOKIE_DOMAIN || '.luxiomarket.shop') : undefined
  };
}
