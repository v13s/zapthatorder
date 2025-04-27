
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProductGrid from "@/components/product/ProductGrid";
import { mockProducts } from "@/data/mockData";
import { Product } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const CategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [selectedFilters, setSelectedFilters] = useState<{
    isNew?: boolean;
    isSale?: boolean;
  }>({});

  // Get the category name from the slug
  const categoryName = categorySlug?.charAt(0).toUpperCase() + categorySlug?.slice(1) || "";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Filter products by category
        let filtered = mockProducts.filter(
          product => product.category.toLowerCase() === categorySlug?.toLowerCase()
        );
        
        // Apply additional filters
        if (selectedFilters.isNew) {
          filtered = filtered.filter(product => product.isNew);
        }
        if (selectedFilters.isSale) {
          filtered = filtered.filter(product => product.isSale);
        }
        
        // Apply price filter
        filtered = filtered.filter(
          product => product.price >= priceRange[0] && product.price <= priceRange[1]
        );
        
        // Sort products
        switch (sortBy) {
          case "price-low":
            filtered = filtered.sort((a, b) => a.price - b.price);
            break;
          case "price-high":
            filtered = filtered.sort((a, b) => b.price - a.price);
            break;
          case "rating":
            filtered = filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            break;
          default: // newest
            // This would typically use a createdAt field, but for the mock data we'll just use ID
            filtered = filtered.sort((a, b) => b.id - a.id);
        }
        
        setProducts(filtered);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [categorySlug, sortBy, priceRange, selectedFilters]);

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filter]: !prev[filter as keyof typeof prev],
    }));
  };

  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-8">{categoryName}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-lg mb-3">Sort By</h3>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Top Rated</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-3">Price Range</h3>
              <div className="px-2">
                <Slider
                  defaultValue={[0, 200]}
                  max={200}
                  step={1}
                  value={[priceRange[0], priceRange[1]]}
                  onValueChange={(value) => setPriceRange([value[0], value[1]])}
                  className="mb-6"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="bg-secondary px-2 py-1 rounded text-sm">
                  ${priceRange[0]}
                </div>
                <div className="bg-secondary px-2 py-1 rounded text-sm">
                  ${priceRange[1]}
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-3">Filter</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="filter-new"
                    checked={selectedFilters.isNew}
                    onCheckedChange={() => toggleFilter("isNew")}
                  />
                  <Label htmlFor="filter-new">New Arrivals</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="filter-sale"
                    checked={selectedFilters.isSale}
                    onCheckedChange={() => toggleFilter("isSale")}
                  />
                  <Label htmlFor="filter-sale">On Sale</Label>
                </div>
              </div>
            </div>
            
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setPriceRange([0, 200]);
                setSelectedFilters({});
                setSortBy("newest");
              }}
            >
              Clear Filters
            </Button>
          </div>
          
          {/* Products Grid */}
          <div className="md:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="aspect-square bg-gray-200 rounded-lg mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <ProductGrid products={products} />
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
