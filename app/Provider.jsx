"use client";

import { Suspense } from "react";
import ProviderContent from "./ProviderContent";

export default function Provider({ children }) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center text-slate-400">
          Loading page...
        </main>
      }
    >
      <ProviderContent>{children}</ProviderContent>
    </Suspense>
  );
}