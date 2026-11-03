export default function PromoTicker() {
  return (
    <div className="w-full bg-destructive text-white overflow-hidden py-2 relative z-50 text-sm">
      {/* 1. Inject your custom marquee animation styles */}
      <style>
        {`
          .marquee-inner {
            animation: marqueeScroll 15s linear infinite; /* Set timing speed to 15 seconds */
          }
          @keyframes marqueeScroll {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>

      {/* 2. The scrolling wrapper path layout */}
      <div className="flex w-[200%] marquee-inner whitespace-nowrap font-medium tracking-wide">
        {/* Track 1: Original text loop sequence */}
        <div className="flex justify-around w-1/2">
          <span>⚡ SUMMER SALE: 15% OFF ALL APPAREL</span>
          <span>🚚 FREE SHIPPING ON ORDERS OVER \$50</span>
          <span>✨ CODE: SWIFTSMART FAST CHECKOUT</span>
        </div>

        {/* Track 2: CLONED duplicate text loop sequence to ensure a seamless seam break */}
        <div className="flex justify-around w-1/2">
          <span>⚡ SUMMER SALE: 15% OFF ALL APPAREL</span>
          <span>🚚 FREE SHIPPING ON ORDERS OVER \$50</span>
          <span>✨ CODE: SWIFTSMART FAST CHECKOUT</span>
        </div>
      </div>
    </div>
  );
}
