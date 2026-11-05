import Image from "next/image";
import Link from "next/link";

export default function Logo({ sticky, isSidebar = false }) {
  return (
    <>
      <Link
        href="/"
        className={`whitespace-nowrap flex items-center gap-3 group`}
      >
        <div className="relative overflow-hidden transition-transform duration-300 group-hover:scale-105">
          {/* Animated Brand Icon Frame */}
          <Image
            src="/images/logo/logo.PNG"
            alt="SwiftCart Logo"
            width={45}
            height={45}
            className="w-[45px] h-[45px] object-contain rounded-xl shadow-md border border-white/10"
            priority
          />
        </div>
        {/* Premium Brand Typography */}
        <span
          className={`text-xl font-bold tracking-tight transition-colors duration-300
            ${sticky ? "text-white" : "text-white"}
            ${isSidebar ? "max-md:hidden block" : "block"}
            `}
        >
          Swift
          {/* Cyan Brand Accent to pop out and match the logo icon checkmark gradient */}
          <span className="text-cyan-400 transition-colors duration-300 group-hover:text-cyan-300">
            Cart
          </span>
        </span>
      </Link>
    </>
  );
}
