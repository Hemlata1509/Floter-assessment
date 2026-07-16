import { useEffect, useState } from "react";
import { useInView } from "../hooks/useInView";
import Reveal from "./Reveal";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const STATS: Stat[] = [
  { value: 5, suffix: "", label: "Apps shipped in one product ecosystem" },
  { value: 40, suffix: "%", label: "Faster checkout after a split-payment redesign" },
  { value: 1, suffix: "st", label: "Split-payment gateway of its kind in the Caribbean" },
  { value: 12, suffix: "+", label: "Senior engineers who've led work like this" },
];

function useCountUp(target: number, active: boolean, duration = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    let start: number | null = null;
    let frame: number;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // Ease-out for a snappier finish rather than a linear tick-up.
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);

  return value;
}

function StatCard({ stat, delay }: { stat: Stat; delay: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  const count = useCountUp(stat.value, inView);

  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-signature"
      style={{
        transitionDelay: inView ? `${delay}ms` : "0ms",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
      }}
    >
      <p className="font-display text-4xl md:text-5xl font-medium text-paper">
        {count}
        <span className="text-implement">{stat.suffix}</span>
      </p>
      <p className="mt-2 text-sm text-paper/60 leading-relaxed max-w-[22ch]">{stat.label}</p>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-ink px-5 md:px-8 py-16 md:py-24">
      {/* Ambient glow — signature background treatment, echoes the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/4 w-[36rem] h-[36rem] rounded-full bg-implement/20 blur-3xl animate-pulse-slow"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 right-0 w-[28rem] h-[28rem] rounded-full bg-plan/20 blur-3xl animate-pulse-slow"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs tracking-[0.2em] uppercase text-implement font-semibold mb-3">
            Track record
          </p>
          <h2 className="text-2xl md:text-4xl font-medium text-paper max-w-xl">
            Numbers we'd happily walk you through in the first call.
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mt-12">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}