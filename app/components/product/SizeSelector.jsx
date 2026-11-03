"use client";

import { useState } from "react";

export default function SizeSelector({
  sizes = ["S", "M", "L", "XL"],
  onSelectSize,
  selectedSize,
  variant = "default",
}) {
  const isCompact = variant === "compact";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Select Size
        </span>
        <button
          type="button"
          className="text-xs text-cyan-400 hover:underline cursor-pointer"
          onClick={() =>
            alert("Size Guide: Standard US/EU/UK measurements apply.")
          }
        >
          Size Guide
        </button>
      </div>

      <div className={`flex flex-wrap ${isCompact ? "gap-1.5" : "gap-2"}`}>
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => onSelectSize(size)}
            className={`rounded-md border font-medium transition ${
              isCompact
                ? "min-w-5 px-1 py-0.8 text-xs"
                : "min-w-5 px-2 py-1 text-sm"
            }  ${
              selectedSize === size
                ? "border-black bg-black text-white"
                : "border-gray-300 bg-white text-gray-700 hover:border-black"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
