import { MongoClient, Db } from 'mongodb';

export interface CouponData {
  code: string;
  discount: number;
  userId: string;
  orderId: string;
  expirationDate: Date;
  used: boolean;
  usedOrderId: string | null;
  createdAt: Date;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category?: string;
}

function generateRandomCode(length: number = 8): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function generateCouponCode(orderId: string): string {
  const randomPart = generateRandomCode(8);
  return `PROMO15-${orderId.slice(-6)}-${randomPart}`;
}

export function shouldGenerateCoupon(cartItems: CartItem[], totalAmount: number): boolean {
  const phoneCategories = ['phones', 'smartphones', 'phone', 'smartphone', 'téléphones', 'téléphone'];
  
  const phoneCount = cartItems.reduce((count, item) => {
    const category = (item.category || '').toLowerCase();
    const name = (item.name || '').toLowerCase();
    
    const isPhone = phoneCategories.some(cat => 
      category.includes(cat) || name.includes('iphone') || name.includes('samsung') || name.includes('phone')
    );
    
    return isPhone ? count + item.quantity : count;
  }, 0);

  return phoneCount > 2 || totalAmount >= 3000;
}

export async function createCoupon(
  db: Db,
  userId: string,
  orderId: string,
  discountPercent: number = 15,
  expirationDays: number = 30
): Promise<CouponData> {
  const couponsCollection = db.collection('coupons');
  
  const couponData: CouponData = {
    code: generateCouponCode(orderId),
    discount: discountPercent,
    userId: userId.toLowerCase(),
    orderId: orderId,
    expirationDate: new Date(Date.now() + expirationDays * 24 * 60 * 60 * 1000),
    used: false,
    usedOrderId: null,
    createdAt: new Date()
  };

  await couponsCollection.insertOne(couponData);
  
  return couponData;
}

export async function validateCoupon(
  db: Db,
  code: string,
  userId: string
): Promise<{ valid: boolean; error?: string; coupon?: CouponData; discountPercent?: number }> {
  const couponsCollection = db.collection('coupons');
  
  const coupon = await couponsCollection.findOne({ 
    code: code.toUpperCase(),
    userId: userId.toLowerCase()
  }) as CouponData | null;

  if (!coupon) {
    return { valid: false, error: 'Coupon not found or does not belong to this account' };
  }

  if (coupon.used) {
    return { valid: false, error: 'This coupon has already been used' };
  }

  if (new Date() > new Date(coupon.expirationDate)) {
    return { valid: false, error: 'This coupon has expired' };
  }

  return { 
    valid: true, 
    coupon,
    discountPercent: coupon.discount 
  };
}

export async function applyCoupon(
  db: Db,
  code: string,
  userId: string,
  orderId: string
): Promise<{ success: boolean; error?: string; discountPercent?: number }> {
  const validation = await validateCoupon(db, code, userId);
  
  if (!validation.valid) {
    return { success: false, error: validation.error };
  }

  const couponsCollection = db.collection('coupons');
  
  await couponsCollection.updateOne(
    { code: code.toUpperCase() },
    { 
      $set: { 
        used: true, 
        usedOrderId: orderId,
        usedAt: new Date()
      } 
    }
  );

  return { 
    success: true, 
    discountPercent: validation.discountPercent 
  };
}

export async function getUserCoupons(
  db: Db,
  userId: string
): Promise<CouponData[]> {
  const couponsCollection = db.collection<CouponData>('coupons');
  
  const coupons = await couponsCollection
    .find({ userId: userId.toLowerCase() })
    .sort({ createdAt: -1 })
    .toArray();

  return coupons;
}
