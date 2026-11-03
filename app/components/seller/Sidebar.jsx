"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../layout/header/Logo";

export default function Sidebar() {
  const pathname = usePathname();

  const sidebarLinks = [
    {
      name: "Add Product",
      path: "/seller",
      icon: "solar:add-square-linear",
    },
    {
      name: "Product List",
      path: "/seller/product-list",
      icon: "solar:clipboard-list-linear",
    },
    {
      name: "Order List",
      path: "/seller/order-list",
      icon: "solar:box-linear",
    },
  ];
  return (
    <aside className="flex min-h-screen w-16 shrink-0 flex-col border-r border-slate-200 bg-destructive pt-5 transition-all duration-300 md:w-64">
      {/* Brand */}

      {/* <div className="flex h-10 w-10 shrink-0 items-center justify-center round-xl bg-slate-950 text-cyan-400 shadow-sm">
          <Icon icon="solar:bolt-circle-bold" width={27} height={27} />
        </div> */}
      <div className=" mb-10 flex flex-col items-center gap-2 px-3 md:items-start md:px-5">
        <Logo isSidebar={true} />

        <p className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-300 md:block">
          Seller dashboard
        </p>
      </div>

      {/* Navigation links */}
      <nav className="flex flex-col gap-2 px-2 md:px-3">
        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.path ||
            (item.path !== "/seller" && pathname.startsWith(`${item.path}/`));

          return (
            <Link
              href={item.path}
              key={item.path}
              title={item.name}
              aria-label={isActive ? "page" : undefined}
              className={`group relative flex items-center justify-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-all duration-200 md:justify-start md:px-4 ${
                isActive
                  ? "bg-cyan-50 text-cyan-700"
                  : "text-slate-300 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {/* Active indicator */}
              {isActive && (
                <span className="absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-cyan-500" />
              )}
              <Icon
                icon={item.icon}
                width={22}
                height={22}
                className={`shrink-0 transition-colors ${
                  isActive
                    ? "text-cyan-600"
                    : "text-slate-400 group-hover:text-slate-700"
                }`}
              />

              <span className="hidden md:block">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="mt-auto border-t border-slate-100 p-3">
        <Link
          href="/"
          title="Back to store"
          className="flex items-center justify-center space-x-2 text-white bg-brand-gradient hover:brightness-110 transition w-full py-3 rounded-xl font-medium cursor-pointer shadow-md"
        >
          <Icon
            icon="solar:arrow-left-linear"
            width={21}
            height={21}
            className="shrink-0"
          />
          <span className="hidden md:block">Back to store</span>
        </Link>
      </div>
    </aside>
  );
}
