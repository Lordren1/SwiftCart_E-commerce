"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";

export default function MobileHeaderLinks({ item }) {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handleToggle = () => {
    if (item.submenu) {
      setSubmenuOpen(!submenuOpen);
    }
  };

  return (
    <div className="relative w-full">
      {item.submenu ? (
        <div
          className="flex items-center justify-between w-full py-3 text-slate-200 hover:text-white cursor-pointer border-b border-slate-800/30 last:border-none"
          onClick={handleToggle}
        >
          <span className="font-medium">{item.label}</span>
          <Icon
            icon="iconamoon:arrow-down-2-duotone"
            width={22}
            height={22}
            className={`transition-transform duration-300 text-slate-400
              ${submenuOpen ? "rotate-180" : ""}
              `}
          />
        </div>
      ) : (
        <Link
          href={item.href}
          className="flex items-center justify-between w-full py-3 text-slate-200 hover:text-white border-b border-slate-800/30 last:border-none"
        >
          <span className="font-medium">{item.label}</span>
        </Link>
      )}

      {/* Dynamic Submenu Slide Container */}
      {item.submenu && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out pl-4 bg-slate-900/30 rounded-xl mt-1
            ${submenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
            `}
        >
          {item.submenu.map((subItem, index) => (
            <Link
              key={index}
              href={subItem.href}
              className="block py-2 text-slate-400  bg-white hover:bg-primary hover:text-cyan-400 transition-colors text-sm rounded border ps-3"
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
