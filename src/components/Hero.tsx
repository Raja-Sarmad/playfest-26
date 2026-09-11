"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const PILLARS = ["PLAY", "PERFORM", "CELEBRATE"];

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const [pillar, setPillar] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-badge", { y: 16, duration: 0.45 })
        .from(".hero-title-line", { y: 24, duration: 0.65, stagger: 0.08 }, "-=0.2")
        .from(".hero-board", { y: 30, rotate: -8, duration: 0.9, ease: "power2.out" }, "-=0.5")
        .from(".hero-sub", { y: 12, duration: 0.45 }, "-=0.4")
        .from(".hero-cta", { y: 10, duration: 0.4, stagger: 0.06 }, "-=0.25")
        .from(".hero-stats", { y: 14, duration: 0.45 }, "-=0.2");
    }, rootRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setPillar((i) => (i + 1) % PILLARS.length), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={rootRef}
      id="home"
      className="relative flex min-h-[calc(100dvh-3.9rem)] items-start overflow-hidden lg:items-center"
    >
      <div className="page-gutter relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 py-8 lg:grid-cols-[1fr_1.05fr] lg:gap-8 lg:py-10">
        <div className="text-center lg:text-left">
          <div className="hero-badge">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/80 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.26em] text-blue-600 shadow-sm backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-500" />
              </span>
              University Sports Festival · 16–22 March
            </span>
          </div>

          <h1 className="uppercase">
            <div className="hero-title-line font-display text-4xl font-bold leading-[0.9] tracking-tight text-navy-900 sm:text-6xl">
              SZIC
            </div>
            <div className="hero-title-line mt-1 pr-10 sm:pr-16">
              <span className="relative inline-block font-display text-5xl font-bold leading-[0.9] tracking-tight sm:text-7xl md:text-8xl">
                <span className="chrome-text">PLAYFEST</span>
                <span className="year-sup absolute left-full top-0 ml-1 text-2xl tracking-normal sm:text-4xl md:text-5xl">
                  &apos;26
                </span>
              </span>
            </div>
          </h1>

          <div className="hero-sub mt-5 flex items-center justify-center gap-2 lg:justify-start">
            <span className="font-display text-xs font-semibold uppercase tracking-[0.32em] text-slate-500 sm:text-sm">
              {PILLARS.map((word, i) => (
                <span key={word}>
                  <span className={i === pillar ? "electric-text" : "text-slate-400"}>
                    {word}
                  </span>
                  {i < PILLARS.length - 1 ? (
                    <span className="mx-1.5 text-gold-500">·</span>
                  ) : null}
                </span>
              ))}
            </span>
          </div>

          <p className="hero-sub mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-600 lg:mx-0">
            Karachi campuses collide at SZIC for one week of football, cricket,
            court sports, track, and live performances. Wear your colours.
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <a
              href="#contact"
              className="hero-cta btn-electric nav-cta px-7 py-3 text-xs font-black uppercase tracking-widest"
            >
              Enter Your Team
            </a>
            <a
              href="#sports"
              className="hero-cta btn-outline-electric rounded-full px-7 py-3 text-xs font-black uppercase tracking-widest"
            >
              View Sports
            </a>
          </div>

          <div className="hero-stats mt-8 grid grid-cols-3 gap-2 sm:max-w-md sm:gap-3">
            {[
              { v: "7", l: "Days" },
              { v: "12+", l: "Sports" },
              { v: "50+", l: "Campuses" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-xl border border-white/70 bg-white/70 px-3 py-3 shadow-sm backdrop-blur"
              >
                <div className="font-display text-2xl font-bold text-blue-600 sm:text-3xl">
                  {s.v}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-board relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="ticket-float relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-cyan-400/50 via-blue-600/30 to-gold-400/25 blur-3xl" />
            <figure className="relative overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-cyan-300 via-blue-500 to-navy-900 p-[3px] shadow-[0_30px_70px_-28px_rgba(4,32,71,0.65)]">
              <div className="relative overflow-hidden rounded-[1.45rem] bg-navy-950">
                <Image
                  src="/hero-athletes.png"
                  alt="PlayFest athletes in action — tennis, volleyball and football"
                  width={1200}
                  height={900}
                  priority
                  className="h-auto w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-navy-950/10" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                  <div>
                    <p className="font-display text-[10px] font-bold uppercase tracking-[0.32em] text-cyan-200">
                      16 — 22 March
                    </p>
                    <p className="font-display text-lg font-bold uppercase text-white sm:text-xl">
                      Play · Perform · Celebrate
                    </p>
                  </div>
                  <Image
                    src="/playfestlogo.png"
                    alt=""
                    width={56}
                    height={56}
                    className="h-12 w-12 rounded-xl object-cover shadow-lg sm:h-14 sm:w-14"
                  />
                </figcaption>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
