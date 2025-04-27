
import React from "react";
import { useCart } from "@/contexts/CartContext";
import { useLoyalty } from "@/contexts/LoyaltyContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FileText, Award, Scissors } from "lucide-react";

interface OrderSummaryProps {
  onApplyCoupon: (code: string) => void;
  onApplyPoints: (points: number) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ onApplyCoupon, onApplyPoints }) => {
  const { cart } = useCart();
  const { loyaltyStatus } = useLoyalty();
  const [couponCode, setCouponCode] = React.useState("");
  const [pointsToRedeem, setPointsToRedeem] = React.useState(0);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-lg font-semibold">
        <FileText className="h-5 w-5" />
        <h2>Order Summary</h2>
      </div>

      <div className="space-y-4">
        {cart.items.map((item) => (
          <div key={item.productId} className="flex justify-between">
            <div className="flex gap-4">
              <div className="h-16 w-16 bg-gray-100 rounded">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-full w-full object-cover rounded"
                />
              </div>
              <div>
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-muted-foreground">
                  Quantity: {item.quantity}
                </p>
              </div>
            </div>
            <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}

        <Separator />

        {/* Coupon Code */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Scissors className="h-4 w-4" />
            <p className="text-sm font-medium">Add Coupon Code</p>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Enter code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <Button
              variant="outline"
              onClick={() => onApplyCoupon(couponCode)}
            >
              Apply
            </Button>
          </div>
        </div>

        {/* Loyalty Points */}
        {loyaltyStatus && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <p className="text-sm font-medium">Apply Loyalty Points</p>
            </div>
            <div className="bg-brand-light-purple p-3 rounded-md">
              <p className="text-sm text-brand-purple mb-2">
                Available Points: {loyaltyStatus.points.available}
              </p>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Points to redeem"
                  max={loyaltyStatus.points.available}
                  value={pointsToRedeem}
                  onChange={(e) => setPointsToRedeem(Number(e.target.value))}
                />
                <Button
                  variant="outline"
                  onClick={() => onApplyPoints(pointsToRedeem)}
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        )}

        <Separator />

        {/* Order Totals */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${cart.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>$0.00</span>
          </div>
          {/* Add discount line if coupon/points applied */}
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${cart.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
