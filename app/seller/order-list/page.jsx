"use client";

import SellersOrderList from "@/app/components/seller/SellersOrderList";
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
        <SellersOrderList />
      </Suspense>
    </>
  );
}
