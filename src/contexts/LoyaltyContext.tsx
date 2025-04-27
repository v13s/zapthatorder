
import React, { createContext, useState, useContext, useEffect } from "react";
import { LoyaltyStatus, LoyaltyTier, LoyaltyTransaction, Coupon } from "@/types";
import { useAuth } from "./AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { loyaltyTiers, mockLoyaltyTransactions, mockCoupons } from "@/data/mockData";

interface LoyaltyContextType {
  loyaltyStatus: LoyaltyStatus | null;
  loyaltyTiers: LoyaltyTier[];
  isLoading: boolean;
  redeemPoints: (points: number, rewardType: string) => Promise<void>;
  refreshLoyaltyStatus: () => Promise<void>;
}

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined);

export const LoyaltyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const { isAuthenticated, isLoyaltyMember, user } = useAuth();
  const [loyaltyStatus, setLoyaltyStatus] = useState<LoyaltyStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load loyalty status when auth state changes
  useEffect(() => {
    if (isAuthenticated && isLoyaltyMember) {
      refreshLoyaltyStatus();
    } else {
      setLoyaltyStatus(null);
    }
  }, [isAuthenticated, isLoyaltyMember]);

  // Refresh loyalty status
  const refreshLoyaltyStatus = async () => {
    if (!isAuthenticated || !isLoyaltyMember) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock loyalty data - in a real app, this would come from the API
      const mockLoyaltyStatus: LoyaltyStatus = {
        isEnrolled: true,
        tier: 'Silver',
        points: {
          available: 750,
          pending: 320,
          lifetime: 2750
        },
        transactions: mockLoyaltyTransactions,
        coupons: mockCoupons
      };
      
      setLoyaltyStatus(mockLoyaltyStatus);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load loyalty status. Please try again.",
        variant: "destructive",
      });
      console.error("Failed to load loyalty status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Redeem points for rewards
  const redeemPoints = async (points: number, rewardType: string) => {
    if (!loyaltyStatus || loyaltyStatus.points.available < points) {
      toast({
        title: "Error",
        description: "Not enough points available to redeem this reward.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate coupon code
      const couponCode = `REWARD${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
      
      // Update loyalty status with new coupon and reduced points
      setLoyaltyStatus(prevStatus => {
        if (!prevStatus) return null;
        
        const newCoupon: Coupon = {
          id: Date.now(),
          code: couponCode,
          value: points / 100, // Convert points to dollar value (e.g., 500 points = $5)
          type: "Fixed",
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
          isUsed: false
        };
        
        const newTransaction: LoyaltyTransaction = {
          id: Date.now(),
          date: new Date().toISOString(),
          type: "Redeemed",
          points: points,
          description: `Redeemed for ${rewardType}`,
          status: "Completed"
        };
        
        return {
          ...prevStatus,
          points: {
            ...prevStatus.points,
            available: prevStatus.points.available - points
          },
          transactions: [newTransaction, ...prevStatus.transactions],
          coupons: [newCoupon, ...prevStatus.coupons]
        };
      });
      
      toast({
        title: "Points redeemed successfully!",
        description: `Your coupon code is ${couponCode}. It has been added to your account.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to redeem points. Please try again.",
        variant: "destructive",
      });
      console.error("Failed to redeem points:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoyaltyContext.Provider
      value={{
        loyaltyStatus,
        loyaltyTiers,
        isLoading,
        redeemPoints,
        refreshLoyaltyStatus
      }}
    >
      {children}
    </LoyaltyContext.Provider>
  );
};

export const useLoyalty = () => {
  const context = useContext(LoyaltyContext);
  if (context === undefined) {
    throw new Error("useLoyalty must be used within a LoyaltyProvider");
  }
  return context;
};
