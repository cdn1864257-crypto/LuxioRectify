import { Db, Collection, ObjectId } from 'mongodb';

export interface UnpaidOrder {
  orderId: string;
  createdAt: Date;
  amount: number;
  status: 'expired' | 'cancelled';
}

export interface UserSuspensionData {
  status: 'active' | 'suspended' | 'blocked';
  suspendedUntil: Date | null;
  unpaidHistory: UnpaidOrder[];
}

const UNPAID_THRESHOLD = 3;
const TRACKING_PERIOD_DAYS = 30;
const SUSPENSION_DURATION_DAYS = 7;

export function getUserStatus(user: any): 'active' | 'suspended' | 'blocked' {
  if (user.status === 'blocked') return 'blocked';
  
  if (user.status === 'suspended' && user.suspendedUntil) {
    const now = new Date();
    if (new Date(user.suspendedUntil) > now) {
      return 'suspended';
    }
    return 'active';
  }
  
  return user.status || 'active';
}

export function isSuspended(user: any): boolean {
  const status = getUserStatus(user);
  return status === 'suspended';
}

export function getSuspensionEndDate(user: any): Date | null {
  if (user.status === 'suspended' && user.suspendedUntil) {
    return new Date(user.suspendedUntil);
  }
  return null;
}

export function countRecentUnpaidOrders(unpaidHistory: UnpaidOrder[]): number {
  if (!unpaidHistory || unpaidHistory.length === 0) return 0;
  
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - TRACKING_PERIOD_DAYS);
  
  return unpaidHistory.filter(order => {
    const orderDate = new Date(order.createdAt);
    return orderDate >= cutoffDate;
  }).length;
}

export async function addUnpaidOrder(
  usersCollection: Collection,
  userEmail: string,
  orderId: string,
  amount: number,
  status: 'expired' | 'cancelled'
): Promise<void> {
  const unpaidOrder: UnpaidOrder = {
    orderId,
    createdAt: new Date(),
    amount,
    status
  };
  
  await usersCollection.updateOne(
    { email: userEmail.toLowerCase() },
    {
      $push: { unpaidHistory: unpaidOrder } as any,
      $set: { updatedAt: new Date() }
    }
  );
  
  console.log(`[Suspension] Added unpaid order ${orderId} to user ${userEmail}`);
}

export async function checkAndApplySuspension(
  usersCollection: Collection,
  userEmail: string
): Promise<{ suspended: boolean; unpaidCount: number }> {
  const user = await usersCollection.findOne({ email: userEmail.toLowerCase() });
  
  if (!user) {
    throw new Error('User not found');
  }
  
  const unpaidHistory = user.unpaidHistory || [];
  const recentUnpaidCount = countRecentUnpaidOrders(unpaidHistory);
  
  console.log(`[Suspension] User ${userEmail} has ${recentUnpaidCount} recent unpaid orders`);
  
  if (recentUnpaidCount >= UNPAID_THRESHOLD && user.status !== 'suspended') {
    const suspensionEndDate = new Date();
    suspensionEndDate.setDate(suspensionEndDate.getDate() + SUSPENSION_DURATION_DAYS);
    
    await usersCollection.updateOne(
      { email: userEmail.toLowerCase() },
      {
        $set: {
          status: 'suspended',
          suspendedUntil: suspensionEndDate,
          updatedAt: new Date()
        }
      }
    );
    
    console.log(`[Suspension] ⚠️ User ${userEmail} has been suspended until ${suspensionEndDate.toISOString()}`);
    
    return { suspended: true, unpaidCount: recentUnpaidCount };
  }
  
  return { suspended: false, unpaidCount: recentUnpaidCount };
}

export async function liftSuspension(
  usersCollection: Collection,
  userEmail: string
): Promise<void> {
  await usersCollection.updateOne(
    { email: userEmail.toLowerCase() },
    {
      $set: {
        status: 'active',
        suspendedUntil: null,
        updatedAt: new Date()
      }
    }
  );
  
  console.log(`[Suspension] ✅ Suspension lifted for user ${userEmail}`);
}

export async function autoReactivateExpiredSuspensions(usersCollection: Collection): Promise<number> {
  const now = new Date();
  
  const result = await usersCollection.updateMany(
    {
      status: 'suspended',
      suspendedUntil: { $lte: now }
    },
    {
      $set: {
        status: 'active',
        suspendedUntil: null,
        updatedAt: now
      }
    }
  );
  
  const count = result.modifiedCount;
  if (count > 0) {
    console.log(`[Suspension] Auto-reactivated ${count} expired suspension(s)`);
  }
  
  return count;
}

export function formatSuspensionEndDate(date: Date, language: string = 'fr'): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  const locale = language === 'en' ? 'en-US' : `${language}-${language.toUpperCase()}`;
  return new Intl.DateTimeFormat(locale, options).format(date);
}
