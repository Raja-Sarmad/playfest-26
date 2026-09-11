"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Sport = {
  name: string;
  format: string;
  venue: string;
  desc: string;
  accent: string;
};

const SPORTS: Sport[] = [
  { name: "Football", format: "11v11", venue: "Main Ground", desc: "Knockout cup. Full 90s. Campus derbies under the lights.", accent: "#1aa8ff" },
  { name: "Cricket", format: "T20", venue: "Cricket Oval", desc: "Fast leagues by day, floodlit knockouts by night.", accent: "#3ec4ff" },
  { name: "Basketball", format: "5v5", venue: "Indoor Court", desc: "High-tempo court battles. Winner stays on the board.", accent: "#f0c75e" },
  { name: "Volleyball", format: "6v6", venue: "Outdoor Court", desc: "Spikes, blocks, and packed sidelines.", accent: "#5eefff" },
  { name: "Tennis", format: "Singles", venue: "Tennis Courts", desc: "Singles and mixed doubles. First to the final set.", accent: "#7dd8ff" },
  { name: "Badminton", format: "Doubles", venue: "Sports Hall", desc: "Campus pairs, rapid rallies, medal matches.", accent: "#1aa8ff" },
  { name: "Table Tennis", format: "Singles", venue: "Indoor Hall", desc: "Best-of series. Fast hands, faster points.", accent: "#e0b03a" },
  { name: "Athletics", format: "Track", venue: "Track & Field", desc: "Sprints, relays, long jump, and the 4x100 final.", accent: "#3ec4ff" },
];

export default function Games() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sports-title",
        { y: 28 },
        {
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".sports-title", start: "top 88%" },
        }
      );

      gsap.utils.toArray<HTMLElement>(".sport-card").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 36 },
          {
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".sports-grid",
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="sports" className="relative overflow-hidden bg-ice py-16 sm:py-20">
      <div className="page-gutter relative mx-auto max-w-7xl">
        <div className="sports-title mb-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-blue-600">
            The Lineup
          </p>
          <h2 className="font-display text-4xl font-bold uppercase text-navy-900 sm:text-5xl">
            Sports <span className="electric-text">On Court</span>
          </h2>
          <div className="section-rule mx-auto mt-4 h-px w-44" />
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Field, court, track, and table — register a squad or walk in as a
            spectator. Every final plays on campus.
          </p>
        </div>

        <div className="sports-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SPORTS.map((sport) => (
            <article
              key={sport.name}
              className="sport-card group relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_10px_30px_-18px_rgba(10,31,66,0.18)] transition-all duration-500 hover:-translate-y-1.5 hover:border-blue-400/50"
            >
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-30 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
                style={{ background: sport.accent }}
              />
              <div className="relative flex items-start justify-between">
                <h3 className="font-display text-xl font-bold uppercase text-navy-900 transition-colors group-hover:text-blue-600">
                  {sport.name}
                </h3>
                <span
                  className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-blue-700"
                  style={{ background: `${sport.accent}28` }}
                >
                  {sport.format}
                </span>
              </div>
              <p className="relative mt-3 text-sm leading-relaxed text-slate-500">
                {sport.desc}
              </p>
              <div className="relative mt-5 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.18em]">
                <span className="text-gold-500">{sport.venue}</span>
                <a href="#contact" className="text-blue-600 transition-all group-hover:tracking-wider">
                  Register →
                </a>
              </div>
              <div className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-blue-400 to-gold-400 transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-xs uppercase tracking-[0.3em] text-slate-500">
          Futsal · Chess · Tug of War · Fun races — added on the official fixture sheet
        </p>
      </div>
    </section>
  );
}
