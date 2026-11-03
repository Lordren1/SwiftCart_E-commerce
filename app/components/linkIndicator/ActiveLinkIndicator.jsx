"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ActiveLinkIndicator({ href, label, submenu, sticky }) {
  const path = usePathname();

  // Check whether the current page matches this link
  const isActive = path === href;

  // Check whether any submenu link matches the current page.
  const isSubmenuActive = submenu?.some((subItem) => path === subItem.href);

  return (
    <>
      <div className="relative group flex items-center h-full">
        <Link
          href={href}
          className={`text-base font font-normal flex items-center transition-colors duration-300 py-4
            after:absolute after:bottom-2 after:left-0 after:h-0.5 after:rounded-full after:bg-cyan-400
            after:transition-all after:duration-300
            ${sticky ? "text-slate-200 hover:text-cyan-600" : "text-white/90 hover:text-white"}
            ${
              isActive
                ? "text-cyan-400 !font-semibold tracking-wide after:w-full"
                : "hover:text-cyan-300 after:w-0 hover:after:w-full"
            }
            `}
        >
          {label}

          {/* Dropdown Arrow */}
          {submenu && (
            <Icon
              icon="iconamoon:arrow-down-2-duotone"
              width={22}
              height={22}
              className={`
              ml-1 transition-transform duration-300
              group-hover:rotate-180
              ${isSubmenuActive ? "text-cyan-400" : ""}
            `}
            />
          )}
        </Link>

        {/* Submenu Dropdown */}
        {submenu && (
          <div
            className="absolute left-0 top-full rounded-xl mt-1 w-52 bg-white shadow-xl
              border border-slate-100 overflow-hidden opacity-0 scale-95 invisible 
              group-hover:opacity-100 group-hover:scale-100 group-hover:visible 
              transition-all duration-300 z-50
            "
          >
            {submenu.map((subItem, index) => {
              const isSubActive = path === subItem.href;

              return (
                <Link
                  key={index}
                  href={subItem.href}
                  aria-current={isSubActive ? "page" : undefined}
                  className={`relative block px-4 py-2 text-sm transition-colors duration-200 
                    ${
                      isSubActive
                        ? "text-blue-600 bg-blue-50 font-semibold"
                        : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                    }`}
                >
                  {subItem.label}

                  {/* Active Submenu Indicator */}
                  {isActive && (
                    <span className="left-0 top-0 h-full w-1 bg-cyan rounded-r-full" />
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
