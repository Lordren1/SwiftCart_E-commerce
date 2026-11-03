import { Suspense } from "react";

import OrdersListContent from "../components/order/OrdersListContent";

export default function MyOrders() {
  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 min-h-screen text-white">
      {/* ✅ Wrapped in Suspense to prevent Next.js 16 build timeline validation failures */}
      <Suspense
        fallback={
          <div className="text-center py-16 text-slate-500 animate-pulse">
            Loading orders dashboard...
          </div>
        }
      >
        <OrdersListContent />
      </Suspense>
    </main>
  );
}
