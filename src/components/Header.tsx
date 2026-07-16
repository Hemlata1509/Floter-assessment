import { useEffect, useState } from "react";
import { NAV_LINKS } from "../data/content";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-40 bg-paper/90 backdrop-blur border-b transition-shadow duration-300 ${scrolled ? "border-line shadow-sm shadow-ink/5" : "border-transparent"
      }`}>
      <div className="mx-auto max-w-6xl px-5 md:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="font-display text-lg tracking-tight font-medium transition-transform duration-200 hover:-translate-y-0.5">
          Contour<span className="text-implement">.</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="relative py-1 hover:text-ink transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[1.5px] after:w-0 after:bg-ink after:transition-all after:duration-300 after:ease-signature hover:after:w-full"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-1.5"
        >
          <span
            className={`block h-0.5 w-6 bg-ink transition-transform duration-300 ease-signature ${open ? "translate-y-2 rotate-45" : ""
              }`}
          />
          <span
            className={`block h-0.5 w-6 bg-ink transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"
              }`}
          />
          <span
            className={`block h-0.5 w-6 bg-ink transition-transform duration-300 ease-signature ${open ? "-translate-y-2 -rotate-45" : ""
              }`}
          />
        </button>
      </div>

      {/* Mobile slide-down nav — topnav bar itself never moves */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-signature border-b border-line ${open ? "max-h-56 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <nav className="flex flex-col px-5 py-3 gap-1 bg-paper text-sm font-medium text-slate">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
              className={`py-2.5 border-b border-line/70 last:border-none hover:text-ink hover:pl-1 transition-all duration-200 ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                }`}
            >
              {link}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
