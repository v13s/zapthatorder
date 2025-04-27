import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import ShippingForm from "@/components/checkout/ShippingForm";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import OrderSummary from "@/components/checkout/OrderSummary";

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  if (cart.items.length === 0) {
    navigate("/cart");
    return null;
  }

  const handleApplyCoupon = (code: string) => {
    // In a real app, validate coupon code with backend
    toast({
      title: "Coupon Applied",
      description: `Coupon ${code} has been applied to your order.`
    });
  };

  const handleApplyPoints = (points: number) => {
    // In a real app, validate and apply points with backend
    toast({
      title: "Points Applied",
      description: `${points} points have been applied to your order.`
    });
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      // In a real app, submit order to backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      clearCart();
      toast({
        title: "Order Placed",
        description: "Your order has been successfully placed!"
      });
      navigate("/order-confirmation");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <ShippingForm onSubmit={() => {}} />
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <PaymentMethod />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <OrderSummary 
              onApplyCoupon={handleApplyCoupon}
              onApplyPoints={handleApplyPoints}
            />
            
            <Separator className="my-6" />
            
            <Button 
              className="w-full"
              size="lg"
              disabled={loading}
              onClick={handlePlaceOrder}
            >
              {loading ? "Processing..." : "Place Order"}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
