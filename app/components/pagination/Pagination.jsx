
'use client';

import { generatePagination } from '@/lib/pagination';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
/* import { generatePagination } from '@/lib/pagination'; */

export default function Pagination({ totalPages }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;

  const allPages = generatePagination(currentPage, totalPages);

  function createPageURL(pageNumber) {
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', pageNumber);

    return `${pathname}?${params.toString()}`;
  }

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between border-t border-slate-200 px-4 py-4 sm:px-6">

      {/* Previous Arrow */}
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        disabled={currentPage <= 1}
      />

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {allPages.map((page, index) => (
          <PaginationNumber
            key={`${page}-${index}`}
            page={page}
            href={createPageURL(page)}
            active={page === currentPage}
          />
        ))}
      </div>

      {/* Next Arrow */}
      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        disabled={currentPage >= totalPages}
      />

    </div>
  );
}


// Individual Page Number
function PaginationNumber({ page, href, active }) {
  if (page === "...") {
    return (
      <span className="px-2 text-sm text-slate-400">
        ...
      </span>
    );
  }

  return active ? (
    <span
      aria-current="page"
      className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-cyan-600 px-3 text-sm font-semibold text-white"
    >
      {page}
    </span>
  ) : (
    <Link
      href={href}
      className="flex h-9 min-w-9 items-center justify-center rounded-lg px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-cyan-600"
    >
      {page}
    </Link>
  );
}


// Previous and Next Arrows
function PaginationArrow({ direction, href, disabled }) {
  const isLeft = direction === 'left';

  const arrow = isLeft ? '←' : '→';

  const label = isLeft ? 'Previous page' : 'Next page';

  if (disabled) {
    return (
      <span
        aria-disabled="true"
        aria-label={label}
        className="flex h-9 items-center justify-center rounded-lg border border-slate-200 px-3 text-sm text-slate-300 cursor-not-allowed"
      >
        {arrow}
      </span>
    );
  }

  return (
    <Link
      href={href}
      aria-label={label}
      className="flex h-9 items-center justify-center rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-600 transition hover:border-cyan-600 hover:bg-cyan-50 hover:text-cyan-600"
    >
      {arrow}
    </Link>
  );
}
