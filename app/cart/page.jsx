"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import CartTotal from "../components/cart/CartTotal";
import { useAppContext } from "@/context/AppContext";

export default function Cart() {
  const {
    router,
    currency,
    products,
    cartItems,
    getCartCount,
    updateCartQuantity,
  } = useAppContext();

  // Flatten the multi-dimentional size map object into an easy-to-loop array matrix
  const flattenedCartItems = [];

  for (const itemId in cartItems) {
    for (const size in cartItems[itemId]) {
      const quantity = cartItems[itemId][size];
      if (quantity > 0) {
        flattenedCartItems.push({
          itemId,
          size,
          quantity,
        });
      }
    }
  }

  return (
    <div className="w-full max-w-[1900px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 text-white">
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* LEFT PANEL: Dynamic Product Ledger */}
        <div className="flex-1 w-full bg-white border border-slate-500 rounded-3xl p-6 md:p-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold flex items-baseline gap-3 text-slate-600 mb-6">
            Shopping Cart{" "}
            <span className="text-sm font-medium text-destructive">
              ({getCartCount()} {getCartCount() === 1 ? "Item" : "Items"})
            </span>
          </h1>

          {flattenedCartItems.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <p className="text-slate-500 text-base sm:text-lg">
                Your shopping cart is currently empty.
              </p>
              <button
                onClick={() => router.push("/collections")}
                className="bg-brand-gradient text-slate-950 font-bold px-6 py-2.5 rounded-full text-sm cursor-pointer hover:scale-105 transition transform"
              >
                Shop Our Collections
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Desktop Descriptor Columns */}
              <div className="grid grid-cols-[2fr_1fr_1fr] text-slate-500 bg-white text-xs font-bold uppercase tracking-wider pb-3 border-b border-slate-800/40 px-3 hidden sm:grid">
                <p className="text-left">Product Details</p>
                <p className="text-center">Subtotal</p>
                <p className="text-center">Action</p>
              </div>

              {/* Mapping over our unique product-and-size variations cleanly */}
              {flattenedCartItems.map((cartItem, idx) => {
                const product = products.find((p) => p._id === cartItem.itemId);
                if (!product) return null;

                const primaryImage = Array.isArray(product.images)
                  ? product.images[0]
                  : product.images;

                return (
                  <div
                    key={`${cartItem.itemId}-${cartItem.size}-${idx}`}
                    className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] text-slate-300 items-center text-sm md:text-base font-medium py-4 px-3 bg-white border border-slate-800/40 rounded-2xl gap-4 sm:gap-0"
                  >
                    {/* Item Metadata Details Column */}
                    <div className="flex items-center md:gap-6 gap-3">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center border border-slate-800 bg-slate-950 rounded-xl overflow-hidden flex-shrink-0 relative">
                        <Image
                          className="object-cover"
                          fill
                          src={primaryImage || "/images/placeholder.jpg"}
                          alt={product.name}
                          sizes="96px"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-white text-sm sm:text-base truncate">
                          {product.name}
                        </p>
                        <div className="font-normal text-slate-450 text-xs mt-0.5 space-y-1">
                          <p>
                            Category:{" "}
                            <span className="text-slate-400 font-medium">
                              {product.category}
                            </span>
                          </p>
                          <p>
                            Size:{" "}
                            <span className="text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded-md text-[11px]">
                              {cartItem.size}
                            </span>
                          </p>
                          <div className="flex items-center space-x-1.5 pt-0.5">
                            <span>Qty:</span>
                            <select
                              value={cartItem.quantity}
                              onChange={(e) =>
                                updateCartQuantity(
                                  product._id,
                                  cartItem.size,
                                  Number(e.target.value),
                                )
                              }
                              className="w-24 text-center pr-1 bg-slate-600 border border-slate-500 rounded-lg px-1 py-0.5 text-xs text-white outline-none focus:border-cyan-400 cursor-pointer"
                            >
                              {Array(10)
                                .fill("")
                                .map((_, index) => (
                                  <option key={index} value={index + 1}>
                                    {index + 1}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Subtotal Metric Calculation Box */}
                    <div className="text-left sm:text-center flex sm:block justify-between items-center text-sm sm:text-base">
                      <span className="sm:hidden text-xs text-slate-500 uppercase font-bold">
                        Subtotal:
                      </span>
                      <span className="font-bold text-slate-500">
                        {currency}
                        {(product.offerPrice * cartItem.quantity).toFixed(2)}
                      </span>
                    </div>

                    {/* Trash Removal Action Button Node */}
                    <div className="text-left sm:text-center">
                      <button
                        type="button"
                        onClick={() =>
                          updateCartQuantity(cartItem.itemId, cartItem.size, 0)
                        }
                        className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition cursor-pointer flex items-center gap-1.5 sm:mx-auto text-xs font-semibold"
                        aria-label="Remove item from cart"
                      >
                        <Icon
                          icon="solar:trash-bin-trash-linear"
                          width={19}
                          height={19}
                          className="text-red-400/80 hover:text-red-400"
                        />
                        <span className="sm:hidden font-bold text-slate-500">
                          Remove Item
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Continue Shopping Action CTA Trigger Button */}
          <button
            type="button"
            onClick={() => router.push("/collections")} // ✅ FIXED: Points to standard dynamic route structure
            className="group cursor-pointer flex items-center mt-8 gap-2 text-cyan-400 hover:text-cyan-300 font-bold text-sm transition"
          >
            <Icon
              icon="solar:arrow-left-linear"
              width={18}
              height={18}
              className="transition-transform group-hover:-translate-x-1"
            />
            <span>Continue Shopping</span>
          </button>
        </div>

        {/* RIGHT PANEL: Embedded Automated Checkout Cost Summary Sheet */}
        <CartTotal />
      </div>
    </div>
  );
}
