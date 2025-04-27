
import React from "react";
import { Link } from "react-router-dom";
import { Mail, Facebook, Instagram } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Clothify</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Premium clothing and accessories with rewards for our loyal customers.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="mailto:contact@clothify.com" className="text-muted-foreground hover:text-foreground">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shopping */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Shopping</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/category/clothing" className="nav-link">Clothing</Link></li>
              <li><Link to="/category/shoes" className="nav-link">Shoes</Link></li>
              <li><Link to="/category/bags" className="nav-link">Bags</Link></li>
              <li><Link to="/category/accessories" className="nav-link">Accessories</Link></li>
              <li><Link to="/new-arrivals" className="nav-link">New Arrivals</Link></li>
              <li><Link to="/sale" className="nav-link">Sale</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="nav-link">Contact Us</Link></li>
              <li><Link to="/faq" className="nav-link">FAQ</Link></li>
              <li><Link to="/shipping" className="nav-link">Shipping & Returns</Link></li>
              <li><Link to="/terms" className="nav-link">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="nav-link">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Loyalty */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Loyalty Program</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/loyalty" className="nav-link">How It Works</Link></li>
              <li><Link to="/loyalty/rewards" className="nav-link">Rewards Catalog</Link></li>
              <li><Link to="/loyalty/terms" className="nav-link">Program Terms</Link></li>
              <li><Link to="/loyalty/faq" className="nav-link">Loyalty FAQ</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Clothify. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="text-xs text-muted-foreground hover:text-foreground">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
