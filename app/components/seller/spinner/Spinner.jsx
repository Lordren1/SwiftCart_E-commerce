"use client";

import { Icon } from "@iconify/react";

export default function Spinner({ isOrderPage = false }) {
  return (
    <div
      className={
        !isOrderPage
          ? "flexCenter h-screen  w-full relative"
          : "relative flexCenter"
      }
    >
      {/* Rotating loader */}
      <div className="h-24 w-24 animate-spin rounded-full border-4 border-t-cyan-600 " />

      {/* Static confirmation tick order page */}
      {isOrderPage && (
        <Icon
          icon="solar:check-circle-bold"
          width={60}
          height={60}
          className="absolute text-emerald-500"
        />
      )}
    </div>
  );
}
