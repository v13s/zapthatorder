
import { Product, LoyaltyTier, LoyaltyTransaction, Coupon } from "@/types";

// Mock product data
export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Classic Cotton T-Shirt",
    price: 24.99,
    description: "A comfortable everyday classic t-shirt made from 100% cotton.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      "https://images.unsplash.com/photo-1593726852644-42954344a7df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
    ],
    category: "Clothing",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "White", value: "#FFFFFF" },
      { name: "Black", value: "#000000" },
      { name: "Navy", value: "#000080" }
    ],
    loyaltyPoints: 25,
    stock: 50,
    rating: 4.5,
    isNew: true
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    price: 49.99,
    description: "Modern slim fit jeans with a comfortable stretch fabric.",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80",
    category: "Clothing",
    sizes: ["28", "30", "32", "34", "36"],
    colors: [
      { name: "Blue", value: "#0000FF" },
      { name: "Black", value: "#000000" }
    ],
    loyaltyPoints: 50,
    stock: 30,
    rating: 4.2
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 89.99,
    originalPrice: 119.99,
    description: "Lightweight running shoes with cushioned support.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "Shoes",
    sizes: ["7", "8", "9", "10", "11"],
    colors: [
      { name: "Red", value: "#FF0000" },
      { name: "Blue", value: "#0000FF" },
      { name: "Black", value: "#000000" }
    ],
    loyaltyPoints: 90,
    stock: 25,
    rating: 4.8,
    isSale: true
  },
  {
    id: 4,
    name: "Leather Tote Bag",
    price: 129.99,
    description: "Spacious leather tote bag with multiple compartments.",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=876&q=80",
    category: "Bags",
    colors: [
      { name: "Brown", value: "#964B00" },
      { name: "Black", value: "#000000" }
    ],
    loyaltyPoints: 130,
    stock: 15,
    rating: 4.7,
    isNew: true
  },
  {
    id: 5,
    name: "Gold Hoop Earrings",
    price: 34.99,
    description: "Classic gold hoop earrings that go with any outfit.",
    image: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
    category: "Accessories",
    loyaltyPoints: 35,
    stock: 40,
    rating: 4.4
  },
  {
    id: 6,
    name: "Summer Dress",
    price: 59.99,
    originalPrice: 79.99,
    description: "Lightweight floral summer dress perfect for warm days.",
    image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=934&q=80",
    category: "Clothing",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Floral", value: "#FF69B4" },
      { name: "Blue", value: "#0000FF" }
    ],
    loyaltyPoints: 60,
    stock: 20,
    rating: 4.3,
    isSale: true
  },
  {
    id: 7,
    name: "Polarized Sunglasses",
    price: 79.99,
    description: "UV protective polarized sunglasses with durable frames.",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    category: "Accessories",
    colors: [
      { name: "Black", value: "#000000" },
      { name: "Tortoise", value: "#8B4513" }
    ],
    loyaltyPoints: 80,
    stock: 35,
    rating: 4.6,
    isNew: true
  },
  {
    id: 8,
    name: "Casual Sneakers",
    price: 69.99,
    description: "Comfortable everyday sneakers for casual wear.",
    image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80",
    category: "Shoes",
    sizes: ["7", "8", "9", "10", "11"],
    colors: [
      { name: "White", value: "#FFFFFF" },
      { name: "Grey", value: "#808080" }
    ],
    loyaltyPoints: 70,
    stock: 45,
    rating: 4.1
  },
  {
    id: 9,
    name: "Crossbody Bag",
    price: 49.99,
    originalPrice: 69.99,
    description: "Compact crossbody bag with adjustable strap.",
    image: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1963&q=80",
    category: "Bags",
    colors: [
      { name: "Black", value: "#000000" },
      { name: "Red", value: "#FF0000" },
      { name: "Tan", value: "#D2B48C" }
    ],
    loyaltyPoints: 50,
    stock: 25,
    rating: 4.4,
    isSale: true
  },
  {
    id: 10,
    name: "Wool Blend Sweater",
    price: 89.99,
    description: "Soft wool blend sweater for cooler weather.",
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    category: "Clothing",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Cream", value: "#FFFDD0" },
      { name: "Navy", value: "#000080" },
      { name: "Burgundy", value: "#800020" }
    ],
    loyaltyPoints: 90,
    stock: 30,
    rating: 4.5
  },
  {
    id: 11,
    name: "Leather Wallet",
    price: 39.99,
    description: "Genuine leather wallet with multiple card slots.",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    category: "Accessories",
    colors: [
      { name: "Brown", value: "#964B00" },
      { name: "Black", value: "#000000" }
    ],
    loyaltyPoints: 40,
    stock: 50,
    rating: 4.2
  },
  {
    id: 12,
    name: "Ankle Boots",
    price: 119.99,
    description: "Stylish ankle boots with a small heel.",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    category: "Shoes",
    sizes: ["6", "7", "8", "9"],
    colors: [
      { name: "Black", value: "#000000" },
      { name: "Brown", value: "#964B00" }
    ],
    loyaltyPoints: 120,
    stock: 20,
    rating: 4.7,
    isNew: true
  }
];

// Mock loyalty tier data
export const loyaltyTiers: LoyaltyTier[] = [
  {
    name: "Bronze",
    requiredPoints: 0,
    perks: [
      "Earn 1 point per $1 spent",
      "Birthday gift",
      "Early access to sales"
    ],
    multiplier: 1
  },
  {
    name: "Silver",
    requiredPoints: 1000,
    perks: [
      "Earn 1.25 points per $1 spent",
      "Birthday gift",
      "Early access to sales",
      "Free standard shipping"
    ],
    multiplier: 1.25
  },
  {
    name: "Gold",
    requiredPoints: 5000,
    perks: [
      "Earn 1.5 points per $1 spent",
      "Premium birthday gift",
      "Early access to sales",
      "Free express shipping",
      "Exclusive events",
      "Personal shopping assistant"
    ],
    multiplier: 1.5
  }
];

// Mock loyalty transactions
export const mockLoyaltyTransactions: LoyaltyTransaction[] = [
  {
    id: 1,
    date: "2025-04-25T14:30:00Z",
    type: "Earned",
    points: 250,
    description: "Purchase #12345",
    status: "Completed"
  },
  {
    id: 2,
    date: "2025-04-10T09:15:00Z",
    type: "Redeemed",
    points: 500,
    description: "Coupon: $5 off",
    status: "Completed"
  },
  {
    id: 3,
    date: "2025-04-01T16:45:00Z",
    type: "Earned",
    points: 180,
    description: "Purchase #12289",
    status: "Completed"
  },
  {
    id: 4,
    date: "2025-03-27T12:00:00Z",
    type: "Earned",
    points: 320,
    description: "Purchase #12100",
    status: "Pending"
  },
  {
    id: 5,
    date: "2025-03-15T10:30:00Z",
    type: "Redeemed",
    points: 1000,
    description: "Coupon: $10 off",
    status: "Completed"
  }
];

// Mock coupons
export const mockCoupons: Coupon[] = [
  {
    id: 1,
    code: "LOYALTY5",
    value: 5,
    type: "Fixed",
    expiresAt: "2025-05-30T23:59:59Z",
    isUsed: false
  },
  {
    id: 2,
    code: "LOYALTY10PCT",
    value: 10,
    type: "Percentage",
    expiresAt: "2025-05-15T23:59:59Z",
    isUsed: false
  },
  {
    id: 3,
    code: "BIRTHDAY20",
    value: 20,
    type: "Percentage",
    expiresAt: "2025-06-01T23:59:59Z",
    isUsed: false
  }
];
