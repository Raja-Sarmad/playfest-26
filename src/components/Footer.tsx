"use client";

import Image from "next/image";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Games", href: "#sports" },
  { label: "Last Year", href: "#gallery" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-blue-100 bg-white">
      <div className="page-gutter mx-auto max-w-7xl py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <a href="#home" className="flex items-center gap-3">
              <span className="logo-chip relative h-12 w-12">
                <Image
                  src="/playfestlogo.png"
                  alt="PlayFest '26"
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </span>
              <span className="leading-tight">
                <span className="font-display relative inline-block pr-8 text-xl font-bold text-navy-900">
                  PLAYFEST
                  <span className="year-sup absolute left-full top-0 text-sm">
                    &apos;26
                  </span>
                </span>
                <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-600">
                  Play · Perform · Celebrate
                </span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              Last week of September. Sheikh Zayed Islamic Center, University
              of Karachi.
            </p>
          </div>

          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-600">
              Jump to
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-navy-800">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-blue-600">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-600">
              Desk
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-navy-800">
              <li>
                <a
                  href="https://wa.me/923262176836"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600"
                >
                  Sarmad Masood · 0326 2176836
                </a>
              </li>
              <li>
                <a href="tel:03220212776" className="hover:text-blue-600">
                  Ammar Khan · 0322 0212776
                </a>
              </li>
              <li>
                <a href="#contact" className="font-semibold text-blue-600">
                  Register →
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-blue-100 pt-5 text-xs text-slate-500 sm:flex-row">
          <p>© PlayFest &apos;26. All rights reserved.</p>
          <p>Play · Perform · Celebrate</p>
        </div>
      </div>
    </footer>
  );
}
