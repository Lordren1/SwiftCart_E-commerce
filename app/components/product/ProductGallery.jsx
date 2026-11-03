"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ product }) {
  // Guard against missing or empty images array
  const images =
    Array.isArray(product?.images) && product.images.length > 0
      ? product.images
      : ["/images/placeholder.jpg"];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 w-full">
      {/* Thumbnail Selector Strip */}
      <div className="flex md:flex-col gap-3 overflow-x-auto pb-2 md:pb-0">
        {images.map((imgUrl, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-900 border-2 transition-all cursor-pointer flex-shrink-0 ${
              activeIndex === idx
                ? "border-cyan-400 scale-105 shadow-md"
                : "border-slate-800 opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={imgUrl}
              alt={`${product?.name || "Product"} thumbnail ${idx + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Large Showcase Image Frame */}
      <div className="relative w-full w-full aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80">
        <Image
          src={images[activeIndex]}
          alt={product?.name || "Product"}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-all duration-300"
        />
        {product?.popular && (
          <span className="absolute top-4 left-4 bg-brand-gradient text-slate-950 text-xs font-black px-3 py-1 rounded-full shadow-md uppercase">
            Popular
          </span>
        )}
      </div>
    </div>
  );
}
