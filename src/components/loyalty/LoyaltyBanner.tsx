
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";

interface LoyaltyBannerProps {
  isEnrolled?: boolean;
  points?: number;
}

const LoyaltyBanner: React.FC<LoyaltyBannerProps> = ({ 
  isEnrolled = false,
  points = 0
}) => {
  return (
    <div className="bg-brand-light-purple rounded-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <Medal className="h-8 w-8 text-brand-purple mr-3" />
          <div>
            <h3 className="font-bold text-lg text-brand-black">
              {isEnrolled ? "Clothify Rewards Member" : "Join Clothify Rewards"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isEnrolled
                ? `You have ${points} points available to redeem`
                : "Earn points with every purchase and redeem for exclusive rewards"}
            </p>
          </div>
        </div>
        <Button asChild>
          <Link to={isEnrolled ? "/loyalty" : "/loyalty/join"}>
            {isEnrolled ? "View Rewards" : "Join Now"}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default LoyaltyBanner;
