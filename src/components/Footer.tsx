"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Sports", href: "#sports" },
  { label: "Schedule", href: "#schedule" },
  { label: "Team", href: "#team" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-item",
        { y: 16 },
        {
          y: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 92%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden border-t border-navy-800 bg-navy-950 text-slate-300"
    >
      <div className="page-gutter relative z-10 mx-auto max-w-7xl py-10">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="footer-item">
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
              <div className="leading-tight">
                <span className="font-display relative inline-block pr-8 text-xl font-bold tracking-wide text-white">
                  PLAYFEST
                  <span className="year-sup absolute left-full top-0 text-sm">
                    &apos;26
                  </span>
                </span>
                <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.28em] text-blue-300">
                  Play · Perform · Celebrate
                </span>
              </div>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Karachi&apos;s university sports week. Seven days of fixtures,
              performances, and a closing night for champions.
            </p>
          </div>

          <div className="footer-item">
            <h3 className="font-display font-bold uppercase tracking-[0.2em] text-blue-300">
              Jump to
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-400">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-item">
            <h3 className="font-display font-bold uppercase tracking-[0.2em] text-blue-300">
              Sports desk
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li>SZIC Campus, Shahrah-e-Faisal</li>
              <li>
                <a
                  href="mailto:playfest@szic.edu.pk"
                  className="transition-colors hover:text-white"
                >
                  playfest@szic.edu.pk
                </a>
              </li>
              <li>+92 300 1234567</li>
            </ul>
          </div>
        </div>

        <div className="footer-item mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-5 sm:flex-row">
          <p className="text-xs text-slate-500">
            © PlayFest &apos;26. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">Play. Perform. Celebrate.</p>
        </div>
      </div>
    </footer>
  );
}
