"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Games", href: "#sports" },
  { label: "Last Year", href: "#gallery" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="h-[3px] bg-gradient-to-r from-blue-600 via-cyan-400 to-gold-400" />
      <nav
        className={`relative border-b transition-all duration-300 ${
          scrolled
            ? "border-blue-200 bg-white/90 shadow-sm backdrop-blur-xl"
            : "border-blue-100 bg-white/75 backdrop-blur-md"
        }`}
      >
        <div className="page-gutter mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 sm:h-[3.75rem]">
          <a href="#home" className="flex items-center gap-2.5 pr-5">
            <span className="logo-chip relative h-10 w-10 shrink-0 sm:h-11 sm:w-11">
              <Image
                src="/playfestlogo.png"
                alt="PlayFest '26"
                width={44}
                height={44}
                className="h-full w-full object-cover"
                priority
              />
            </span>
            <span className="font-display leading-none">
              <span className="relative inline-block text-[15px] font-bold tracking-[0.14em] text-navy-900 sm:text-base">
                PLAYFEST
                <span className="year-sup absolute top-[-0.28em] left-[101%] text-[11px] sm:text-xs">
                  &apos;26
                </span>
              </span>
              <span className="mt-1 hidden text-[9px] font-semibold uppercase tracking-[0.32em] text-blue-600 sm:block">
                SZIC · Karachi
              </span>
            </span>
          </a>

          <div className="hidden items-center lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative px-3 py-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-navy-800 transition-colors hover:text-blue-600"
              >
                {l.label}
                <span className="absolute inset-x-3 -bottom-px h-[2px] origin-left scale-x-0 bg-blue-500 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="nav-cta btn-electric hidden px-5 py-2 text-[11px] font-black uppercase tracking-[0.2em] md:inline-block"
            >
              Register
            </a>
            <button
              className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 border border-blue-200 bg-ice lg:hidden"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span
                className={`h-0.5 w-4 bg-navy-800 transition-all ${
                  menuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span className={`h-0.5 w-4 bg-navy-800 ${menuOpen ? "opacity-0" : ""}`} />
              <span
                className={`h-0.5 w-4 bg-navy-800 transition-all ${
                  menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-blue-100 bg-white lg:hidden">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block border-b border-blue-50 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-navy-800 hover:bg-ice hover:text-blue-600"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="btn-electric mx-5 my-3 block py-3 text-center text-xs font-black uppercase tracking-widest"
            >
              Register
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
