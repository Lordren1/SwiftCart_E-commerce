"use client";

/* import { dummyProducts } from "@/data"; */
import { useParams } from "next/navigation";
import { useState } from "react";
import SizeSelector from "./SizeSelector";
import { Icon } from "@iconify/react";
import ProductGallery from "./ProductGallery";
import { useAppContext } from "@/context/AppContext";

export default function ProductDetailContent() {
  const params = useParams();
  const id = params?.id;
  const { products, router, addToCart, currency } = useAppContext();
  const product = products.find((p) => p._id === id);

  const defaultSize = product?.sizes?.[0] || "M";
  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="pt-32 text-center text-white">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <p className="text-slate-400 mt-2">
          The item you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-white">
      {/* Left Column: Image Gallery */}
      <ProductGallery product={product} />

      {/* Right Column: Info & Size Selection */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            {product.category} / {product.subCategory}
          </span>
          <h1 className="text-3xl font-bold mt-1 text-slate-600">
            {product.name}
          </h1>

          {/* Symmetrical Rating Row */}
          <div className="flex items-center gap-0.5 pt-0.5 text-amber-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <Icon
                key={star}
                icon="material-symbols:star-rounded"
                width="16"
                height="16"
              />
            ))}
            <span className="text-slate-400 text-xs font-medium pl-1">
              (5.0)
            </span>
          </div>
        </div>

        <div className="flex items-baseline space-x-3">
          <span className="text-2xl font-black text-cyan-400">
            ${product.offerPrice}.00
          </span>
          <span className="text-base text-slate-500 line-through">
            ${product.price}.00
          </span>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed">
          {product.description}
        </p>

        {/*  Size Selection Component */}
        <SizeSelector
          sizes={product.sizes || ["S", "M", "L", "XL"]}
          selectedSize={selectedSize}
          onSelectSize={setSelectedSize}
        />

        {/* Quantity and Add to Basket Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
          {/* Quantity Controls */}
          <div className="flex items-center justify-between w-32 h-12 bg-slate-900 border border-slate-800 rounded-xl px-3">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(quantity - 1, 1))}
              className="text-lg font-bold text-slate-400 hover:text-white cursor-pointer px-2"
            >
              -
            </button>
            <span className="font-bold text-white">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="text-lg font-bold text-slate-400 hover:text-white cursor-pointer px-2"
            >
              +
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            type="button"
            onClick={() => {
              addToCart(product._id, selectedSize, quantity);
            }}
            className="flex-1 bg-brand-gradient text-slate-950 font-bold px-8 h-12 rounded-xl shadow-lg hover:brightness-110 transition cursor-pointer flex items-center justify-center gap-2"
          >
            <Icon icon="tdesign:shopping-cart-add" width={22} height={22} />
            <span>
              Add to Cart — {currency}
              {(Number(product.offerPrice ?? product.price) * quantity).toFixed(
                2,
              )}
            </span>
          </button>

          {/* Buy Now */}
          <button
            type="button"
            onClick={() => {
              router.push("/cart");
            }}
            className="flex-1 bg-brand-gradient text-slate-950 font-bold px-8 h-12 rounded-xl shadow-lg hover:brightness-110 transition cursor-pointer flex items-center justify-center gap-2"
          >
            {/* <Icon icon="tdesign:shopping-cart-add" width={22} height={22} /> */}
            <span>Buy now </span>
          </button>
        </div>
      </div>
    </div>
  );
}
