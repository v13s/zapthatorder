
import React from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { SocialLinks } from "@/components/profile/SocialLinks";
import { OrderHistory } from "@/components/profile/OrderHistory";
import { useAuth } from "@/contexts/AuthContext";
import { useLoyalty } from "@/contexts/LoyaltyContext";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

const ProfilePage = () => {
  const { user } = useAuth();
  const { loyaltyStatus } = useLoyalty();

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className="container-custom py-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-16 w-16 rounded-full bg-brand-light-purple flex items-center justify-center">
            <User className="h-8 w-8 text-brand-purple" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            {loyaltyStatus && (
              <p className="text-sm text-muted-foreground">
                Loyalty Points: {loyaltyStatus.points.available}
              </p>
            )}
          </div>
        </div>

        <Tabs defaultValue="profile">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="social">Social Links</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <ProfileForm />
          </TabsContent>
          
          <TabsContent value="orders">
            <OrderHistory />
          </TabsContent>
          
          <TabsContent value="social">
            <SocialLinks />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ProfilePage;
