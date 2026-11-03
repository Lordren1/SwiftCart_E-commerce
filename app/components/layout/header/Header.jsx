"use client";

import { useEffect, useState, useRef } from "react";
import Logo from "./Logo";
import headerData from "./navigation/MenuData";
import HeaderLinks from "./navigation/HeaderLink";
import MobileHeaderLinks from "./navigation/MobileHeaderLink";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import { useClerk, UserButton } from "@clerk/nextjs";
/* import Sidebar from "./Sidebar"; */

export default function Header() {
  const { getCartCount, isSeller, user, router } = useAppContext();
  const [sticky, setSticky] = useState(false);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);

  const { openSignIn } = useClerk();

  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-4 left-[2%] w-[96%] z-50 flex items-center justify-between rounded-2xl transition-all duration-300 border px-3 sm:px-6
        ${
          sticky
            ? "bg-slate-900/40 backdrop-blur-md shadow-md border-slate-700/30 h-16 text-white"
            : "bg-destructive border-destructive/90 shadow-lg h-20 text-white"
        }`}
      >
        <div className="w-full mx-auto max-w-[1900px] flex justify-between items-center h-full">
          <div className="flex items-center space-x-12 h-full">
            {/* Brand Logo graphic container */}
            <div className="shrink-0">
              <Logo sticky={sticky} />
            </div>

            {/* Centralized Primary Desktop Links Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 h-full">
              {headerData.map((item, index) => (
                <HeaderLinks key={index} item={item} sticky={sticky} />
              ))}
            </nav>
          </div>

          {/* Right Action Grid Options */}
          <div className="flex items-center space-x-1 sm:space-x-4 text-white">
            {isSeller && (
              <button
                onClick={() => router.push("/seller")}
                className="hidden sm:block h-8 px-4 text-xs font-medium bg-transparent ring-1 ring-white/20 text-white hover:bg-white/10 rounded-full transition cursor-pointer"
              >
                Seller
              </button>
            )}

            {/* Search Trigger Button */}
            <button
              className={`p-2 rounded-xl transition-all duration-200 cursor-pointer
              ${sticky ? "hover:bg-white/10 text-slate-200" : "hover:bg-black/10 text-white"}
              `}
              aria-label="Search"
            >
              <Icon icon="fluent:search-24-regular" width={22} height={22} />
            </button>

            {/* Shopping Cart Basket Button */}
            <Link href="/cart" className="relative cursor-pointer">
              <button
                className={`p-2 rounded-xl relative transition-all duration-200 group cursor-pointer
              ${sticky ? "hover:bg-white/10 text-slate-200" : "hover:bg-black/10 text-white"}
              `}
                aria-label="Shopping Cart"
              >
                <Icon
                  icon="lucide:shopping-basket"
                  width={22}
                  height={22}
                  className="transition-transform group-hover:scale-105"
                />
                <span className="absolute top-0 right-0 bg-cyan-400 text-slate-950 font-bold text-[9px] w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                  {getCartCount()}
                </span>
              </button>
            </Link>

            {/* Desktop User/Auth Profile Link */}
            {user ? (
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Action
                    label="My Orders"
                    labelIcon={
                      <Icon
                        icon="lucide:shopping-basket"
                        width={22}
                        height={22}
                        className="transition-transform group-hover:scale-105"
                      />
                    }
                    onClick={() => router.push("/my-orders")}
                  />
                </UserButton.MenuItems>
              </UserButton>
            ) : (
              <button
                onClick={openSignIn}
                className={`hidden lg:flex items-center space-x-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
                ${sticky ? "hover:bg-white/10 text-slate-200" : "hover:bg-black/10 text-white"}
              `}
              >
                <Icon icon="fluent:user-24-regular" width={22} height={22} />
                <span>Login</span>
              </button>
            )}

            {/* 
            
            This keeps the button visible on mobile, but completely hides it on desktop.
          */}
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="lg:hidden p-2 cursor-pointer group"
              aria-label="Toggle mobile menu"
            >
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-4 h-0.5 bg-white mt-1.5 transition-all duration-300 ease-in-out group-hover:w-6"></span>
              <span className="block w-6 h-0.5 bg-white mt-1.5"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay Slider Panel */}
      <div
        ref={mobileMenuRef}
        className={`lg:hidden fixed top-0 right-0 h-screen w-full sm:w-[50%] shadow-2xl  bg-destructive backdrop-blur-xl p-10 z-50 transform transition-transform overflow-y-auto duration-500 ease-in-out
          ${navbarOpen ? "translate-x-0" : "translate-x-[110%]"}
          `}
      >
        <div className="text-white flex justify-between items-center w-full mb-8">
          <Logo sticky={true} />
          <button
            onClick={() => setNavbarOpen(false)}
            aria-label="Close mobile menu"
            className="text-slate-400 hover:text-white cursor-pointer"
          >
            <svg
              xmlns="http://w3.org"
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col items-start space-y-1 py-4 border-b border-slate-800">
          {headerData.map((item, index) => (
            <MobileHeaderLinks key={index} item={item} />
          ))}
        </nav>

        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="sm:block h-8 px-4 mt-5 text-xs font-medium bg-transparent ring-1 ring-white/20 text-white hover:bg-white/10 rounded-full transition cursor-pointer"
          >
            Seller
          </button>
        )}

        <div className="mt-6">
          {user ? (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Orders"
                  onClick={() => router.push("/my-orders")}
                  labelIcon={
                    <Icon
                      icon="lucide:shopping-basket"
                      width={22}
                      height={22}
                      className="transition-transform group-hover:scale-105"
                    />
                  }
                />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <button
              onClick={openSignIn}
              className="flex items-center justify-center space-x-2 text-white bg-brand-gradient hover:brightness-110 transition w-full py-3 rounded-xl font-medium cursor-pointer shadow-md"
            >
              <Icon icon="fluent:user-24-regular" width={22} height={22} />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>

      {/* <Sidebar
        isOpenSidebar={isOpenSidebar}
        setIsOpenSidebar={setIsOpenSidebar}
      /> */}
    </>
  );
}
