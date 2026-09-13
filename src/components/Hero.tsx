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
      tl.from(".hero-badge", { y: 18, duration: 0.5 })
        .from(".hero-title-line", { y: 36, duration: 0.75, stagger: 0.1 }, "-=0.2")
        .from(".hero-board", { y: 24, scale: 0.96, duration: 0.85, ease: "power2.out" }, "-=0.55")
        .from(".hero-sub", { y: 14, duration: 0.45 }, "-=0.4")
        .from(".hero-cta", { y: 12, duration: 0.4, stagger: 0.06 }, "-=0.25")
        .from(".hero-stats", { y: 16, duration: 0.45 }, "-=0.2");
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
      className="relative overflow-hidden bg-[#020817]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-[-20%] h-[28rem] w-[28rem] rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute -right-16 bottom-[-20%] h-[26rem] w-[26rem] rounded-full bg-blue-600/30 blur-3xl" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(58,214,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(58,214,255,0.08) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="page-gutter relative z-10 mx-auto grid min-h-[calc(100dvh-3.9rem)] w-full max-w-7xl items-center gap-8 py-10 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
        <div className="text-center lg:text-left">
          <div className="hero-badge">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-400/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-300">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-80" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-300" />
              </span>
              Last week of September · Registration open
            </span>
          </div>

          <h1 className="uppercase">
            <div className="hero-title-line font-display text-4xl font-bold leading-none tracking-tight text-white sm:text-6xl">
              SZIC
            </div>
            <div className="hero-title-line mt-1 pr-10 sm:pr-16">
              <span className="relative inline-block font-display text-5xl font-bold leading-none tracking-tight sm:text-7xl md:text-8xl">
                <span className="hero-neon">PLAYFEST</span>
                <span className="year-sup absolute left-full top-0 ml-1 text-2xl tracking-normal sm:text-4xl md:text-5xl">
                  &apos;26
                </span>
              </span>
            </div>
          </h1>

          <div className="hero-sub mt-5 flex items-center justify-center gap-2 lg:justify-start">
            <span className="font-display text-xs font-semibold uppercase tracking-[0.32em] text-slate-400 sm:text-sm">
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

          <p className="hero-sub mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-300 lg:mx-0">
            Early bird discount on every game. Outsiders allowed — bring your
            squad. Stalls, merch, and a full week of PlayFest energy.
          </p>

          <div className="mt-6 flex flex-row items-center justify-center gap-3 lg:justify-start">
            <a
              href="#contact"
              className="hero-cta btn-electric nav-cta inline-flex items-center px-7 py-3 text-xs font-black uppercase tracking-widest"
            >
              Register now
            </a>
            <a
              href="#sports"
              className="hero-cta btn-outline-electric nav-cta inline-flex items-center px-7 py-3 text-xs font-black uppercase tracking-widest"
            >
              Featured games
            </a>
          </div>

          <div className="hero-stats mt-8 grid grid-cols-3 gap-2 sm:max-w-md sm:gap-3">
            {[
              { v: "9", l: "Games" },
              { v: "Sept", l: "Last week" },
              { v: "Open", l: "For all" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-xl border border-cyan-300/20 bg-white/5 px-3 py-3 backdrop-blur"
              >
                <div className="font-display text-2xl font-bold text-cyan-300 sm:text-3xl">
                  {s.v}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-board relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="relative">
            <div className="absolute -inset-5 rounded-[2rem] bg-cyan-400/25 blur-3xl" />
            <figure className="relative overflow-hidden rounded-[1.5rem] ring-1 ring-cyan-300/40">
              <Image
                src="/hero-athletes.png"
                alt="PlayFest athletes in action"
                width={1200}
                height={900}
                priority
                className="h-auto w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020817] via-transparent to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 sm:p-5">
                <div>
                  <p className="font-display text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-300">
                    Last week of September
                  </p>
                  <p className="font-display text-lg font-bold uppercase text-white">
                    Play · Perform · Celebrate
                  </p>
                </div>
                <Image
                  src="/playfestlogo.png"
                  alt=""
                  width={52}
                  height={52}
                  className="h-12 w-12 rounded-xl object-cover"
                />
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
