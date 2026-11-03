"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import Logo from "./header/Logo";
import Image from "next/image";
import { startTransition, useEffect, useState } from "react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    startTransition(() => {
      setCurrentYear(new Date().getFullYear());
    });
  }, []);

  return (
    <>
      <footer className="pt-16 pb-12 relative bg-slate-950 text-slate-400 border-t border-slate-900">
        <div className="mx-auto px-4 max-w-[1900px] w-full">
          {/* Top Contact Section Row */}
          <div className="flex flex-col lg:flex-row justify-between lg:items-center border-slate-900 pb-10 mb-10 gap-6">
            {/* Active Contact Information Blocks */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-6 sm:gap-10 text-sm">
              {/* Office Address Location */}
              <div className="flex items-start text-slate-300">
                <Icon
                  icon="weui:location-outlined"
                  className="w-5 h-5 mr-3 mt-0.5 text-cyan-400 flex-shrink-0"
                />
                <div className="flex flex-col leading-tight">
                  <span className="font-medium text-white">
                    84, Victoria Way
                  </span>
                  <span>Victoria, Lagos, Nigeria</span>
                </div>
              </div>

              {/* Electronic Mail Target Node */}
              <div className="flex items-center gap-3 text-slate-300">
                <Icon
                  icon="clarity:email-line"
                  className="w-5 h-5 text-cyan-400 flex-shrink-0"
                />
                <Link
                  href="mailto:info@swiftcaet.com"
                  className="hover:text-cyan-400 transition-colors"
                >
                  info@swiftcart.com
                </Link>
              </div>
            </div>

            {/* Social Network Access Icon Rows */}
            <div className="flex gap-4 items-center">
              {[
                { icon: "fe:facebook", href: "https://www.facebook.com/" },
                {
                  icon: "fa6-brands:square-twitter",
                  href: "https//www.x.com/",
                },
                {
                  icon: "fa6-brands:linkedin",
                  href: "https://www.linkedin.com/",
                },
                { icon: "cbi:youtube-alt", href: "https://www.youtube.com/" },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-cyan-400 transition-all duration-300 hover:-translate-y-1"
                >
                  <Icon icon={social.icon} width={24} height={24} />
                </Link>
              ))}
            </div>
          </div>

          {/* Primary Footer Symmetrical Columns Grid System */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Column 1: Logo Corporate Overview & Achievements */}
            <div className="sm:col-span-2 lg:col-span-4 space-y-4">
              <div className="pb-2">
                <Logo sticky={true} />
              </div>
              <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
                We combine swift marketplace logistics, trendsetting apparel
                lines, and premium tech-driven experiences to redefine the
                future of modern e-commerce.
              </p>
              <div className="flex flex-wrap gap-3 items-center pt-2">
                <div className="bg-slate-900 border border-slate-800 p-2 rounded-lg">
                  <Image
                    src="/images/footer/award-logo-1.webp"
                    alt="E-commerce Award 1"
                    width={60}
                    height={60}
                    className="opacity-80"
                  />
                </div>
                <div className="bg-slate-900 border border-slate-800 p-2 rounded-lg">
                  <Image
                    src="/images/footer/award-logo-2.webp"
                    alt="E-commerce Award 2"
                    width={60}
                    height={60}
                    className="opacity-80"
                  />
                </div>
              </div>
            </div>

            {/* Column 2: Department Categories Set Alpha */}
            {/* Column 2: Department Categories Set Alpha */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-sm text-white font-bold uppercase tracking-wider">
                Collections
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link
                    href="/collections/women"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Women's Apparel
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections/men"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Men's Apparel
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections/children"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Kids & Children
                  </Link>
                </li>
                {/* ✅ FIXED: Single <li> wrapper instead of nested <li><li> */}
                <li>
                  <Link
                    href="/collections/new-arrivals"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    New Arrivals
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Corporate Framework Routing Links */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-sm text-white font-bold uppercase tracking-wider">
                Company
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link
                    href="#"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    About Our Brand
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Latest News Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Careers & Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Help & FAQs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Newsletter Engine & Mobile App Store Links */}
            <div className="sm:col-span-2 lg:col-span-4 space-y-6">
              <div className="space-y-3">
                <p className="text-sm text-white font-bold uppercase tracking-wider">
                  Sign up for updates
                </p>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="relative max-w-sm"
                >
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    className="w-full bg-slate-900 placeholder:text-slate-500 text-white py-3 pl-4 pr-12 border border-slate-800 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
                    aria-label="Subscribe"
                  >
                    <Icon icon="solar:plain-2-linear" className="text-xl" />
                  </button>
                </form>
              </div>

              {/* Mobile App Download Infrastructure Area */}
              <div className="space-y-3">
                <p className="text-sm text-white font-bold uppercase tracking-wider">
                  Get SwiftCart App
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="#"
                    className="hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/images/footer/google.webp"
                      alt="Get it on Google Play"
                      height={40}
                      width={130}
                      className="h-10 w-auto object-contain"
                    />
                  </Link>
                  <Link
                    href="#"
                    className="hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/images/footer/app.webp"
                      alt="Download on the App Store"
                      height={40}
                      width={130}
                      className="h-10 w-auto object-contain"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Attribution Copyright Strip */}
          <div className="border-t border-slate-900 mt-12 pt-6 text-center text-xs text-slate-600">
            <p>&copy; {currentYear} SwiftCart Inc. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
