// app/product/[id]/page.jsx
"use client";

import { Suspense } from "react";
import ProductDetailContent from "@/app/components/product/ProductDetailContent";
import RelatedProducts from "@/app/components/product/RelatedProducts";

export default function ProductDetailPage() {
  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 text-white">
      <Suspense
        fallback={
          <div className="pt-32 text-center text-slate-400">
            <p className="text-base animate-pulse">
              {" "}
              Loading product details...
            </p>
          </div>
        }
      >
        <ProductDetailContent />
      </Suspense>

      <Suspense
        fallback={
          <div className="pt-32 text-center text-slate-400">
            <p className="text-base animate-pulse">
              {" "}
              Loading product details...
            </p>
          </div>
        }
      >
        <RelatedProducts />
      </Suspense>
    </main>
  );
}
