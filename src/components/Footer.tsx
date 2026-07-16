import { NAV_LINKS } from "../data/content";

export default function Footer() {
  return (
    <footer id="questions" className="bg-ink text-paper/70 px-5 md:px-8 py-10 md:py-12">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p className="font-display text-lg text-paper mb-1 transition-transform duration-200 hover:-translate-y-0.5 inline-block">
            Contour.
          </p>
          <p className="text-sm">Planning, design and delivery for fintech, food-tech & hospitality.</p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="relative hover:text-paper transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[1.5px] after:w-0 after:bg-paper after:transition-all after:duration-300 after:ease-signature hover:after:w-full"
            >
              {link}
            </a>
          ))}
        </nav>

        <p className="text-xs text-paper/40">© {new Date().getFullYear()} Contour Studio. All rights reserved.</p>
      </div>
    </footer>
  );
}