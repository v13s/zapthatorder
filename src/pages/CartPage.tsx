
import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, Trash, Plus, Minus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        
        {cart.items.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button asChild>
              <Link to="/">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-4">Product</th>
                        <th className="text-center p-4">Price</th>
                        <th className="text-center p-4">Quantity</th>
                        <th className="text-center p-4">Total</th>
                        <th className="text-center p-4">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.items.map((item) => (
                        <tr key={`${item.productId}-${item.size}-${item.color}`} className="border-t">
                          <td className="p-4">
                            <div className="flex items-center">
                              <div className="h-16 w-16 flex-shrink-0 rounded overflow-hidden bg-gray-100 mr-4">
                                <img
                                  src={item.product.image}
                                  alt={item.product.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="font-medium">
                                  <Link to={`/product/${item.productId}`} className="hover:text-brand-purple">
                                    {item.product.name}
                                  </Link>
                                </h3>
                                {item.size && <p className="text-sm text-muted-foreground">Size: {item.size}</p>}
                                {item.color && <p className="text-sm text-muted-foreground">Color: {item.color}</p>}
                                <div className="loyalty-points text-xs mt-1">
                                  +{item.product.loyaltyPoints * item.quantity} pts
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="text-center p-4">${item.product.price.toFixed(2)}</td>
                          <td className="text-center p-4">
                            <div className="flex items-center justify-center border rounded-md inline-flex">
                              <button
                                onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                                className="px-2 py-1"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="px-3 py-1">{item.quantity}</span>
                              <button
                                onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                                className="px-2 py-1"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          </td>
                          <td className="text-center p-4 font-medium">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </td>
                          <td className="text-center p-4">
                            <button
                              onClick={() => removeFromCart(item.productId)}
                              className="text-muted-foreground hover:text-destructive"
                              aria-label="Remove item"
                            >
                              <Trash className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Cart Actions */}
                <div className="p-4 border-t flex justify-between items-center">
                  <Button variant="outline" onClick={clearCart}>
                    Clear Cart
                  </Button>
                  
                  <Button asChild>
                    <Link to="/">Continue Shopping</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${cart.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
                
                <div className="mt-2 mb-6">
                  <div className="bg-brand-light-purple rounded-md p-3 flex items-center justify-between">
                    <span className="text-sm text-brand-purple font-medium">
                      Estimated loyalty points
                    </span>
                    <span className="font-bold text-brand-purple">
                      {cart.estimatedLoyaltyPoints}
                    </span>
                  </div>
                </div>
                
                <Button className="w-full" size="lg" asChild>
                  <Link to="/checkout">
                    Proceed to Checkout
                  </Link>
                </Button>
                
                {/* Payment Methods */}
                <div className="mt-4 text-center">
                  <span className="text-xs text-muted-foreground">
                    We accept secure payments through various methods
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
