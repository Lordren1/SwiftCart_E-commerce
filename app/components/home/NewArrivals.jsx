"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Title from "../title/Title";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/* import { dummyProducts } from "@/data"; */
import ProductCard from "../product/ProductCard";
import { useAppContext } from "@/context/AppContext";



export default function NewArrivals() {
  const { products } = useAppContext();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 xl:py-24 bg-slate-50/50">
      {/* Title block with optional centering or clean alignment */}
      <Title
        title1="Discover Our"
        title2="New Arrivals"
        para="Curated tech-driven apparel lines fresh from the designer workshop lookbook."
      />

      {/* Swiper Wrapper */}
      <div className="relative mt-8 sm:mt-10 w-full">
        {isMounted &&  (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            observer={true}
            observeParents={true}
            centeredSlides={false} // Set to true if you want the active slide centered
            centerInsufficientSlides={true} // Centers slides automatically if fewer items than view
            spaceBetween={16}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              360: {
                slidesPerView: 1.15,
                spaceBetween: 14,
                centeredSlides: true,
              }, // Centers nicely on small phones
              480: { slidesPerView: 1.5, spaceBetween: 16 },
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1280: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className="pb-14 w-full" //
          >
            {products.slice(0, 8).map((product) => (
              <SwiperSlide key={product._id} className="h-auto flex">
                <div className="w-full py-1 flex">
                  <ProductCard product={product} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {!isMounted && (
          <div className="w-full min-h-[300px]"/>
        )}
        {/* Custom Navigation Controls */}
        {/* <div className="hidden sm:flex justify-end gap-3 mt-4">
          <button
            type="button"
            className="swiper-button-prev-custom p-2.5 rounded-full bg-white border border-slate-200 shadow-sm hover:bg-slate-100 transition cursor-pointer"
            aria-label="Previous slide"
          >
            ←
          </button>
          <button
            type="button"
            className="swiper-button-next-custom p-2.5 rounded-full bg-white border border-slate-200 shadow-sm hover:bg-slate-100 transition cursor-pointer"
            aria-label="Next slide"
          >
            →
          </button>
        </div> */}
      </div>
    </section>
  );
}
