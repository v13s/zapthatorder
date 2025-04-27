
import React from "react";
import { Link } from "react-router-dom";

interface Category {
  name: string;
  image: string;
  path: string;
}

const CategorySection: React.FC = () => {
  const categories: Category[] = [
    {
      name: "Clothing",
      image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
      path: "/category/clothing",
    },
    {
      name: "Shoes",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
      path: "/category/shoes",
    },
    {
      name: "Bags",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
      path: "/category/bags",
    },
    {
      name: "Accessories",
      image: "https://images.unsplash.com/photo-1608042314453-ae338d80c427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
      path: "/category/accessories",
    },
  ];

  return (
    <section className="container-custom py-12">
      <h2 className="text-2xl font-bold mb-8">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={category.path}
            className="group rounded-lg overflow-hidden relative aspect-square"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
              <h3 className="text-white font-medium text-lg">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
