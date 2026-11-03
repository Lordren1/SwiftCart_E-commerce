"use client";

import { usePathname } from "next/navigation";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/Footer";

export default function ProviderContent({ children }) {
  const pathname = usePathname();

  const isSellerPage =
    pathname === "/seller" || pathname.startsWith("/seller");

  return (
    <>
      {!isSellerPage && <Header />}

      {children}

      {!isSellerPage && <Footer />}
    </>
  );
}