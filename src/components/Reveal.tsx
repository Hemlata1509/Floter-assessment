import type { ReactNode } from "react";
import { useInView } from "../hooks/useInView";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: "up" | "left" | "right" | "none";
}

const OFFSETS: Record<NonNullable<RevealProps["from"]>, string> = {
  up: "translate-y-6",
  left: "-translate-x-6",
  right: "translate-x-6",
  none: "",
};

export default function Reveal({ children, className = "", delay = 0, from = "up" }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-signature ${
        inView ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${OFFSETS[from]}`
      } ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}