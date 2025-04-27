
import React from "react";
import { Link } from "react-router-dom";
import ProductGrid from "./ProductGrid";
import { Button } from "@/components/ui/button";
import { mockProducts } from "@/data/mockData";

interface FeaturedProductsProps {
  title: string;
  viewAllLink: string;
  filter?: (product: any) => boolean;
  limit?: number;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  title,
  viewAllLink,
  filter = () => true,
  limit = 8,
}) => {
  // Filter and limit products
  const displayedProducts = mockProducts.filter(filter).slice(0, limit);

  return (
    <section className="container-custom py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Link to={viewAllLink}>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>
      </div>
      <ProductGrid products={displayedProducts} />
    </section>
  );
};

export default FeaturedProducts;
