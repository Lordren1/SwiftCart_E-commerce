"use client";

import Title from "../title/Title";
import ProductCard from "../product/ProductCard";

import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";

export default function PopularProducts() {
  const { products } = useAppContext();
  const [popular, setPopular] = useState([]);

  /* Add [products] dependency so state updates when context loads */
  useEffect(() => {
    if (Array.isArray(products)) {
      const data = products.filter((item) => item.popular);
      setPopular(data);
    }
  }, [products]);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 xl:py-24 bg-slate-50/50">
      {/* Title block with optional centering or clean alignment */}
      <Title
        title1="Customer"
        title2="Favorites"
        para="Top-rated techwear and staple fashion pieces loved by our community."
      />

      {/* Conditional rendering for empty state vs. product grid */}
      <div className="relative mt-8 sm:mt-10 w-full">
        {popular.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-slate-200/60 shadow-sm">
            <p className="text-slate-500 text-base sm:text-lg font-medium">
              No popular content is available
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popular.slice(0, 8).map((product, index) => (
              <div key={product._id || index} className="w-full h-full flex">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
