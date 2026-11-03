"use client";

import { useAppContext } from "@/context/AppContext";
import Title from "../title/Title";
import ProductCard from "./ProductCard";
import { useMemo } from "react";
import { useParams } from "next/navigation";

export default function RelatedProducts() {
  const { products } = useAppContext();
  const params = useParams();

  const productId = params?.id;

  const currentProduct = useMemo(() => {
    return products.find((item) => item._id === productId);
  }, [products, productId]);

  const related = useMemo(() => {
    if (!currentProduct) return [];

    return products.filter(
      (item) =>
        item.category === currentProduct.category &&
        item._id !== currentProduct._id,
    );
  }, [products, currentProduct]);

  return (
    <>
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 xl:py-24 bg-slate-50/50">
        {/* Title block with optional centering or clean alignment */}
        <Title
          title1="You May Also"
          title2="Like"
          para="Explore more styles and discover products selected from the same category."
        />

        {/* Conditional rendering for empty state vs. product grid */}
        <div className="relative mt-8 sm:mt-10 w-full">
          {related.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-2xl border border-slate-200/60 shadow-sm">
              <p className="text-slate-500 text-base sm:text-lg font-medium">
                No related products are available
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {related.slice(0, 8).map((product, index) => (
                <div key={product._id || index} className="w-full h-full flex">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
