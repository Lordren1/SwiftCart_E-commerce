"use client";

import { usePathname } from "next/navigation";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/Footer";
import { Suspense } from "react";

export default function Provider({ children }) {
  const pathname = usePathname();
  const isSellerPage = pathname === "/seller" || pathname.startsWith("/seller");

  return (
    <>
      {!isSellerPage && (
        <Suspense
          fallback={
            <main className="min-h-screen pt-32 text-center text-slate-400">
              Loading header...
            </main>
          }
        >
          <Header />
        </Suspense>
      )}

      {children}
      {!isSellerPage && (
        <Suspense
          fallback={
            <main className="min-h-screen pt-32 text-center text-slate-400">
              Loading footer...
            </main>
          }
        >
          <Footer />
        </Suspense>
      )}
    </>
  );
}
