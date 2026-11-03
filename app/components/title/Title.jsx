export default function Title({
  title1,
  title2,
  titleStyles,
  paraStyles,
  para,
}) {
  return (
    <div className={`flex flex-col space-y-2 mb-8 md:mb-12 ${titleStyles}`}>
      <h3
        className={`text-slate-900 dark:text-white capitalize flex flex-wrap items-center gap-x-2 `}
      >
        <span>{title1}</span>
        <span className="!font-light bg-brand-gradient bg-clip-text text-transparent underline underline-offset-4 decoration-cyan-500/40">
          {title2}
        </span>
      </h3>
      <p
        className={`text-slate-500 max-w-xl text-sm sm:text-base leading-relaxed ${paraStyles}`}
      >
        {para
          ? para
          : "Explore our collection of stylish clothing and footwear made for comfort, premium quality, and everyday confidence."}
      </p>
    </div>
  );
}
