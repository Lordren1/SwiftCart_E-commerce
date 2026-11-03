"use client";

/* import { dummyProducts } from "@/data"; */
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import Title from "../title/Title";
import { useAppContext } from "@/context/AppContext";

export default function CategoryFilterContent() {
  const { products } = useAppContext();

  const params = useParams();
  const rawCategory = params?.category || "all";

  const categoryName = Array.isArray(rawCategory)
    ? rawCategory[0]
    : rawCategory;

  const formattedCategory =
    categoryName.charAt(0).toUpperCase() + categoryName.slice(1).toLowerCase();

  // Filter initial items by main category (Women, Men, Children, Shoes)
  const categoryProducts = useMemo(() => {
    return products.filter(
      (item) => item.category.toLowerCase() === categoryName.toLowerCase(),
    );
  }, [products, categoryName]);

  // Extract unique subcategories (e.g., sneakers, Boots, Topwear)
  const subCategories = useMemo(() => {
    const subs = new Set(categoryProducts.map((p) => p.subCategory));
    return ["All", ...Array.from(subs)];
  }, [categoryProducts]);

  const [activeSub, setActiveSub] = useState("All");

  // Filter by selected subcategory pill
  const displayedProducts = useMemo(() => {
    if (activeSub === "All") return categoryProducts;
    return categoryProducts.filter((p) => p.subCategory === activeSub);
  }, [categoryProducts, activeSub]);

  return (
    <>
      <Title
        title1="Shop"
        title2={formattedCategory}
        para={`Explore our high-tech curated ${formattedCategory.toLowerCase()} collection with instant size selection.`}
      />

      {/* Subcategory Filter Pill Bar */}
      <div className="flex flex-wrap items-center gap-2 mt-8 pb-6 border-b border-slate-800/60">
        {subCategories.map((sub) => (
          <button
            key={sub}
            onClick={() => setActiveSub(sub)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer 
                ${
                  activeSub === sub
                    ? "bg-cyan-400 text-slate-950 shadow-sm"
                    : "bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700"
                }
                `}
          >
            {sub}
          </button>
        ))}
        <span className="ml-auto text-xs text-slate-500">
          Showing {displayedProducts.length} items
        </span>
      </div>

      {/* Prduct Grid Display */}
      {displayedProducts.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <p className="text-base font-meduim">
            {" "}
            No product found under "{activeSub}"
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {displayedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
