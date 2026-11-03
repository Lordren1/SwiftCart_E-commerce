"use client";

import ActiveLinkIndicator from "@/app/components/linkIndicator/ActiveLinkIndicator";
import Link from "next/link";
import { Suspense } from "react";

export default function HeaderLinks({ item, sticky }) {
  return (
    <Suspense
      fallback={
        <Link
          href={item.href}
          className="text-base font-normal py-4 text-white/90"
        >
          {item.label}
        </Link>
      }
    >
      <ActiveLinkIndicator
        href={item.href}
        label={item.label}
        submenu={item.submenu}
        sticky={sticky}
      />
    </Suspense>
  );
}
