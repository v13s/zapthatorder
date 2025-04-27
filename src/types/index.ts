
// Product Types
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  images?: string[];
  category: string;
  sizes?: string[];
  colors?: { name: string; value: string }[];
  loyaltyPoints: number;
  stock: number;
  rating?: number;
  reviews?: Review[];
  isNew?: boolean;
  isSale?: boolean;
}

export interface Review {
  id: number;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// Cart Types
export interface CartItem {
  productId: number;
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  total: number;
  estimatedLoyaltyPoints: number;
}

// User Types
export interface User {
  id: number;
  name: string;
  email: string;
  isLoyaltyMember: boolean;
}

// Loyalty Types
export interface LoyaltyStatus {
  isEnrolled: boolean;
  tier: 'Bronze' | 'Silver' | 'Gold';
  points: {
    available: number;
    pending: number;
    lifetime: number;
  };
  transactions: LoyaltyTransaction[];
  coupons: Coupon[];
}

export interface LoyaltyTransaction {
  id: number;
  date: string;
  type: 'Earned' | 'Redeemed' | 'Cancelled' | 'Expired';
  points: number;
  description: string;
  status: 'Completed' | 'Pending';
}

export interface Coupon {
  id: number;
  code: string;
  value: number;
  type: 'Percentage' | 'Fixed';
  expiresAt: string;
  isUsed: boolean;
}

export interface LoyaltyTier {
  name: 'Bronze' | 'Silver' | 'Gold';
  requiredPoints: number;
  perks: string[];
  multiplier: number;
}
