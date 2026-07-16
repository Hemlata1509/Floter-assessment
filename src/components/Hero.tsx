import { useRef, useState } from "react";
import { HERO_SLIDES } from "../data/content";

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = (i: number) => setIndex((i + HERO_SLIDES.length) % HERO_SLIDES.length);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) goTo(delta > 0 ? index - 1 : index + 1);
    touchStartX.current = null;
  };

  const slide = HERO_SLIDES[index];

  return (
    <section id="top" className="relative pt-28 md:pt-36 pb-16 px-5 md:px-8 overflow-hidden">
      {/* Ambient background blobs — quiet, slow, decorative only */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-10 -left-24 w-72 h-72 rounded-full bg-plan/10 blur-3xl animate-float"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-40 -right-16 w-80 h-80 rounded-full bg-design/10 blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative mx-auto max-w-6xl">
        <p className="text-xs tracking-[0.2em] uppercase text-implement font-semibold mb-4 animate-fadeIn">
          Our working offerings
        </p>

        <div
          className="group relative rounded-2xl overflow-hidden bg-ink text-paper cursor-pointer animate-scaleIn shadow-xl shadow-ink/10 transition-transform duration-500 ease-signature hover:-translate-y-1 hover:shadow-2xl hover:shadow-ink/20"
          onClick={() => setExpanded(true)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          role="button"
          tabIndex={0}
          aria-label="Expand featured work"
          onKeyDown={(e) => e.key === "Enter" && setExpanded(true)}
        >
          <div
            className="aspect-[16/9] md:aspect-[21/9] flex flex-col justify-end p-6 md:p-12 bg-gradient-to-br from-implement-deep via-ink to-plan-deep bg-[length:200%_200%] animate-gradient-pan transition-[background-position] duration-700"
            key={slide.id}
          >
            <span className="text-xs uppercase tracking-widest text-paper/60 mb-3 animate-slideDown">
              {slide.id} — Featured
            </span>
            <h1 className="max-w-2xl text-2xl md:text-4xl leading-tight font-medium animate-slideDown" style={{ animationDelay: "60ms" }}>
              {slide.title}
            </h1>
            <p className="max-w-xl mt-4 text-sm md:text-base text-paper/70 animate-slideDown" style={{ animationDelay: "120ms" }}>
              {slide.copy}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-paper/50 group-hover:text-paper group-hover:gap-3 transition-all duration-300">
              Click to expand
              <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
            </span>
          </div>
        </div>

        {/* Carousel controls */}
        <div className="flex items-center justify-center gap-6 mt-5">
          <button
            aria-label="Previous slide"
            onClick={() => goTo(index - 1)}
            className="w-8 h-8 rounded-full border border-line flex items-center justify-center hover:bg-ink hover:text-paper hover:border-ink hover:scale-110 active:scale-95 transition-all duration-200"
          >
            ‹
          </button>
          <div className="flex gap-2">
            {HERO_SLIDES.map((s, i) => (
              <button
                key={s.id}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-ink" : "w-1.5 bg-line"
                  }`}
              />
            ))}
          </div>
          <button
            aria-label="Next slide"
            onClick={() => goTo(index + 1)}
            className="w-8 h-8 rounded-full border border-line flex items-center justify-center hover:bg-ink hover:text-paper hover:border-ink hover:scale-110 active:scale-95 transition-all duration-200"
          >
            ›
          </button>
        </div>
      </div>

      {/* Popup taking ~50% of the screen on click, per spec */}
      {expanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 backdrop-blur-sm animate-fadeIn px-4"
          onClick={() => setExpanded(false)}
        >
          <div
            className="bg-paper rounded-2xl w-full md:w-[65vw] lg:w-1/2 max-h-[80vh] overflow-y-auto p-6 md:p-8 animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <span className="text-xs uppercase tracking-widest text-implement font-semibold">
                {slide.id} — Featured
              </span>
              <button
                aria-label="Close"
                onClick={() => setExpanded(false)}
                className="text-slate hover:text-ink transition-colors text-lg leading-none"
              >
                ✕
              </button>
            </div>
            <h2 className="text-2xl md:text-3xl font-medium mb-3">{slide.title}</h2>
            <p className="text-slate leading-relaxed">{slide.copy}</p>
          </div>
        </div>
      )}
    </section>
  );
}