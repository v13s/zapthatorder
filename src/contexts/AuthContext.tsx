import React, { createContext, useState, useContext, useEffect } from "react";
import { User } from "@/types";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoyaltyMember: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, joinLoyalty: boolean, phone: string) => Promise<void>;
  logout: () => void;
  enrollInLoyalty: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: 1,
        name: "John Doe",
        email,
        isLoyaltyMember: true
      };
      
      setUser(mockUser);
      toast({
        title: "Login successful",
        description: "Welcome back to Clothify!",
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string, joinLoyalty: boolean, phone: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: Date.now(),
        name,
        email,
        phone,
        isLoyaltyMember: joinLoyalty
      };
      
      setUser(mockUser);
      toast({
        title: "Registration successful",
        description: joinLoyalty 
          ? "Welcome to Clothify! You've also joined our loyalty program." 
          : "Welcome to Clothify!",
      });
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  const enrollInLoyalty = () => {
    if (user) {
      setUser({
        ...user,
        isLoyaltyMember: true
      });
      toast({
        title: "Welcome to our loyalty program!",
        description: "You can now earn and redeem points with your purchases.",
      });
    } else {
      toast({
        title: "Please log in",
        description: "You need to be logged in to join our loyalty program.",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoyaltyMember: user?.isLoyaltyMember || false,
        login,
        register,
        logout,
        enrollInLoyalty,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
