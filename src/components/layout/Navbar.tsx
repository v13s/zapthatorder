
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, ShoppingCart, Search, Menu, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);

  // Mock categories - would come from API in a real application
  const categories = [
    { name: "Clothing", path: "/category/clothing" },
    { name: "Shoes", path: "/category/shoes" },
    { name: "Bags", path: "/category/bags" },
    { name: "Accessories", path: "/category/accessories" },
  ];

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        {/* Top row: Logo, Search, and Account */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-brand-purple">ZapThatOrder</span>
          </Link>

          {/* Search - hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search for products..." 
                className="w-full pl-8" 
              />
            </div>
          </div>

          {/* Account and Cart */}
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <Link to="/profile" className="nav-link flex items-center space-x-1">
                <User className="h-5 w-5" />
                <span className="hidden md:inline">Account</span>
              </Link>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Orders
                </Link>
                <Link
                  to="/loyalty"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Loyalty Points
                </Link>
                <Link
                  to="/admin"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Admin Dashboard
                </Link>
              </div>
            </div>
            <Link to="/cart" className="nav-link flex items-center space-x-1">
              <div className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-brand-purple text-white text-xs min-w-[1.25rem] h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </Badge>
                )}
              </div>
              <span className="hidden md:inline">Cart</span>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Bottom row: Categories - hidden on mobile */}
        <nav className="hidden md:flex justify-center items-center h-10 border-t">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className="px-4 h-full flex items-center text-sm font-medium nav-link"
            >
              {category.name}
            </Link>
          ))}
          <Link
            to="/loyalty"
            className="px-4 h-full flex items-center text-sm font-medium text-brand-purple"
          >
            Loyalty Program
          </Link>
          <Link
            to="/profile"
            className="px-4 h-full flex items-center text-sm font-medium nav-link"
          >
            Profile
          </Link>
          <Link
            to="/admin"
            className="px-4 h-full flex items-center text-sm font-medium nav-link"
          >
            Admin
          </Link>
        </nav>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t animate-fade-in">
          <div className="container-custom py-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search for products..." 
                className="w-full pl-8" 
              />
            </div>
            
            <nav className="space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className="block px-2 py-2 text-base font-medium nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
              <Link
                to="/loyalty"
                className="block px-2 py-2 text-base font-medium text-brand-purple"
                onClick={() => setIsMenuOpen(false)}
              >
                Loyalty Program
              </Link>
              <Link
                to="/profile"
                className="block px-2 py-2 text-base font-medium nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/admin"
                className="block px-2 py-2 text-base font-medium nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
