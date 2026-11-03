import { Suspense } from "react";
import Hero from "./components/home/Hero";
import NewArrivals from "./components/home/NewArrivals";
import PromoTicker from "./components/home/PromoTicker";
import Banner from "./components/home/Banner";
import PopularProducts from "./components/home/PopularProducts";



export default function HomePage(){
  
  return(
    <>
    <Hero />
    {/* NewArrivals in Suspense to satisfy Next.js 16 prerendering validation */}
    <Suspense fallback={
      <section className="w-full max-w-7xl mx-auto px-4 py-16 text-center text-slate-500">
        <p className="animate-pulse"> Loading new arrivals...</p>
      </section>
    }>
    <NewArrivals />
    </Suspense>
    <Banner />
    <PromoTicker />
    <PopularProducts />
    </>
  );
}