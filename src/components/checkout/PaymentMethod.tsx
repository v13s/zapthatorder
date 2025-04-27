
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCard } from "lucide-react";

const PaymentMethod: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-lg font-semibold">
        <CreditCard className="h-5 w-5" />
        <h2>Payment Method</h2>
      </div>
      
      <RadioGroup defaultValue="card" className="space-y-3">
        <div className="flex items-center space-x-3 border rounded-lg p-4">
          <RadioGroupItem value="card" id="card" />
          <Label htmlFor="card" className="flex-1">Credit/Debit Card</Label>
          <div className="flex gap-2">
            <img src="/visa.png" alt="Visa" className="h-6" />
            <img src="/mastercard.png" alt="Mastercard" className="h-6" />
          </div>
        </div>
        
        <div className="flex items-center space-x-3 border rounded-lg p-4">
          <RadioGroupItem value="paypal" id="paypal" />
          <Label htmlFor="paypal" className="flex-1">PayPal</Label>
          <img src="/paypal.png" alt="PayPal" className="h-6" />
        </div>
      </RadioGroup>
    </div>
  );
};

export default PaymentMethod;
