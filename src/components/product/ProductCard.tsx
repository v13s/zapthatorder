
import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  loyaltyPoints: number;
  rating?: number;
  isNew?: boolean;
  isSale?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  loyaltyPoints,
  rating = 0,
  isNew = false,
  isSale = false,
}) => {
  return (
    <Link to={`/product/${id}`} className="product-card group block">
      {/* Product Image with Badges */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isNew && (
            <Badge variant="default" className="bg-brand-purple text-white">New</Badge>
          )}
          {isSale && (
            <Badge variant="secondary" className="bg-destructive text-white">Sale</Badge>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-sm truncate">{name}</h3>
            <p className="text-xs text-muted-foreground truncate">{category}</p>
          </div>
          {rating > 0 && (
            <div className="flex items-center">
              <Star className="h-3.5 w-3.5 fill-loyalty-gold text-loyalty-gold" />
              <span className="text-xs ml-1">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        
        {/* Price and Loyalty Points */}
        <div className="mt-2 flex items-center justify-between">
          <div>
            <span className="font-medium">${price.toFixed(2)}</span>
            {originalPrice && originalPrice > price && (
              <span className="ml-2 line-through text-xs text-muted-foreground">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <div className="loyalty-points">
            +{loyaltyPoints} pts
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
