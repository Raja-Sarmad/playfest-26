"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TEAM = [
  { name: "Ahmed Raza", role: "Festival Director", initials: "AR" },
  { name: "Sara Khan", role: "Sports Convener", initials: "SK" },
  { name: "Bilal Hussain", role: "Fixtures Lead", initials: "BH" },
  { name: "Ayesha Shaikh", role: "Sponsorships", initials: "AS" },
  { name: "Hamza Ali", role: "Grounds & Logistics", initials: "HA" },
  { name: "Mahnoor Fatima", role: "Ceremony & Stage", initials: "MF" },
];

export default function Team() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".team-title",
        { y: 28 },
        {
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".team-title", start: "top 88%" },
        }
      );
      gsap.utils.toArray<HTMLElement>(".team-card").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 36, scale: 0.97 },
          {
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: ".team-grid",
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="team" className="relative overflow-hidden bg-ice py-16 sm:py-20">
      <div className="page-gutter relative mx-auto max-w-7xl">
        <div className="team-title mb-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-blue-600">
            Organising Committee
          </p>
          <h2 className="font-display text-4xl font-bold uppercase text-navy-900 sm:text-5xl">
            Meet the <span className="electric-text">Crew</span>
          </h2>
          <div className="section-rule mx-auto mt-4 h-px w-44" />
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Students running grounds, brackets, sponsors, and the closing
            night so the rest of Karachi can just play.
          </p>
        </div>

        <div className="team-grid grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {TEAM.map((m) => (
            <div
              key={m.name}
              className="team-card group relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-6 text-center shadow-[0_10px_30px_-18px_rgba(10,31,66,0.16)] transition-all duration-500 hover:-translate-y-2 hover:border-blue-400/55"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-gold-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative mx-auto mb-5 h-24 w-24">
                <div className="absolute -inset-1 rounded-full border-2 border-dashed border-blue-400/40 transition-transform duration-700 group-hover:rotate-180" />
                <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-navy-700 font-display text-2xl font-bold text-white">
                  {m.initials}
                </div>
              </div>
              <h3 className="font-display text-lg font-bold uppercase text-navy-900 transition-colors group-hover:text-blue-600">
                {m.name}
              </h3>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                {m.role}
              </p>
              <div className="mx-auto mt-5 h-px w-0 bg-gradient-to-r from-blue-400 to-gold-400 transition-all duration-500 group-hover:w-24" />
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm tracking-widest text-slate-500">
          Plus 50+ marshals, scorers, and volunteers on every ground.
        </p>
      </div>
    </section>
  );
}
