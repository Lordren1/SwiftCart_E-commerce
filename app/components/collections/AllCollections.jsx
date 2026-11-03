"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import Title from "../title/Title";
import ProductCard from "../product/ProductCard";
import Pagination from "../pagination/Pagination";
import { useAppContext } from "@/context/AppContext";

const PRODUCTS_PER_PAGE = 12;

export default function AllCollections() {
  const { products } = useAppContext();

  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page")) || 1;

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  // Correct the URL if the current page exceeds the available pages.
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      const params = new URLSearchParams(searchParams.toString());

      params.set("page", String(totalPages));

      router.replace(`?${params.toString()}`);
    }
  }, [currentPage, totalPages, searchParams, router]);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const currentProducts = products.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <Title
        title1="All"
        title2="Collections"
        para="Browse our complete catalog of high-tech apparel, footwear, and accessories."
      />

      {products.length > 0 ? (
        <>
          {/* Product Grid */}
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {currentProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-10">
            <Pagination totalPages={totalPages} />
          </div>
        </>
      ) : (
        <p className="mt-10 text-center text-slate-400">No products found.</p>
      )}
    </main>
  );
}
