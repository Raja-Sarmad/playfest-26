"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BEATS = [
  {
    word: "Play",
    kicker: "01",
    title: "Nine games. Zero excuses.",
    body: "PUBG, Free Fire, cricket, badminton, hackathon, logo design, chess, tug of war, treasure hunt. Pick a lane. Bring a squad.",
    tags: ["Esports", "Sports", "Tech", "Campus"],
  },
  {
    word: "Perform",
    kicker: "02",
    title: "The week has a stage.",
    body: "Opening energy, campus noise, stalls, merch, and a closing night people talk about. You don't just play PlayFest — you show up in it.",
    tags: ["Opening", "Stalls", "Merch", "Stage"],
  },
  {
    word: "Celebrate",
    kicker: "03",
    title: "Squads, medals, outsiders in.",
    body: "Bring your people. Outsiders allowed. Early bird on every game. Last week of September at SZIC — win, eat, roam, and take the photos.",
    tags: ["Squads", "Discount", "September"],
  },
];

const LANES = [
  { name: "Drop. Clutch. Win.", sub: "PUBG · Free Fire" },
  { name: "Bat. Smash. Pull.", sub: "Cricket · Badminton · Tug of War" },
  { name: "Build. Design. Think.", sub: "Hackathon · Logo · Chess" },
  { name: "Hunt the campus.", sub: "Treasure Hunt · Stalls" },
];

export default function About() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-title",
        { y: 24 },
        {
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about-title", start: "top 88%" },
        }
      );
      gsap.utils.toArray<HTMLElement>(".about-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 28 },
          {
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%" },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % BEATS.length), 4200);
    return () => clearInterval(id);
  }, [active]);

  const beat = BEATS[active];

  return (
    <section ref={rootRef} id="about" className="relative overflow-hidden bg-white py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ice to-transparent" />

      <div className="page-gutter relative mx-auto max-w-7xl">
        <div className="about-title mb-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-blue-600">
            The Festival
          </p>
          <h2 className="font-display text-4xl font-bold uppercase text-navy-900 sm:text-6xl">
            What is <span className="electric-text">PlayFest?</span>
          </h2>
          <div className="section-rule mx-auto mt-4 h-px w-44" />
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <div className="about-reveal space-y-6">
            <p className="font-display text-3xl font-bold uppercase leading-tight text-navy-900 sm:text-5xl">
              Not a sports day.{" "}
              <span className="electric-text">A campus takeover.</span>
            </p>
            <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Last week of September, SZIC stops being quiet. Esports rooms get
              loud, the ground fills up, designers and hackers lock in, and
              outsiders walk in with their squads.
            </p>

            <div className="flex flex-wrap gap-2">
              {BEATS.map((item, i) => (
                <button
                  key={item.word}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] transition-all ${
                    i === active
                      ? "bg-navy-900 text-cyan-300 shadow-[0_10px_24px_-12px_rgba(10,31,66,0.55)]"
                      : "border border-blue-100 bg-ice text-navy-800 hover:border-blue-400"
                  }`}
                >
                  {item.kicker} {item.word}
                </button>
              ))}
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-ice p-6 sm:p-8">
              <p className="text-[11px] font-black uppercase tracking-[0.32em] text-blue-600">
                {beat.kicker} · {beat.word}
              </p>
              <h3 className="font-display mt-2 text-2xl font-bold uppercase text-navy-900 sm:text-3xl">
                {beat.title}
              </h3>
              <p className="mt-3 max-w-lg text-slate-600">{beat.body}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {beat.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="about-reveal">
            <div className="relative h-full overflow-hidden rounded-[1.6rem] bg-[#020817] p-6 text-white shadow-[0_24px_60px_-28px_rgba(10,31,66,0.55)] sm:p-7">
              <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-cyan-400/25 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 left-0 h-40 w-40 rounded-full bg-blue-600/30 blur-3xl" />

              <div className="relative flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.32em] text-cyan-300">
                    Festival pass
                  </p>
                  <p className="font-display mt-1 text-3xl font-bold uppercase">
                    PlayFest
                    <span className="year-sup ml-1 align-super text-xl">&apos;26</span>
                  </p>
                </div>
                <span className="logo-chip h-14 w-14">
                  <Image
                    src="/playfestlogo.png"
                    alt=""
                    width={56}
                    height={56}
                    className="h-full w-full object-cover"
                  />
                </span>
              </div>

              <p className="relative mt-6 text-sm leading-relaxed text-slate-300">
                Play · Perform · Celebrate. Last week of September. SZIC Karachi.
                Early bird on every game.
              </p>

              <div className="relative mt-6 grid grid-cols-3 gap-2">
                {[
                  { v: "9", l: "Games" },
                  { v: "Open", l: "For all" },
                  { v: "Sept", l: "Last week" },
                ].map((c) => (
                  <div
                    key={c.l}
                    className="rounded-xl border border-cyan-300/20 bg-white/5 px-2 py-3 text-center"
                  >
                    <div className="font-display text-xl font-bold text-cyan-300 sm:text-2xl">
                      {c.v}
                    </div>
                    <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      {c.l}
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative mt-6 flex items-end justify-between gap-4 border-t border-white/10 pt-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">
                    Valid
                  </p>
                  <p className="font-display text-sm font-bold uppercase text-white">
                    Last week of September
                  </p>
                </div>
                <a
                  href="#contact"
                  className="btn-electric rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-widest"
                >
                  Get in
                </a>
              </div>

              <div className="relative mt-5 flex gap-0.5">
                {Array.from({ length: 28 }).map((_, i) => (
                  <span
                    key={i}
                    className="h-7 flex-1 rounded-sm bg-white/15"
                    style={{ opacity: i % 3 === 0 ? 0.35 : 0.7 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="about-reveal mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {LANES.map((lane) => (
            <div
              key={lane.name}
              className="rounded-2xl border border-blue-100 bg-white px-5 py-4 shadow-[0_10px_30px_-18px_rgba(10,31,66,0.16)] transition-transform duration-300 hover:-translate-y-1"
            >
              <p className="font-display text-lg font-bold uppercase text-navy-900">
                {lane.name}
              </p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-600">
                {lane.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
