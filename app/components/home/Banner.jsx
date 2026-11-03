import Link from "next/link";

export default function Banner() {
  return (
    <>
      <section className="w-full max-w-[1900px] mx-auto px-4 lg:px-12 py-8">
        <div
          className="relative overflow-hidden flex flex-col justify-center rounded-3xl px-6 sm:px-10 py-16 md:py-24
          bg-[url(/images/banner/banner2.jpg)] bg-cover bg-center bg-no-repeat min-h-90 md:min-h-105 shadow-xl"
        >
          {/* DArk Scrim Overlay for guaranteed text contranst & futuristic neon pop */}
          <div className="absolute inset-0 bg-slate-950/75 sm:bg-slate-950/65 z-0" />

          {/* Content Container */}
          <div className="relative z-10 flex flex-col items-start space-y-4 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-snug ">
              Elevate Your Style with Premium Fashion Collections
            </h2>

            {/* Clean accent bar using brand gradient */}
            <div className="h-1 w-24 rounded-full bg-brand-gradient my-1" />

            <p className="text-sm sm:text-base text-slate-300 font-light-relaxed max-w-xl pb-2 ">
              Find clothing that blends comfort with modern trends, giving you a
              smart, stylish edge in every outfit
            </p>

            <Link href="/collections" className="w-full sm:w-auto pt-2">
              <button className="w-full sm:w-auto bg-brand-gradient hover:scale-[1.03] hover:brightness-110 text-slate-950 px-8 py-3 rounded-full font-bold shadow-lg transition duration-300 transform cursor-pointer whitespace-nowrap">
                Check offers
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
