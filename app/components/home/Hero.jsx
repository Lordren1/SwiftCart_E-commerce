"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      <div className="hero min-h-screen w-full bg-slate-950 relative overflow-hidden pt-32 pb-16 flex items-center">
        {/* Background Image Layer */}
        <div className="hero-image bg-[url(/images/hero/hero-bg2.webp)] absolute top-0 w-full h-full bg-cover bg-no-repeat"></div>

        {/* Decorative Background Overlays - Hidden on extra tight screens to keep text highly legible */}
        <div className="shape-1 absolute z-30 top-0 left-0 w-[150px] sm:w-[300px] h-auto pointer-events-none opacity-40 sm:opacity-100">
          <img src="/images/hero/pattern-2.svg" alt="element-image" />
        </div>
        <div className="shape-2 absolute z-30 top-0 left-0 w-[150px] sm:w-[300px] h-auto pointer-events-none opacity-40 sm:opacity-100">
          <img src="/images/hero/pattern-3.svg" alt="element-image" />
        </div>

        <div className="container mx-auto px-4 z-20 relative text-white flex flex-col justify-center items-center lg:items-start text-center lg:text-left gap-6 sm:gap-8 w-full max-w-[1900px]">
          <div className="space-y-4 max-w-4xl">
            {/* Brand Headline */}
            <h1 className="text-white max-w-4xl mx-auto leading-tight">
              Smart Shopping. <br />
              <span className="bg-brand-gradient bg-clip-text text-transparent">
                Futururistic Fashion.
              </span>
            </h1>

            {/* Subtitle description */}
            <p className="max-w-2xl mx-auto text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              Exprience the fastest track to premium apparel. Unveil curated
              tech-driven clothing collections engineered exclusively for modern
              life.
            </p>
          </div>

          {/* Call To Actions Layout */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 bg-white p-4 sm:p-6 rounded-2xl shadow-md border border-slate-100/10 w-full max-w-xl lg:mx-0">
            {/* LEFT SECTION: 15% Off Offer Badge Details */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-0.5">
              <h5 className="uppercase font-extrabold text-xl tracking-tight text-slate-900 leading-none">
                15% Off
              </h5>
              <p className="text-xs sm:text-sm font-normal text-slate-500 whitespace-nowrap">
                On All Items Available
              </p>
            </div>

            {/* RIGHT SECTION: Centralized Call-To-Action Button Row */}
            <div className="w-full sm:w-auto flex items-center justify-center">
              <Link href="/collections" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-brand-gradient hover:scale-[1.03] hover:brightness-110 text-slate-950 px-8 py-3 rounded-full font-bold shadow-lg transition duration-300 transform cursor-pointer whitespace-nowrap">
                  Explore Collections
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Lower Ambient Glow Accent Sphere */}
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      </div>
    </>
  );
}
