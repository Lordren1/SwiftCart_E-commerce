import { Suspense } from "react";

import ProductList from "@/app/components/seller/ProductList";

export default function ProductListPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen pt-32 text-center text-slate-400">
          Loading collections...
        </main>
      }
    >
      <ProductList />
    </Suspense>
  );
}
