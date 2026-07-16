import { useState, type ReactNode } from "react";
import { OFFERINGS } from "../data/content";
import type { OfferingId } from "../types";
import Reveal from "./Reveal";

const THEME: Record<OfferingId, { bg: string; soft: string; text: string }> = {
  plan: { bg: "bg-plan", soft: "bg-plan-soft", text: "text-plan-deep" },
  design: { bg: "bg-design", soft: "bg-design-soft", text: "text-design-deep" },
  implement: { bg: "bg-implement", soft: "bg-implement-soft", text: "text-implement-deep" },
};

// Small inline icons, kept dependency-free and themed via currentColor.
const ICONS: Record<OfferingId, ReactNode> = {
  plan: (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path d="M4 6h16M4 12h10M4 18h7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  ),
  design: (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path
        d="M4 20l3.5-1 10-10a1.5 1.5 0 0 0-2.5-2.5l-10 10L4 20Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  ),
  implement: (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path
        d="M8 9 4 12l4 3M16 9l4 3-4 3M13.5 6l-3 12"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export default function WhatWeDo() {
  const [active, setActive] = useState<OfferingId>("plan");
  const activeOffering = OFFERINGS.find((o) => o.id === active)!;

  return (
    <section id="about" className="px-5 md:px-8 py-16 md:py-24 border-t border-line">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex items-end justify-between mb-8 md:mb-10">
            <h2 className="text-2xl md:text-4xl font-medium">What we do?</h2>
            <span className="hidden md:block text-sm text-slate">Click a column to expand it</span>
          </div>
        </Reveal>

        {/* Desktop / tablet: accordion columns */}
        <Reveal delay={100}>
          <div className="hidden md:flex gap-3 h-[440px]">
            {OFFERINGS.map((offering) => {
              const isActive = offering.id === active;
              const theme = THEME[offering.id];
              return (
                <button
                  key={offering.id}
                  onClick={() => setActive(offering.id)}
                  aria-expanded={isActive}
                  className={`group relative overflow-hidden rounded-2xl text-left transition-all duration-500 ease-signature ${theme.bg} ${isActive
                      ? "flex-[3] shadow-xl shadow-ink/15"
                      : "flex-[1] hover:brightness-110 hover:-translate-y-1"
                    } flex flex-col justify-between p-6`}
                  style={{ flexGrow: isActive ? 3 : 1 }}
                >
                  {/* Sheen sweep on the active column, purely decorative */}
                  {isActive && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent bg-[length:200%_100%] animate-shimmer"
                    />
                  )}

                  <div className="relative flex items-center justify-between text-paper/80">
                    <span className="flex items-center gap-2">
                      <span
                        className={`flex items-center justify-center w-8 h-8 rounded-full bg-paper/15 text-paper transition-transform duration-500 ease-signature ${isActive ? "scale-100" : "scale-90"
                          }`}
                      >
                        {ICONS[offering.id]}
                      </span>
                      <span className="text-xs tracking-[0.2em] uppercase">{offering.index}</span>
                    </span>
                    <span
                      className={`text-lg font-display transition-transform duration-500 ease-signature ${isActive ? "rotate-0" : "rotate-90 md:rotate-0"
                        }`}
                    >
                      {offering.label}
                    </span>
                  </div>

                  {isActive ? (
                    <div key={offering.id} className="relative animate-slideDown text-paper">
                      <h3 className="text-xl lg:text-2xl font-medium mb-3 leading-snug">
                        {offering.headline}
                      </h3>
                      <p className="text-sm text-paper/85 leading-relaxed mb-4">{offering.primaryText}</p>
                      <div className={`rounded-xl ${theme.soft} ${theme.text} p-4 text-sm leading-relaxed`}>
                        {offering.secondaryText}
                      </div>
                      <ul className="mt-4 space-y-1.5 text-sm text-paper/90">
                        {offering.bullets.map((b, i) => (
                          <li
                            key={b}
                            className="flex gap-2 animate-slideDown"
                            style={{ animationDelay: `${120 + i * 70}ms`, animationFillMode: "backwards" }}
                          >
                            <span className="opacity-60">—</span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <span className="relative text-paper text-3xl font-display font-medium [writing-mode:vertical-rl] self-start opacity-90 transition-opacity duration-300 group-hover:opacity-100">
                      {offering.label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Mobile: collapsible rows, one expanded at a time */}
        <div className="md:hidden flex flex-col gap-3">
          {OFFERINGS.map((offering, idx) => {
            const isActive = offering.id === active;
            const theme = THEME[offering.id];
            return (
              <Reveal key={offering.id} delay={idx * 80} from="up">
                <div className={`rounded-2xl overflow-hidden ${theme.bg} transition-shadow duration-300 ${isActive ? "shadow-lg shadow-ink/10" : ""}`}>
                  <button
                    onClick={() => setActive(isActive ? active : offering.id)}
                    aria-expanded={isActive}
                    className="w-full flex items-center justify-between px-5 py-4 text-paper active:scale-[0.99] transition-transform"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-paper/15 text-paper">
                        {ICONS[offering.id]}
                      </span>
                      <span className="text-xs tracking-[0.2em] uppercase opacity-70">{offering.index}</span>
                      <span className="font-display text-lg">{offering.label}</span>
                    </span>
                    <span
                      className={`transition-transform duration-300 ease-signature ${isActive ? "rotate-180" : ""}`}
                    >
                      ⌄
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-400 ease-signature ${isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5 text-paper">
                        <h3 className="text-base font-medium mb-2">{offering.headline}</h3>
                        <p className="text-sm text-paper/85 leading-relaxed mb-1">{offering.primaryText}</p>
                        <p className="text-sm text-paper/85 leading-relaxed">{offering.secondaryText}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <p className="sr-only" aria-live="polite">
          {activeOffering.label} expanded
        </p>
      </div>
    </section>
  );
}