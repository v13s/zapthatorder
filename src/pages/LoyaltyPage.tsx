import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { useLoyalty } from "@/contexts/LoyaltyContext";
import { Medal, Star, Gift, ArrowRight } from "lucide-react";
import { LoyaltyTier } from "@/types";
import { loyaltyTiers } from "@/data/mockData";

const LoyaltyPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoyaltyMember, user, enrollInLoyalty } = useAuth();
  const { loyaltyStatus, loyaltyTiers, redeemPoints, isLoading } = useLoyalty();

  // If not authenticated, prompt to login
  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container-custom py-12">
          <div className="max-w-xl mx-auto text-center">
            <Medal className="h-16 w-16 text-brand-purple mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Join the Clothify Loyalty Program</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Sign in or create an account to access our loyalty program and earn rewards with every purchase.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate("/auth?tab=login")}>
                Sign In
              </Button>
              <Button variant="outline" onClick={() => navigate("/auth?tab=register")}>
                Create Account
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // If authenticated but not enrolled in loyalty program, prompt to join
  if (!isLoyaltyMember) {
    return (
      <Layout>
        <div className="container-custom py-12">
          <div className="max-w-xl mx-auto text-center">
            <Medal className="h-16 w-16 text-brand-purple mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Join the Clothify Loyalty Program</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Earn points with every purchase and unlock exclusive rewards as a loyalty member.
            </p>
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {loyaltyTiers.map((tier) => (
                  <Card key={tier.name} className={tier.name === 'Bronze' ? 'border-brand-purple' : ''}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {tier.name}
                        {tier.name === 'Bronze' && <Star className="h-4 w-4 fill-loyalty-bronze text-loyalty-bronze" />}
                        {tier.name === 'Silver' && <Star className="h-4 w-4 fill-loyalty-silver text-loyalty-silver" />}
                        {tier.name === 'Gold' && <Star className="h-4 w-4 fill-loyalty-gold text-loyalty-gold" />}
                      </CardTitle>
                      <CardDescription>
                        {tier.requiredPoints > 0 ? `${tier.requiredPoints}+ points` : 'Starting tier'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm space-y-1">
                        {tier.perks.map((perk, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="rounded-full bg-secondary p-1 mt-0.5">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="10"
                                height="10"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M20 6L9 17l-5-5" />
                              </svg>
                            </div>
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button onClick={() => enrollInLoyalty()}>
                Join Loyalty Program
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Render loyalty dashboard for enrolled members
  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-2">Loyalty Rewards</h1>
        <p className="text-muted-foreground mb-8">Track your rewards and redeem points for exclusive perks.</p>
        
        {isLoading ? (
          <div className="animate-pulse space-y-8">
            <div className="h-40 bg-gray-200 rounded-lg"></div>
            <div className="h-60 bg-gray-200 rounded-lg"></div>
          </div>
        ) : loyaltyStatus ? (
          <>
            {/* Loyalty Status Card */}
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Tier Info */}
                  <div className="flex flex-col items-center justify-center">
                    <div className={`
                      h-24 w-24 rounded-full flex items-center justify-center mb-4
                      ${loyaltyStatus.tier === 'Bronze' ? 'bg-loyalty-bronze/20' : ''}
                      ${loyaltyStatus.tier === 'Silver' ? 'bg-loyalty-silver/20' : ''}
                      ${loyaltyStatus.tier === 'Gold' ? 'bg-loyalty-gold/20' : ''}
                    `}>
                      <Medal className={`
                        h-12 w-12
                        ${loyaltyStatus.tier === 'Bronze' ? 'text-loyalty-bronze' : ''}
                        ${loyaltyStatus.tier === 'Silver' ? 'text-loyalty-silver' : ''}
                        ${loyaltyStatus.tier === 'Gold' ? 'text-loyalty-gold' : ''}
                      `} />
                    </div>
                    <h2 className="text-xl font-bold">{loyaltyStatus.tier} Member</h2>
                    <p className="text-sm text-muted-foreground">
                      {user?.name}
                    </p>
                  </div>
                  
                  {/* Points Summary */}
                  <div className="flex flex-col justify-center">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Available Points</span>
                          <span className="font-medium">{loyaltyStatus.points.available}</span>
                        </div>
                        <Progress
                          value={calculateTierProgress(loyaltyStatus).percent}
                          className="h-2 mt-2"
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs">{loyaltyStatus.tier}</span>
                        <span className="text-xs">
                          {calculateTierProgress(loyaltyStatus).nextTier} 
                          ({calculateTierProgress(loyaltyStatus).pointsNeeded} more points)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Pending Points</span>
                        <span>{loyaltyStatus.points.pending}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Lifetime Points</span>
                        <span>{loyaltyStatus.points.lifetime}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Points Multiplier */}
                  <div className="flex flex-col justify-center items-center md:items-end">
                    <div className="bg-brand-light-purple p-4 rounded-lg text-center md:text-right">
                      <p className="text-sm text-brand-purple mb-1">Current Points Multiplier</p>
                      <p className="text-3xl font-bold text-brand-purple">
                        {getTierMultiplier(loyaltyStatus.tier)}x
                      </p>
                      <p className="text-xs text-brand-purple mt-1">
                        points per dollar spent
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Tabs for different loyalty features */}
            <Tabs defaultValue="rewards" className="space-y-4">
              <TabsList>
                <TabsTrigger value="rewards" className="flex items-center gap-1">
                  <Gift className="h-4 w-4" />
                  Rewards
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M12 8v4l3 3" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  History
                </TabsTrigger>
                <TabsTrigger value="coupons" className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M20 12v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-8" />
                    <path d="M18 8h4v4" />
                    <circle cx="6" cy="4" r="2" />
                    <path d="M6 6v4" />
                    <path d="M18 2a2 2 0 0 1 0 4" />
                    <path d="M14 6H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h10" />
                  </svg>
                  Coupons
                </TabsTrigger>
              </TabsList>
              
              {/* Rewards Tab */}
              <TabsContent value="rewards">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Rewards</CardTitle>
                    <CardDescription>Redeem your points for these exclusive rewards.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* $5 Reward */}
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">$5 Coupon</CardTitle>
                          <CardDescription>Valid for 30 days</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold mb-4">500 points</p>
                          <Button 
                            className="w-full" 
                            disabled={isLoading || loyaltyStatus.points.available < 500}
                            onClick={() => redeemPoints(500, "$5 Coupon")}
                          >
                            {isLoading ? "Processing..." : "Redeem"}
                          </Button>
                        </CardContent>
                      </Card>
                      
                      {/* $10 Reward */}
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">$10 Coupon</CardTitle>
                          <CardDescription>Valid for 30 days</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold mb-4">1000 points</p>
                          <Button 
                            className="w-full" 
                            disabled={isLoading || loyaltyStatus.points.available < 1000}
                            onClick={() => redeemPoints(1000, "$10 Coupon")}
                          >
                            {isLoading ? "Processing..." : "Redeem"}
                          </Button>
                        </CardContent>
                      </Card>
                      
                      {/* 15% Off Reward */}
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">15% Off</CardTitle>
                          <CardDescription>Valid for 14 days</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold mb-4">1500 points</p>
                          <Button 
                            className="w-full" 
                            disabled={isLoading || loyaltyStatus.points.available < 1500}
                            onClick={() => redeemPoints(1500, "15% Off Coupon")}
                          >
                            {isLoading ? "Processing..." : "Redeem"}
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* History Tab */}
              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>Points History</CardTitle>
                    <CardDescription>Your recent loyalty points activity.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {loyaltyStatus.transactions.length > 0 ? (
                        loyaltyStatus.transactions.map((transaction) => (
                          <div key={transaction.id} className="flex justify-between items-center pb-4 border-b">
                            <div>
                              <p className="font-medium">{transaction.description}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(transaction.date).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className={`font-medium ${transaction.type === 'Earned' ? 'text-green-600' : transaction.type === 'Redeemed' ? 'text-brand-purple' : ''}`}>
                                {transaction.type === 'Earned' ? '+' : '-'}{transaction.points} points
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {transaction.status}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-center py-4 text-muted-foreground">
                          No transaction history yet. Start shopping to earn points!
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Coupons Tab */}
              <TabsContent value="coupons">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Coupons</CardTitle>
                    <CardDescription>Available coupons to use on your next purchase.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loyaltyStatus.coupons.length > 0 ? (
                      <div className="space-y-4">
                        {loyaltyStatus.coupons.map((coupon) => (
                          <div key={coupon.id} className="flex flex-col sm:flex-row justify-between border rounded-lg p-4">
                            <div className="mb-2 sm:mb-0">
                              <p className="font-medium">
                                {coupon.type === 'Fixed' ? `$${coupon.value} Off` : `${coupon.value}% Off`}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Expires: {new Date(coupon.expiresAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex items-center">
                              <div className="bg-muted px-3 py-1 rounded mr-2 font-mono text-sm">
                                {coupon.code}
                              </div>
                              <Button variant="outline" size="sm" disabled={coupon.isUsed} asChild>
                                <a href="/cart">
                                  {coupon.isUsed ? "Used" : "Use"}
                                  {!coupon.isUsed && <ArrowRight className="ml-1 h-4 w-4" />}
                                </a>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center py-4 text-muted-foreground">
                        No coupons available. Redeem your points to get coupons!
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <div className="text-center py-8">
            <p>Failed to load loyalty information. Please try again later.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Refresh
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

// Helper function to calculate tier progress
function calculateTierProgress(loyaltyStatus: any) {
  const currentTierIndex = loyaltyTiers.findIndex(
    (tier) => tier.name === loyaltyStatus.tier
  );
  
  if (currentTierIndex === loyaltyTiers.length - 1) {
    // Already at highest tier
    return {
      percent: 100,
      nextTier: "Max Tier",
      pointsNeeded: 0
    };
  }
  
  const currentTier = loyaltyTiers[currentTierIndex];
  const nextTier = loyaltyTiers[currentTierIndex + 1];
  const lifetimePoints = loyaltyStatus.points.lifetime;
  
  const pointsNeeded = nextTier.requiredPoints - lifetimePoints;
  const totalPointsInTier = nextTier.requiredPoints - currentTier.requiredPoints;
  const pointsInCurrentTier = lifetimePoints - currentTier.requiredPoints;
  const percent = Math.min(100, (pointsInCurrentTier / totalPointsInTier) * 100);
  
  return {
    percent,
    nextTier: nextTier.name,
    pointsNeeded: Math.max(0, pointsNeeded)
  };
}

// Helper function to get tier multiplier
function getTierMultiplier(tierName: string) {
  const tier = loyaltyTiers.find((t) => t.name === tierName);
  return tier?.multiplier || 1;
}

export default LoyaltyPage;
