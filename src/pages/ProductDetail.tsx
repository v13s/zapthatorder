
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { mockProducts } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types";
import { useToast } from "@/components/ui/use-toast";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<{ name: string; value: string } | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    // In a real application, this would be an API call
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const foundProduct = mockProducts.find(p => p.id === parseInt(id || "0"));
        setProduct(foundProduct || null);
        
        if (foundProduct) {
          setSelectedImage(foundProduct.images?.[0] || foundProduct.image);
          if (foundProduct.sizes && foundProduct.sizes.length > 0) {
            setSelectedSize(foundProduct.sizes[0]);
          }
          if (foundProduct.colors && foundProduct.colors.length > 0) {
            setSelectedColor(foundProduct.colors[0]);
          }
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    if (product.sizes && !selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive",
      });
      return;
    }
    
    if (product.colors && !selectedColor) {
      toast({
        title: "Please select a color",
        variant: "destructive",
      });
      return;
    }
    
    addToCart(
      product, 
      quantity,
      selectedSize,
      selectedColor?.name
    );
  };

  if (loading) {
    return (
      <Layout>
        <div className="container-custom py-12 flex justify-center">
          <div className="animate-pulse space-y-8 w-full max-w-4xl">
            <div className="h-96 bg-gray-200 rounded-lg"></div>
            <div className="space-y-3">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-12 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container-custom py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p>Sorry, the product you're looking for doesn't exist.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={selectedImage || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`aspect-square bg-gray-100 rounded-md overflow-hidden border-2 ${
                      selectedImage === image ? "border-brand-purple" : "border-transparent"
                    }`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div>
            {/* Badges */}
            <div className="flex gap-2 mb-3">
              {product.isNew && (
                <Badge variant="default" className="bg-brand-purple text-white">New</Badge>
              )}
              {product.isSale && (
                <Badge variant="secondary" className="bg-destructive text-white">Sale</Badge>
              )}
              <Badge variant="outline" className="bg-brand-light-purple border-brand-light-purple text-brand-dark-purple">
                +{product.loyaltyPoints} loyalty points
              </Badge>
            </div>
            
            {/* Title and Rating */}
            <h1 className="text-3xl font-bold">{product.name}</h1>
            
            {product.rating && (
              <div className="flex items-center gap-1 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating || 0)
                        ? "fill-loyalty-gold text-loyalty-gold"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm ml-1">{product.rating.toFixed(1)}</span>
              </div>
            )}
            
            {/* Price */}
            <div className="mt-4">
              <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="ml-2 text-lg line-through text-muted-foreground">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            
            {/* Description */}
            <p className="mt-4 text-muted-foreground">{product.description}</p>
            
            <Separator className="my-6" />
            
            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium mb-3">Size</h3>
                <RadioGroup
                  value={selectedSize}
                  onValueChange={setSelectedSize}
                  className="flex flex-wrap gap-2"
                >
                  {product.sizes.map((size) => (
                    <div key={size} className="flex items-center">
                      <RadioGroupItem
                        value={size}
                        id={`size-${size}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`size-${size}`}
                        className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background 
                          peer-data-[state=checked]:bg-brand-purple peer-data-[state=checked]:text-white 
                          peer-data-[state=checked]:border-brand-purple cursor-pointer"
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
            
            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium mb-3">Color</h3>
                <RadioGroup
                  value={selectedColor?.name}
                  onValueChange={(value) => {
                    const color = product.colors?.find((c) => c.name === value);
                    setSelectedColor(color);
                  }}
                  className="flex flex-wrap gap-2"
                >
                  {product.colors.map((color) => (
                    <div key={color.name} className="flex items-center">
                      <RadioGroupItem
                        value={color.name}
                        id={`color-${color.name}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`color-${color.name}`}
                        className="flex items-center justify-center rounded-md border-2 cursor-pointer
                          peer-data-[state=checked]:border-brand-purple"
                      >
                        <div
                          className="w-8 h-8 rounded-sm m-1"
                          style={{ backgroundColor: color.value }}
                        ></div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
            
            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-muted-foreground"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-2">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3 py-2 text-muted-foreground"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
              
              <Button
                onClick={handleAddToCart}
                className="flex-1"
                disabled={product.stock <= 0}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>
            
            {/* Additional Info */}
            <div className="mt-6 text-sm text-muted-foreground">
              <p className="mb-1">
                In Stock: {product.stock > 0 ? `${product.stock} items` : "No"}
              </p>
              <p>Category: {product.category}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
