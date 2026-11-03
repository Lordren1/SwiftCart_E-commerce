"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import SizeSelector from "./SizeSelector";

export default function ProductCard({ product }) {
  const { updateCartQuantity, addToCart, cartItems, currency } =
    useAppContext();

  const sizes = product?.sizes?.length ? product.sizes : ["One Size"];
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  // Get the quantity for this product AND the selected size.
  const count = cartItems[product._id]?.[selectedSize] || 0;
  const offerPrice = Number(product?.offerPrice ?? product?.price ?? 0);
  const originalPrice = Number(product?.price ?? 0);

  /* const defaultSize = product?.sizes?.[0] || "M"; */

  const handleUpdate = (newCount) => {
    if (count === 0 && newCount > 0) {
      addToCart(product._id, selectedSize, newCount);
    } else {
      updateCartQuantity(product._id, selectedSize, Math.max(0, newCount));
    }
  };

  // Safely extract first image string
  const primaryImage =
    (Array.isArray(product?.images)
      ? product.images[0]
      : product?.images || product?.image) || "/images/placeholder.jpg";

  /* // Set initial quantity from cart if exist
  useEffect(() => {
    const existing = cartItems[product._id];

    if (existing) {
      setCount(existing);
    }
  }, [cartItems, product._id]); */

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
      {/* Product image: clicking it opens the product page */}
      <Link href={`/product/${product._id}`} className="block">
        <div className="group relative flex h-48 cursor-pointer items-center justify-center overflow-hidden bg-slate-50 sm:h-56">
          <Image
            src={primaryImage}
            alt={product.name || "Product image"}
            width={300}
            height={300}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {product.popular && (
            <span className="absolute left-3 top-3 rounded-full bg-brand-gradient px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-950 shadow-sm">
              Popular
            </span>
          )}
        </div>
      </Link>

      {/* Product details */}
      <div className="flex flex-1 flex-col px-4 pt-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-cyan-500">
          {product.category}
        </p>

        <Link href={`/product/${product._id}`}>
          <h3
            className="mt-1 truncate font-bold text-slate-900"
            title={product.name}
          >
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-0.5 text-amber-400">
          {[1, 2, 3, 4, 5].map((star) => (
            <Icon
              key={star}
              icon="material-symbols:star-rounded"
              width={16}
              height={16}
            />
          ))}
          <span className="pl-1 text-xs font-medium text-slate-400">(5.0)</span>
        </div>

        {/* Size selector: separate from the rating and outside the Link */}
        <div className="mt-4">
          <p className="mb-2 text-xs font-semibold text-slate-600">
            Select size
          </p>

          <SizeSelector
            sizes={sizes}
            selectedSize={selectedSize}
            onSelectSize={setSelectedSize}
          />
        </div>

        {/* Price and cart controls stay aligned at the bottom */}
        <div className="mt-4 mb-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-4 mt-4">
          <div className="min-w-0">
            <p className="text-base font-black text-slate-950 sm:text-lg">
              {currency}
              {offerPrice.toFixed(2)}
            </p>

            {originalPrice > offerPrice && (
              <p className="text-xs text-slate-400 line-through">
                {currency}
                {originalPrice.toFixed(2)}
              </p>
            )}
          </div>

          <div className="shrink-0">
            {count === 0 ? (
              <button
                type="button"
                onClick={() => handleUpdate(1)}
                className="flex cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-brand-gradient px-3 py-2 font-bold text-slate-950 shadow-sm transition hover:brightness-110 sm:px-4"
                aria-label={`Add ${product.name}, size ${selectedSize}, to cart`}
              >
                <Icon icon="tdesign:shopping-cart-add" width={18} height={18} />
                <span>Add</span>
              </button>
            ) : (
              <div className="flex h-9 w-24 select-none items-center justify-between overflow-hidden rounded-xl border border-slate-200 bg-slate-100 text-slate-800">
                <button
                  type="button"
                  onClick={() => handleUpdate(count - 1)}
                  className="flex h-full w-8 cursor-pointer items-center justify-center font-bold transition hover:bg-slate-200"
                  aria-label={`Remove one ${product.name}, size ${selectedSize}`}
                >
                  −
                </button>

                <span className="w-8 text-center font-bold text-slate-950">
                  {count}
                </span>

                <button
                  type="button"
                  onClick={() => handleUpdate(count + 1)}
                  className="flex h-full w-8 cursor-pointer items-center justify-center font-bold transition hover:bg-slate-200"
                  aria-label={`Add one ${product.name}, size ${selectedSize}`}
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
