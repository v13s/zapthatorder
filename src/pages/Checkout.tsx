
import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Checkout: React.FC = () => {
  return (
    <Layout>
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        
        <div className="max-w-md mx-auto text-center py-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-auto mb-6 text-muted-foreground"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <line x1="12" x2="12" y1="8" y2="16" />
            <line x1="8" x2="16" y1="12" y2="12" />
          </svg>
          
          <h2 className="text-2xl font-bold mb-2">Checkout Coming Soon</h2>
          <p className="text-muted-foreground mb-8">
            This functionality will be implemented in a future update. In a complete implementation, this page would include:
          </p>
          
          <ul className="text-left text-muted-foreground space-y-2 mb-6">
            <li>• Shipping address form</li>
            <li>• Payment method selection</li>
            <li>• Order summary</li>
            <li>• Loyalty points application</li>
            <li>• Coupon code redemption</li>
          </ul>
          
          <Separator className="my-8" />
          
          <Button asChild>
            <Link to="/cart">Return to Cart</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
