"use client";

export default function MfButton() {
  return (
    <div className="fixed bottom-6 left-6 z-9999">
      <button
        type="button"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "auto"
              : "smooth",
          })
        }
        aria-label="Back to top"
        className="group relative w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-lg border border-white/20 hover:scale-110 transition-transform cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
      >
        <span className="text-sm font-bold tracking-tighter italic select-none">
          Mf
        </span>

        <span className="absolute left-14 px-2 py-1 bg-black text-[10px] text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap tracking-widest uppercase pointer-events-none">
          Back to top
        </span>
      </button>
    </div>
  );
}