"use client";

import SellerOrderList from "@/app/components/seller/SellerOrderList";
import { Suspense } from "react";

export default function OrderList() {
  return (
    <>
      <Suspense
        fallback={
          <main className="min-h-screen pt-32 text-center text-slate-400">
            Loading collections...
          </main>
        }
      >
        <SellerOrderList />
      </Suspense>
    </>
  );
}
