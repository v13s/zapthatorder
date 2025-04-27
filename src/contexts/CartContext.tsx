
import React, { createContext, useState, useContext, useEffect } from "react";
import { Cart, CartItem, Product } from "@/types";
import { useToast } from "@/components/ui/use-toast";

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, quantity: number, size?: string, color?: string) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [cart, setCart] = useState<Cart>({
    items: [],
    subtotal: 0,
    total: 0,
    estimatedLoyaltyPoints: 0,
  });

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Calculate cart totals whenever items change
  useEffect(() => {
    const subtotal = cart.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    
    const estimatedPoints = cart.items.reduce(
      (total, item) => total + item.product.loyaltyPoints * item.quantity,
      0
    );

    setCart((prevCart) => ({
      ...prevCart,
      subtotal,
      total: subtotal, // In a full implementation, this would include shipping, taxes, discounts
      estimatedLoyaltyPoints: estimatedPoints,
    }));
  }, [cart.items]);

  const addToCart = (
    product: Product,
    quantity: number,
    size?: string,
    color?: string
  ) => {
    setCart((prevCart) => {
      // Check if product already exists in cart
      const existingItemIndex = prevCart.items.findIndex(
        (item) => 
          item.productId === product.id && 
          item.size === size && 
          item.color === color
      );

      let updatedItems;

      if (existingItemIndex >= 0) {
        // Update existing item
        updatedItems = [...prevCart.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
        
        toast({
          title: "Cart updated",
          description: `${product.name} quantity updated in your cart.`,
        });
      } else {
        // Add new item
        updatedItems = [
          ...prevCart.items,
          {
            productId: product.id,
            product,
            quantity,
            size,
            color,
          },
        ];
        
        toast({
          title: "Added to cart",
          description: `${product.name} has been added to your cart.`,
        });
      }

      return {
        ...prevCart,
        items: updatedItems,
      };
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.filter((item) => item.productId !== productId),
    }));
    
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      ),
    }));
  };

  const clearCart = () => {
    setCart({
      items: [],
      subtotal: 0,
      total: 0,
      estimatedLoyaltyPoints: 0,
    });
    
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
