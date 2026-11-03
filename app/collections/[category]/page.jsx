"use client";

import CategoryFilterContent from "@/app/components/product/CategoryFilterContent";
import { Suspense } from "react";

export default function CategoryFilterPage() {
  return (
    <>
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 min-h-screen">
        <Suspense
          fallback={
            <div className="pt-32 text-center text-slate-400">
              Loading collection...
            </div>
          }
        >
          <CategoryFilterContent />
        </Suspense>
      </main>
    </>
  );
}
