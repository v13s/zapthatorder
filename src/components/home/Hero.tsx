
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
  return (
    <section className="relative bg-brand-light-purple py-16 md:py-24">
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-black mb-4">
              Summer Collection <span className="text-brand-purple">2025</span>
            </h1>
            <p className="text-lg mb-6 text-muted-foreground">
              Discover our latest arrivals and earn rewards with every purchase through our ZapThatOrder loyalty program.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link to="/new-arrivals">Shop New Arrivals</Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link to="/loyalty">Join Loyalty Program</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Summer Collection"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
