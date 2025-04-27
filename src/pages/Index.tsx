
import React from "react";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import CategorySection from "@/components/home/CategorySection";
import FeaturedProducts from "@/components/product/FeaturedProducts";
import LoyaltyBanner from "@/components/loyalty/LoyaltyBanner";
import { useAuth } from "@/contexts/AuthContext";
import { useLoyalty } from "@/contexts/LoyaltyContext";

const Index: React.FC = () => {
  const { isAuthenticated, isLoyaltyMember } = useAuth();
  const { loyaltyStatus } = useLoyalty();
  
  return (
    <Layout>
      <Hero />
      
      {isAuthenticated && isLoyaltyMember ? (
        <div className="container-custom my-8">
          <LoyaltyBanner 
            isEnrolled={true} 
            points={loyaltyStatus?.points.available || 0} 
          />
        </div>
      ) : (
        <div className="container-custom my-8">
          <LoyaltyBanner isEnrolled={false} />
        </div>
      )}
      
      <CategorySection />
      
      <FeaturedProducts
        title="New Arrivals"
        viewAllLink="/new-arrivals"
        filter={(product) => product.isNew === true}
      />
      
      <FeaturedProducts
        title="On Sale"
        viewAllLink="/sale"
        filter={(product) => product.isSale === true}
      />
    </Layout>
  );
};

export default Index;
